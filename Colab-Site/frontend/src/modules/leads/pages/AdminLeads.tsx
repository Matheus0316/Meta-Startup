import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  User,
  MessageSquare,
  Filter,
  RefreshCw,
  Trash2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { leadsApi } from "../api";
import { Lead, LeadStatus } from "../types";
import { useModal } from "@/hooks/useModal";
import { AdminLeadsSkeleton } from "@/components/ui/admin-skeleton";

const AdminLeads = () => {
  const navigate = useNavigate();
  const { showError, showConfirm } = useModal();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const response = await leadsApi.getAll();
      setLeads(response.leads);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      await leadsApi.updateStatus(leadId, { status: newStatus });
      
      // Atualizar lista local
      setLeads(leads.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus }
          : lead
      ));
      
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      showError('Erro ao atualizar status. Tente novamente.');
    }
  };

  const handleDelete = async (leadId: string) => {
    showConfirm(
      'Tem certeza que deseja excluir este lead? Esta ação não pode ser desfeita.',
      async () => {
        try {
          await leadsApi.delete(leadId);
          setLeads(leads.filter(lead => lead.id !== leadId));
        } catch (error) {
          console.error('Erro ao excluir lead:', error);
          showError('Erro ao excluir lead. Tente novamente.');
        }
      },
      {
        title: 'Excluir Lead',
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    );
  };

  const getStatusBadge = (status: LeadStatus) => {
    const statusConfig = {
      [LeadStatus.NOVO]: { color: 'bg-blue-100 text-blue-800', label: '🆕 Novo' },
      [LeadStatus.LIDO]: { color: 'bg-gray-100 text-gray-800', label: '👁️ Lido' },
      [LeadStatus.EM_CONTATO]: { color: 'bg-yellow-100 text-yellow-800', label: '💬 Em Contato' },
      [LeadStatus.PROPOSTA_ENVIADA]: { color: 'bg-purple-100 text-purple-800', label: '📋 Proposta Enviada' },
      [LeadStatus.AGUARDANDO_CLIENTE]: { color: 'bg-orange-100 text-orange-800', label: '⏳ Aguardando Cliente' },
      [LeadStatus.FINALIZADO]: { color: 'bg-green-100 text-green-800', label: '✅ Finalizado' },
      [LeadStatus.CANCELADO]: { color: 'bg-red-100 text-red-800', label: '❌ Cancelado' },
    };

    const config = statusConfig[status] || statusConfig[LeadStatus.NOVO];
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const filteredLeads = filterStatus === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filterStatus);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <AdminLeadsSkeleton />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-32">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-playfair font-bold text-primary">
                Gerenciar Respostas
              </h1>
              <p className="text-muted-foreground">
                Gerencie os contatos recebidos através do formulário
              </p>
            </div>
          </div>
          
          <Button onClick={loadLeads} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-300 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Leads</p>
                  <p className="text-2xl font-bold text-primary">
                    {leads.filter(lead => lead.status !== 'CANCELADO').length}
                  </p>
                </div>
                <User className="w-8 h-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-300 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Novos</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {leads.filter(lead => lead.status === 'NOVO').length}
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-300 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {leads.filter(lead => 
                      ['LIDO', 'EM_CONTATO', 'PROPOSTA_ENVIADA', 'AGUARDANDO_CLIENTE'].includes(lead.status)
                    ).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-600/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-300 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Finalizados</p>
                  <p className="text-2xl font-bold text-green-600">
                    {leads.filter(lead => lead.status === 'FINALIZADO').length}
                  </p>
                </div>
                <Badge className="w-8 h-8 bg-green-100 text-green-600 flex items-center justify-center">✓</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-medium">Filtrar por status:</span>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 border border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value={LeadStatus.NOVO}>🆕 Novo</SelectItem>
              <SelectItem value={LeadStatus.LIDO}>👁️ Lido</SelectItem>
              <SelectItem value={LeadStatus.EM_CONTATO}>💬 Em Contato</SelectItem>
              <SelectItem value={LeadStatus.PROPOSTA_ENVIADA}>📋 Proposta Enviada</SelectItem>
              <SelectItem value={LeadStatus.AGUARDANDO_CLIENTE}>⏳ Aguardando Cliente</SelectItem>
              <SelectItem value={LeadStatus.FINALIZADO}>✅ Finalizado</SelectItem>
              <SelectItem value={LeadStatus.CANCELADO}>❌ Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de Leads */}
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {filterStatus === 'all' ? 'Nenhum lead encontrado.' : 'Nenhum lead com este status.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredLeads.map((lead) => (
              <Card key={lead.id} className="card-shadow border border-gray-300 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>
                        <CardTitle className="text-lg font-playfair text-primary">
                          {lead.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {new Date(lead.createdAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(lead.status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(lead.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{lead.email}</span>
                      </div>
                      
                      {lead.phone && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Alterar Status:</p>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => handleStatusChange(lead.id, value as LeadStatus)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={LeadStatus.NOVO}>🆕 Novo</SelectItem>
                            <SelectItem value={LeadStatus.LIDO}>👁️ Lido</SelectItem>
                            <SelectItem value={LeadStatus.EM_CONTATO}>💬 Em Contato</SelectItem>
                            <SelectItem value={LeadStatus.PROPOSTA_ENVIADA}>📋 Proposta Enviada</SelectItem>
                            <SelectItem value={LeadStatus.AGUARDANDO_CLIENTE}>⏳ Aguardando Cliente</SelectItem>
                            <SelectItem value={LeadStatus.FINALIZADO}>✅ Finalizado</SelectItem>
                            <SelectItem value={LeadStatus.CANCELADO}>❌ Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Mensagem:</p>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm leading-relaxed">{lead.message}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLeads;
