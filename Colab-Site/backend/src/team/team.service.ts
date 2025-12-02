import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './team.entity';
import { Team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    return this.prisma.team.create({
      data: {
        name: createTeamDto.name,
        position: createTeamDto.position,
        description: createTeamDto.description,
        image: createTeamDto.image,
        email: createTeamDto.email,
        active: createTeamDto.active ?? true,
      },
    });
  }

  async findAll(): Promise<Team[]> {
    return this.prisma.team.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllActive(): Promise<Team[]> {
    return this.prisma.team.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Team> {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.findById(id); // Verifica se existe

    return this.prisma.team.update({
      where: { id },
      data: updateTeamDto,
    });
  }

  async delete(id: string): Promise<Team> {
    const team = await this.findById(id); // Verifica se existe

    return this.prisma.team.delete({
      where: { id },
    });
  }

  async toggleActive(id: string): Promise<Team> {
    const team = await this.findById(id);

    return this.prisma.team.update({
      where: { id },
      data: {
        active: !team.active,
      },
    });
  }

  async getStatistics() {
    const [total, active, inactive] = await Promise.all([
      this.prisma.team.count(),
      this.prisma.team.count({ where: { active: true } }),
      this.prisma.team.count({ where: { active: false } }),
    ]);

    return {
      total,
      active,
      inactive,
    };
  }
}
