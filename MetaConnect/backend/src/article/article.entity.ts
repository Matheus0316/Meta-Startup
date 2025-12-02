import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

export abstract class ArticleEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  subtitle?: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  category: string;

  @ApiProperty({ required: false })
  image?: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export abstract class CreateArticleDto {
  @ApiProperty({
    description: 'Title of the article',
    example: 'Como Escolher o Melhor Advogado para seu Caso',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @ApiProperty({
    description: 'Subtitle of the article (optional)',
    example: 'Guia completo para encontrar representação legal adequada',
    required: false,
  })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiProperty({
    description: 'Content of the article',
    example: 'Escolher um advogado é uma decisão importante que pode impactar significativamente...',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  content: string;

  @ApiProperty({
    description: 'Category of the article',
    example: 'Direito Civil',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Image URL for the article (optional)',
    example: 'https://example.com/images/article-image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Whether the article is active/visible',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export abstract class UpdateArticleDto {
  @ApiProperty({
    description: 'Title of the article',
    example: 'Como Escolher o Melhor Advogado para seu Caso',
    required: false,
  })
  @IsString()
  @MinLength(5)
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Subtitle of the article (optional)',
    example: 'Guia completo para encontrar representação legal adequada',
    required: false,
  })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiProperty({
    description: 'Content of the article',
    example: 'Escolher um advogado é uma decisão importante que pode impactar significativamente...',
    required: false,
  })
  @IsString()
  @MinLength(50)
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: 'Category of the article',
    example: 'Direito Civil',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'Image URL for the article (optional)',
    example: 'https://example.com/images/article-image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Whether the article is active/visible',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
