import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'token'> & { token?: string },
  ): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(
    userId: string,
    data: Partial<Omit<User, 'id'>>,
  ): Promise<User | null> {
    const user = await this.getById(userId);

    if (!user) {
      console.error('User not found:', userId);
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async delete(userId: string): Promise<User | null> {
    const user = await this.getById(userId);

    if (!user) {
      console.error('User not found:', userId);
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
