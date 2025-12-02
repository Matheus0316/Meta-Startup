import { Body, Controller, Post } from '@nestjs/common';
import { environment } from 'src/config/env.config';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PublicRoute } from 'src/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
@PublicRoute()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'User Login',
    description: 'Authenticate user with email and password. Returns success message and user data.' 
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Success message' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials'
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email', example: 'joao@email.com' },
        password: { type: 'string', example: 'MinhaSenh@123' }
      }
    },
    description: 'User email and password for authentication',
  })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const res = await this.authService.login(email, password);
    return res;
  }

  @Post('register')
  @ApiOperation({ 
    summary: 'User Registration',
    description: 'Create a new user account with secure password hashing. Any password format is accepted.' 
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Success message' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed or user already exists'
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string', example: 'João Silva', description: 'Full name of the user' },
        email: { type: 'string', format: 'email', example: 'joao@email.com', description: 'Valid email address' },
        password: { 
          type: 'string', 
          example: '123456', 
          description: 'User password (any format accepted)' 
        }
      }
    },
    description: 'User registration data (any password format accepted)',
  })
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const res = await this.authService.register(name, email, password);
    return res;
  }
}
