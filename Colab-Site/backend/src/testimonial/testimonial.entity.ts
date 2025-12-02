import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsBoolean, IsOptional } from 'class-validator';

export abstract class TestimonialEntity {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'ID único do testimonial' })
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  position: string;

  @ApiProperty({ required: false, description: 'URL da imagem do autor (opcional)' })
  image?: string;

  @ApiProperty({ example: true, description: 'Se o testimonial está ativo/visível' })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export abstract class CreateTestimonialDto {
  @ApiProperty({
    description: 'Content of the testimonial',
    example: 'This company provided excellent service and exceeded all our expectations.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content: string;

  @ApiProperty({
    description: 'Name of the person giving the testimonial',
    example: 'João Silva',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'Position/title of the person',
    example: 'CEO at Tech Company',
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({
    description: 'URL da imagem do autor (opcional)',
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Se o testimonial está ativo/visível (padrão: true)',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export abstract class UpdateTestimonialDto {
  @ApiProperty({
    description: 'Content of the testimonial',
    example: 'This company provided excellent service and exceeded all our expectations.',
    required: false,
  })
  @IsString()
  @MinLength(10)
  content?: string;

  @ApiProperty({
    description: 'Name of the person giving the testimonial',
    example: 'João Silva',
    required: false,
  })
  @IsString()
  author?: string;

  @ApiProperty({
    description: 'Position/title of the person',
    example: 'CEO at Tech Company',
    required: false,
  })
  @IsString()
  position?: string;

  @ApiProperty({
    description: 'URL da imagem do autor (opcional)',
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Se o testimonial está ativo/visível (padrão: true)',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
