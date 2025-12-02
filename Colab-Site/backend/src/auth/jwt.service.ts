import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class JwtAuthService {
  
  async generateTokens(user: { id: string; email: string; name: string }): Promise<TokenPair> {
    const now = Math.floor(Date.now() / 1000);
    
    const accessPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      iat: now,
      exp: now + (45 * 60), // 45 minutes
    };

    const refreshPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      iat: now,
      exp: now + (7 * 24 * 60 * 60), // 7 days
    };

    const accessToken = this.createSimpleToken(accessPayload);
    const refreshToken = this.createSimpleToken(refreshPayload);

    return {
      accessToken,
      refreshToken,
    };
  }

  private createSimpleToken(payload: any): string {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
    
    const secret = process.env.JWT_SECRET || 'default-secret';
    const signature = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${payloadStr}`)
      .digest('base64url');

    return `${header}.${payloadStr}.${signature}`;
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.verifyToken(token, process.env.JWT_SECRET || 'default-secret');
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.verifyToken(token, process.env.JWT_REFRESH_SECRET || 'default-refresh-secret');
  }

  private verifyToken(token: string, secret: string): JwtPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const [header, payload, signature] = parts;
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      throw new Error('Invalid token signature');
    }

    // Parse payload
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString());
    
    // Check expiration
    if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired');
    }

    return decodedPayload;
  }

  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    try {
      const payload = await this.verifyRefreshToken(refreshToken);
      
      const user = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
      };

      return this.generateTokens(user);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
