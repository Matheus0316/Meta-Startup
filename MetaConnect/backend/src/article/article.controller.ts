import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { 
  ArticleEntity, 
  CreateArticleDto, 
  UpdateArticleDto 
} from './article.entity';

@ApiTags('articles')
@ApiSecurity('Authorisation')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({
    summary: 'Get all articles',
    description: 'Retrieve all articles ordered by publication date (newest first).',
  })
  @ApiResponse({
    status: 200,
    description: 'Articles retrieved successfully.',
    type: [ArticleEntity],
  })
  @Get()
  async getAll(): Promise<Article[]> {
    return this.articleService.getAll();
  }

  @ApiOperation({
    summary: 'Get article by ID',
    description: 'Retrieve a specific article by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Article ID',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Article retrieved successfully.',
    type: ArticleEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found.',
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Article | null> {
    return this.articleService.getById(id);
  }

  @ApiOperation({
    summary: 'Search articles',
    description: 'Search articles by title, subtitle, content, or category.',
  })
  @ApiQuery({
    name: 'q',
    description: 'Search term',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Articles found successfully.',
    type: [ArticleEntity],
  })
  @Get('search/query')
  async search(@Query('q') searchTerm: string): Promise<Article[]> {
    return this.articleService.searchArticles(searchTerm);
  }

  @ApiOperation({
    summary: 'Get articles by category',
    description: 'Retrieve articles filtered by category.',
  })
  @ApiQuery({
    name: 'category',
    description: 'Category name',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Articles retrieved successfully.',
    type: [ArticleEntity],
  })
  @Get('category/filter')
  async getByCategory(@Query('category') category: string): Promise<Article[]> {
    return this.articleService.getByCategory(category);
  }

  @ApiOperation({
    summary: 'Get all categories',
    description: 'Retrieve all unique categories from articles.',
  })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully.',
    type: [String],
  })
  @Get('categories/list')
  async getCategories(): Promise<string[]> {
    return this.articleService.getCategories();
  }

  @ApiOperation({
    summary: 'Create a new article',
    description: 'Create a new article with the provided data.',
  })
  @ApiBody({
    description: 'Article data to create a new article.',
    type: CreateArticleDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Article created successfully.',
    type: ArticleEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @Post()
  async create(@Body() articleData: CreateArticleDto): Promise<Article> {
    return this.articleService.create(articleData);
  }

  @ApiOperation({
    summary: 'Update an existing article',
    description: 'Update an article by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Article ID',
    type: 'string',
  })
  @ApiBody({
    description: 'Article data to update the existing article.',
    type: UpdateArticleDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Article updated successfully.',
    type: ArticleEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found.',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() articleData: UpdateArticleDto,
  ): Promise<Article | null> {
    return this.articleService.update(id, articleData);
  }

  @ApiOperation({
    summary: 'Delete an article',
    description: 'Delete an article by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Article ID',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Article deleted successfully.',
    type: ArticleEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found.',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Article | null> {
    return this.articleService.delete(id);
  }
}
