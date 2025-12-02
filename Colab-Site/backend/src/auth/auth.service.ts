import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordUtil } from 'src/utils/password.util';
import { JwtAuthService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtAuthService: JwtAuthService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await PasswordUtil.comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT tokens
    const tokens = await this.jwtAuthService.generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    // Return user without password for security
    const { password: _, ...userWithoutPassword } = user;
    return { 
      message: 'Login successful',
      user: userWithoutPassword,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async register(name: string, email: string, password: string) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists with this email');
    }

    // Hash the password before saving
    const hashedPassword = await PasswordUtil.hashPassword(password);

    // Create new user
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT tokens
    const tokens = await this.jwtAuthService.generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    // Return user without password for security
    const { password: _, ...userWithoutPassword } = user;
    return { 
      message: 'User registered successfully',
      user: userWithoutPassword,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

}
