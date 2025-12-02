import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
} from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { Testimonial } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { 
  TestimonialEntity, 
  CreateTestimonialDto, 
  UpdateTestimonialDto 
} from './testimonial.entity';

@ApiTags('testimonials')
@ApiSecurity('Authorisation')
@Controller('testimonials')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @ApiOperation({
    summary: 'Get all testimonials',
    description: 'Retrieve all testimonials ordered by creation date (newest first).',
  })
  @ApiResponse({
    status: 200,
    description: 'Testimonials retrieved successfully.',
    type: [TestimonialEntity],
  })
  @Get()
  async getAll(): Promise<Testimonial[]> {
    return this.testimonialService.getAll();
  }

  @ApiOperation({
    summary: 'Get testimonial by ID',
    description: 'Retrieve a specific testimonial by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Testimonial ID',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Testimonial retrieved successfully.',
    type: TestimonialEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Testimonial not found.',
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Testimonial | null> {
    return this.testimonialService.getById(id);
  }

  @ApiOperation({
    summary: 'Create a new testimonial',
    description: 'Create a new testimonial with the provided data.',
  })
  @ApiBody({
    description: 'Testimonial data to create a new testimonial.',
    type: CreateTestimonialDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Testimonial created successfully.',
    type: TestimonialEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @Post()
  async create(@Body() testimonialData: CreateTestimonialDto): Promise<Testimonial> {
    return this.testimonialService.create(testimonialData);
  }

  @ApiOperation({
    summary: 'Update an existing testimonial',
    description: 'Update a testimonial by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Testimonial ID',
    type: 'string',
  })
  @ApiBody({
    description: 'Testimonial data to update the existing testimonial.',
    type: UpdateTestimonialDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Testimonial updated successfully.',
    type: TestimonialEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Testimonial not found.',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() testimonialData: UpdateTestimonialDto,
  ): Promise<Testimonial | null> {
    return this.testimonialService.update(id, testimonialData);
  }

  @ApiOperation({
    summary: 'Delete a testimonial',
    description: 'Delete a testimonial by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Testimonial ID',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Testimonial deleted successfully.',
    type: TestimonialEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Testimonial not found.',
  })
  @ApiOperation({
    summary: 'Toggle testimonial active status',
    description: 'Toggle the active/inactive status of a testimonial by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Testimonial ID',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Testimonial status toggled successfully.',
    type: TestimonialEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Testimonial not found.',
  })
  @Patch(':id/toggle-active')
  async toggleActive(@Param('id') id: string): Promise<{
    success: boolean;
    message: string;
    testimonial: Testimonial;
  }> {
    const testimonial = await this.testimonialService.toggleActive(id);
    
    return {
      success: true,
      message: `Testimonial ${testimonial.active ? 'ativado' : 'desativado'} com sucesso`,
      testimonial,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Testimonial | null> {
    return this.testimonialService.delete(id);
  }
}
