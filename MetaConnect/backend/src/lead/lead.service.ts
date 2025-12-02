import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto, UpdateLeadStatusDto, LeadStatus } from './lead.entity';
import { Lead } from '@prisma/client';

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.prisma.lead.create({
      data: {
        name: createLeadDto.name,
        email: createLeadDto.email,
        phone: createLeadDto.phone,
        message: createLeadDto.message,
        status: LeadStatus.NOVO,
      },
    });
  }

  async findAll(): Promise<Lead[]> {
    return this.prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Lead> {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return lead;
  }

  async updateStatus(id: string, updateStatusDto: UpdateLeadStatusDto): Promise<Lead> {
    const lead = await this.findById(id); // Verifica se existe

    return this.prisma.lead.update({
      where: { id },
      data: {
        status: updateStatusDto.status,
      },
    });
  }

  async delete(id: string): Promise<Lead> {
    const lead = await this.findById(id); // Verifica se existe

    return this.prisma.lead.delete({
      where: { id },
    });
  }

  async getStatistics() {
    const [total, novo, lido, emContato, finalizado] = await Promise.all([
      this.prisma.lead.count(),
      this.prisma.lead.count({ where: { status: LeadStatus.NOVO } }),
      this.prisma.lead.count({ where: { status: LeadStatus.LIDO } }),
      this.prisma.lead.count({ where: { status: LeadStatus.EM_CONTATO } }),
      this.prisma.lead.count({ where: { status: LeadStatus.FINALIZADO } }),
    ]);

    return {
      total,
      novo,
      lido,
      emContato,
      finalizado,
      statusDistribution: {
        [LeadStatus.NOVO]: novo,
        [LeadStatus.LIDO]: lido,
        [LeadStatus.EM_CONTATO]: emContato,
        [LeadStatus.PROPOSTA_ENVIADA]: await this.prisma.lead.count({ where: { status: LeadStatus.PROPOSTA_ENVIADA } }),
        [LeadStatus.AGUARDANDO_CLIENTE]: await this.prisma.lead.count({ where: { status: LeadStatus.AGUARDANDO_CLIENTE } }),
        [LeadStatus.FINALIZADO]: finalizado,
        [LeadStatus.CANCELADO]: await this.prisma.lead.count({ where: { status: LeadStatus.CANCELADO } }),
      },
    };
  }
}
