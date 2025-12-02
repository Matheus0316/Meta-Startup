import { ApiProperty } from '@nestjs/swagger';

export enum LeadStatus {
  NOVO = 'NOVO',
  LIDO = 'LIDO',
  EM_CONTATO = 'EM_CONTATO',
  PROPOSTA_ENVIADA = 'PROPOSTA_ENVIADA',
  AGUARDANDO_CLIENTE = 'AGUARDANDO_CLIENTE',
  FINALIZADO = 'FINALIZADO',
  CANCELADO = 'CANCELADO',
}

export class LeadEntity {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'ID único do lead' })
  id: string;

  @ApiProperty({ example: 'João Silva', description: 'Nome completo' })
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email de contato' })
  email: string;

  @ApiProperty({ example: '(11) 99999-9999', description: 'Telefone/WhatsApp', required: false })
  phone?: string;

  @ApiProperty({ example: 'Gostaria de saber mais sobre seus serviços jurídicos...', description: 'Mensagem do cliente' })
  message: string;

  @ApiProperty({ 
    enum: LeadStatus, 
    example: LeadStatus.NOVO, 
    description: 'Status atual do lead' 
  })
  status: LeadStatus;

  @ApiProperty({ example: '2025-09-20T19:00:00.000Z', description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ example: '2025-09-20T19:00:00.000Z', description: 'Data da última atualização' })
  updatedAt: Date;
}

export class CreateLeadDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo' })
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email de contato' })
  email: string;

  @ApiProperty({ example: '(11) 99999-9999', description: 'Telefone/WhatsApp', required: false })
  phone?: string;

  @ApiProperty({ example: 'Gostaria de saber mais sobre seus serviços jurídicos...', description: 'Mensagem do cliente' })
  message: string;
}

export class UpdateLeadStatusDto {
  @ApiProperty({ 
    enum: LeadStatus, 
    example: LeadStatus.LIDO, 
    description: 'Novo status do lead' 
  })
  status: LeadStatus;
}
