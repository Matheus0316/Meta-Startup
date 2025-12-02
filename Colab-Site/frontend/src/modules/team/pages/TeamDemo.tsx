import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModal } from "@/hooks/useModal";
import { teamApi } from "../api";
import { CreateTeamMemberRequest } from "../types";

const TeamDemo = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useModal();

  const sampleTeamMembers: CreateTeamMemberRequest[] = [
    {
      name: "Dr. Paulo Maia",
      position: "Advogado Sênior e Fundador",
      description: "Especialista em Direito do Trabalho com mais de 15 anos de experiência. Graduado pela Universidade Federal da Paraíba, com pós-graduação em Direito Trabalhista. Dedicado à defesa dos direitos dos trabalhadores com ética, transparência e excelência técnica.",
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758593450/maia-advocacia/l8xukaskybxoqm02pkiu.jpg",
      email: "paulo@maiaadvocacia.com",
      active: true
    },
    {
      name: "Dra. Maria Silva",
      position: "Advogada Associada",
      description: "Especializada em consultoria preventiva e compliance trabalhista, com foco em orientação empresarial e resolução de conflitos laborais. Formada pela UFPB com especialização em Direito Empresarial e Trabalhista.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      email: "maria@maiaadvocacia.com",
      active: true
    },
    {
      name: "Dr. João Santos",
      position: "Advogado Trabalhista",
      description: "Advogado especialista em ações trabalhistas e previdenciárias. Experiência sólida em negociações coletivas e representação sindical. Comprometido com a justiça social e defesa dos direitos fundamentais do trabalhador.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      email: "joao@maiaadvocacia.com",
      active: true
    },
    {
      name: "Dra. Ana Costa",
      position: "Consultora Jurídica",
      description: "Especialista em consultoria jurídica preventiva para empresas. Atua na elaboração de políticas internas, treinamentos e adequação às normas trabalhistas, evitando conflitos e garantindo compliance organizacional.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      email: "ana@maiaadvocacia.com",
      active: true
    }
  ];

  const createSampleTeamMembers = async () => {
    setLoading(true);
    try {
      for (const member of sampleTeamMembers) {
        await teamApi.create(member);
      }
      showSuccess(`${sampleTeamMembers.length} membros da equipe criados com sucesso!`);
    } catch (error) {
      showError("Erro ao criar membros da equipe de exemplo");
      console.error("Error creating sample team members:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearAllTeamMembers = async () => {
    setLoading(true);
    try {
      const response = await teamApi.getAll();
      for (const member of response.team) {
        await teamApi.delete(member.id);
      }
      showSuccess("Todos os membros da equipe foram removidos!");
    } catch (error) {
      showError("Erro ao remover membros da equipe");
      console.error("Error clearing team members:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Demo - Sistema de Equipe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Funcionalidades Implementadas:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>✅ Seção Team na homepage com carrossel de 2 cards</li>
              <li>✅ Tela administrativa para gerenciar equipe</li>
              <li>✅ Upload de imagem com redimensionamento automático</li>
              <li>✅ Controle de ativo/inativo para homepage</li>
              <li>✅ CRUD completo (Criar, Ler, Atualizar, Deletar)</li>
              <li>✅ Fotos em moldura circular nos cards</li>
              <li>✅ Navegação por setas e indicadores</li>
              <li>✅ Responsivo para mobile e desktop</li>
              <li>✅ Campo email opcional (uso interno)</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={createSampleTeamMembers}
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar Equipe de Exemplo"}
            </Button>
            
            <Button 
              variant="outline"
              onClick={clearAllTeamMembers}
              disabled={loading}
            >
              {loading ? "Removendo..." : "Limpar Todos"}
            </Button>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Como usar:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Clique em "Criar Equipe de Exemplo" para popular o sistema</li>
              <li>Acesse "Área Admin" → "Gerenciar Equipe" para editar</li>
              <li>Veja o carrossel funcionando na homepage (2 cards visíveis)</li>
              <li>Teste o upload de imagens criando novos membros</li>
              <li>Use o controle ativo/inativo para mostrar/ocultar da homepage</li>
            </ol>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold mb-2 text-blue-800">Diferenças do Team vs Workers:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
              <li><strong>Team</strong>: Equipe do escritório (advogados, consultores)</li>
              <li><strong>Workers</strong>: Informações para trabalhadores (clientes)</li>
              <li><strong>Team</strong>: Carrossel com 2 cards visíveis</li>
              <li><strong>Workers</strong>: Seção informativa estática</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamDemo;
