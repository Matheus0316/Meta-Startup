import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export abstract class UserEntity {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'ID único do usuário' })
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  token?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export abstract class UserEntityPayload {
  @ApiProperty({
    description: 'Name of the user',
    example: 'João Silva'
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({
    description: 'Email address of the user',
    example: 'joao@email.com'
  })
  @IsEmail()
  email: string;
  
  @ApiProperty({
    description: 'Password (min 8 chars, 1 letter, 1 number, 1 special char)',
    example: 'MinhaSenh@123'
  })
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
  })
  password: string;
  
  @ApiProperty({
    description: 'Optional token for the user',
    example: 'abc123token',
    required: false
  })
  @IsOptional()
  @IsString()
  token?: string;
}
