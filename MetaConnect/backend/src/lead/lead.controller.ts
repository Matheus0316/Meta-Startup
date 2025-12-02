import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { LeadService } from './lead.service';
import { 
  CreateLeadDto, 
  UpdateLeadStatusDto, 
  LeadEntity, 
  LeadStatus 
} from './lead.entity';
import { PublicRoute } from '../decorators/public.decorator';

@ApiTags('Leads')
@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @PublicRoute()
  @ApiOperation({ 
    summary: 'Criar novo lead',
    description: 'Endpoint público para capturar leads do formulário de contato do site' 
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Lead criado com sucesso',
    type: LeadEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  @ApiBody({ type: CreateLeadDto })
  async create(@Body() createLeadDto: CreateLeadDto) {
    const lead = await this.leadService.create(createLeadDto);
    
    return {
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      lead,
    };
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os leads',
    description: 'Endpoint administrativo para listar todos os leads (requer API key)' 
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de leads',
    type: [LeadEntity],
  })
  async findAll() {
    const leads = await this.leadService.findAll();
    
    return {
      success: true,
      count: leads.length,
      leads,
    };
  }

  @Get('statistics')
  @ApiOperation({ 
    summary: 'Estatísticas dos leads',
    description: 'Endpoint administrativo para obter estatísticas dos leads' 
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Estatísticas dos leads',
  })
  async getStatistics() {
    const stats = await this.leadService.getStatistics();
    
    return {
      success: true,
      statistics: stats,
    };
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar lead por ID',
    description: 'Endpoint administrativo para buscar um lead específico' 
  })
  @ApiParam({ name: 'id', description: 'ID do lead' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lead encontrado',
    type: LeadEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Lead não encontrado',
  })
  async findById(@Param('id') id: string) {
    const lead = await this.leadService.findById(id);
    
    return {
      success: true,
      lead,
    };
  }

  @Put(':id/status')
  @ApiOperation({ 
    summary: 'Atualizar status do lead',
    description: 'Endpoint administrativo para atualizar o status de um lead' 
  })
  @ApiParam({ name: 'id', description: 'ID do lead' })
  @ApiBody({ type: UpdateLeadStatusDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status atualizado com sucesso',
    type: LeadEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Lead não encontrado',
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateLeadStatusDto,
  ) {
    const lead = await this.leadService.updateStatus(id, updateStatusDto);
    
    return {
      success: true,
      message: 'Status atualizado com sucesso',
      lead,
    };
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Deletar lead',
    description: 'Endpoint administrativo para deletar um lead' 
  })
  @ApiParam({ name: 'id', description: 'ID do lead' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lead deletado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Lead não encontrado',
  })
  async delete(@Param('id') id: string) {
    await this.leadService.delete(id);
    
    return {
      success: true,
      message: 'Lead deletado com sucesso',
    };
  }

  @Get('status/options')
  @PublicRoute()
  @ApiOperation({ 
    summary: 'Opções de status disponíveis',
    description: 'Lista todas as opções de status disponíveis para os leads' 
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de status disponíveis',
  })
  async getStatusOptions() {
    return {
      success: true,
      statusOptions: Object.values(LeadStatus).map(status => ({
        value: status,
        label: this.getStatusLabel(status),
      })),
    };
  }

  private getStatusLabel(status: LeadStatus): string {
    const labels = {
      [LeadStatus.NOVO]: '🆕 Novo',
      [LeadStatus.LIDO]: '👁️ Lido',
      [LeadStatus.EM_CONTATO]: '💬 Em Contato',
      [LeadStatus.PROPOSTA_ENVIADA]: '📋 Proposta Enviada',
      [LeadStatus.AGUARDANDO_CLIENTE]: '⏳ Aguardando Cliente',
      [LeadStatus.FINALIZADO]: '✅ Finalizado',
      [LeadStatus.CANCELADO]: '❌ Cancelado',
    };
    
    return labels[status] || status;
  }
}
