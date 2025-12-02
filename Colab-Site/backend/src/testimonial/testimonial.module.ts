import { Module } from '@nestjs/common';
import { TestimonialController } from './testimonial.controller';
import { TestimonialService } from './testimonial.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TestimonialController],
  providers: [TestimonialService, PrismaService],
  exports: [TestimonialService],
})
export class TestimonialModule {}
