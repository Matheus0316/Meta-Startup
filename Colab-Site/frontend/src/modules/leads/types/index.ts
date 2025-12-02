export enum LeadStatus {
  NOVO = 'NOVO',
  LIDO = 'LIDO',
  EM_CONTATO = 'EM_CONTATO',
  PROPOSTA_ENVIADA = 'PROPOSTA_ENVIADA',
  AGUARDANDO_CLIENTE = 'AGUARDANDO_CLIENTE',
  FINALIZADO = 'FINALIZADO',
  CANCELADO = 'CANCELADO',
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface UpdateLeadStatusRequest {
  status: LeadStatus;
}

export interface LeadsResponse {
  success: boolean;
  count: number;
  leads: Lead[];
}

export interface LeadResponse {
  success: boolean;
  lead: Lead;
}

export interface CreateLeadResponse {
  success: boolean;
  message: string;
  lead: Lead;
}

export interface LeadStatistics {
  total: number;
  novo: number;
  lido: number;
  emContato: number;
  finalizado: number;
  statusDistribution: Record<LeadStatus, number>;
}

export interface LeadStatisticsResponse {
  success: boolean;
  statistics: LeadStatistics;
}

export interface StatusOption {
  value: LeadStatus;
  label: string;
}

export interface StatusOptionsResponse {
  success: boolean;
  statusOptions: StatusOption[];
}
