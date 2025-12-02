import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Testimonial } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from './testimonial.entity';

@Injectable()
export class TestimonialService {
  constructor(private prisma: PrismaService) {}

  async getById(testimonialId: string): Promise<Testimonial | null> {
    return this.prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });
  }

  async getAll(): Promise<Testimonial[]> {
    return this.prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateTestimonialDto): Promise<Testimonial> {
    return this.prisma.testimonial.create({
      data,
    });
  }

  async update(
    testimonialId: string,
    data: UpdateTestimonialDto,
  ): Promise<Testimonial | null> {
    const testimonial = await this.getById(testimonialId);

    if (!testimonial) {
      console.error('Testimonial not found:', testimonialId);
      throw new NotFoundException('Testimonial not found');
    }

    return this.prisma.testimonial.update({
      where: { id: testimonialId },
      data,
    });
  }

  async toggleActive(testimonialId: string): Promise<Testimonial> {
    const testimonial = await this.getById(testimonialId);

    if (!testimonial) {
      console.error('Testimonial not found:', testimonialId);
      throw new NotFoundException('Testimonial not found');
    }

    return this.prisma.testimonial.update({
      where: { id: testimonialId },
      data: {
        active: !testimonial.active,
      },
    });
  }

  async delete(testimonialId: string): Promise<Testimonial | null> {
    const testimonial = await this.getById(testimonialId);

    if (!testimonial) {
      console.error('Testimonial not found:', testimonialId);
      throw new NotFoundException('Testimonial not found');
    }

    return this.prisma.testimonial.delete({
      where: { id: testimonialId },
    });
  }
}
