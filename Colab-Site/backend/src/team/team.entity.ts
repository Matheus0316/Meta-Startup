import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class TeamEntity {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'ID único do membro da equipe' })
  id: string;

  @ApiProperty({ example: 'Dr. João Silva', description: 'Nome completo' })
  name: string;

  @ApiProperty({ example: 'Advogado Sênior', description: 'Cargo/posição' })
  position: string;

  @ApiProperty({ 
    example: 'Especialista em direito trabalhista com mais de 10 anos de experiência...', 
    description: 'Descrição/biografia do membro' 
  })
  description: string;

  @ApiProperty({ 
    example: 'https://example.com/joao-photo.jpg', 
    description: 'URL da foto do membro (opcional)',
    required: false 
  })
  image?: string;

  @ApiProperty({ 
    example: 'joao@maiaadvocacia.com', 
    description: 'Email profissional (opcional)',
    required: false 
  })
  email?: string;

  @ApiProperty({ example: true, description: 'Se o membro está ativo/visível' })
  active: boolean;

  @ApiProperty({ example: '2025-09-20T19:00:00.000Z', description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ example: '2025-09-20T19:00:00.000Z', description: 'Data da última atualização' })
  updatedAt: Date;
}

export class CreateTeamDto {
  @ApiProperty({ example: 'Dr. João Silva', description: 'Nome completo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Advogado Sênior', description: 'Cargo/posição' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ 
    example: 'Especialista em direito trabalhista com mais de 10 anos de experiência...', 
    description: 'Descrição/biografia do membro' 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @ApiProperty({ 
    example: 'https://example.com/joao-photo.jpg', 
    description: 'URL da foto do membro (opcional)',
    required: false 
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ 
    example: 'joao@maiaadvocacia.com', 
    description: 'Email profissional (opcional)',
    required: false 
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ 
    example: true, 
    description: 'Se o membro está ativo/visível (padrão: true)',
    required: false 
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export class UpdateTeamDto {
  @ApiProperty({ 
    example: 'Dr. João Silva', 
    description: 'Nome completo',
    required: false 
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    example: 'Advogado Sênior', 
    description: 'Cargo/posição',
    required: false 
  })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({ 
    example: 'Especialista em direito trabalhista com mais de 10 anos de experiência...', 
    description: 'Descrição/biografia do membro',
    required: false 
  })
  @IsString()
  @MinLength(10)
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    example: 'https://example.com/joao-photo.jpg', 
    description: 'URL da foto do membro (opcional)',
    required: false 
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ 
    example: 'joao@maiaadvocacia.com', 
    description: 'Email profissional (opcional)',
    required: false 
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ 
    example: true, 
    description: 'Se o membro está ativo/visível',
    required: false 
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
