import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async getById(articleId: string): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { id: articleId },
    });
  }

  async getAll(): Promise<Article[]> {
    return this.prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getByCategory(category: string): Promise<Article[]> {
    return this.prisma.article.findMany({
      where: { 
        category: {
          contains: category,
          mode: 'insensitive',
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async searchArticles(searchTerm: string): Promise<Article[]> {
    return this.prisma.article.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            subtitle: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            category: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateArticleDto): Promise<Article> {
    const articleData: any = {
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      category: data.category,
      image: data.image,
      active: data.active ?? true, // Default para true se não especificado
    };

    return this.prisma.article.create({
      data: articleData,
    });
  }

  async update(
    articleId: string,
    data: UpdateArticleDto,
  ): Promise<Article | null> {
    const article = await this.getById(articleId);

    if (!article) {
      console.error('Article not found:', articleId);
      throw new NotFoundException('Article not found');
    }

    const updateData: any = { ...data };

    return this.prisma.article.update({
      where: { id: articleId },
      data: updateData,
    });
  }

  async delete(articleId: string): Promise<Article | null> {
    const article = await this.getById(articleId);

    if (!article) {
      console.error('Article not found:', articleId);
      throw new NotFoundException('Article not found');
    }

    return this.prisma.article.delete({
      where: { id: articleId },
    });
  }

  async getCategories(): Promise<string[]> {
    const articles = await this.prisma.article.findMany({
      select: { category: true },
      distinct: ['category'],
    });
    
    return articles.map(article => article.category);
  }
}
