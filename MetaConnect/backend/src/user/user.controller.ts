import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity, UserEntityPayload } from './user.entity';

@ApiTags('User Management')
@ApiSecurity('Authorisation')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve all users.',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully.',
    type: [UserEntity],
  })
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a specific user by their unique identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully.',
    type: UserEntity,
  })
  @Get('/:id')
  async getById(@Param('id') userId: string): Promise<User | null> {
    return this.userService.getById(userId);
  }

  @ApiOperation({
    summary: 'Update an existing user',
    description: 'Update a user by their unique identifier.',
  })
  @ApiBody({
    description: 'User data to update the existing user (omit id).',
    type: UserEntityPayload,
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    type: UserEntity,
  })
  @Put('/:id')
  async update(
    @Body() userData: Partial<Omit<User, 'id'>>,
    @Param('id') userId: string,
  ): Promise<User | null> {
    return this.userService.update(userId, userData);
  }

  @ApiOperation({
    summary: 'Delete a user',
    description: 'Delete a user by their unique identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
    type: UserEntity,
  })
  @Delete('/:id')
  async delete(@Param('id') userId: string): Promise<User | null> {
    return this.userService.delete(userId);
  }
}
