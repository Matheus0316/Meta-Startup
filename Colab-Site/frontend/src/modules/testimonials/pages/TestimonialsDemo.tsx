import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModal } from "@/hooks/useModal";
import { testimonialsApi } from "../api";
import { CreateTestimonialRequest } from "../types";

const TestimonialsDemo = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useModal();

  const sampleTestimonials: CreateTestimonialRequest[] = [
    {
      content: "Profissionalismo excepcional! O Dr. Paulo Maia me orientou com clareza sobre meus direitos trabalhistas e conseguiu um resultado muito satisfatório no meu caso.",
      author: "Maria Silva",
      position: "Enfermeira",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      active: true
    },
    {
      content: "Transparência total em todas as etapas do processo. Sempre bem informado sobre os andamentos e com orientações claras sobre as melhores decisões.",
      author: "João Santos",
      position: "Operador de Máquinas",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      active: true
    },
    {
      content: "Atendimento humanizado e explicações didáticas sobre todos os procedimentos jurídicos. Me senti seguro durante todo o processo.",
      author: "Ana Costa",
      position: "Professora",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      active: true
    },
    {
      content: "Excelente trabalho na consultoria preventiva para nossa empresa. Evitamos diversos problemas trabalhistas graças às orientações precisas.",
      author: "Carlos Oliveira",
      position: "Diretor de RH",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      active: true
    },
    {
      content: "Conhecimento técnico impressionante e dedicação total ao caso. Superou minhas expectativas em todos os aspectos do atendimento jurídico.",
      author: "Lucia Ferreira",
      position: "Vendedora",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      active: true
    }
  ];

  const createSampleTestimonials = async () => {
    setLoading(true);
    try {
      for (const testimonial of sampleTestimonials) {
        await testimonialsApi.create(testimonial);
      }
      showSuccess(`${sampleTestimonials.length} depoimentos de exemplo criados com sucesso!`);
    } catch (error) {
      showError("Erro ao criar depoimentos de exemplo");
      console.error("Error creating sample testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearAllTestimonials = async () => {
    setLoading(true);
    try {
      const testimonials = await testimonialsApi.getAll();
      for (const testimonial of testimonials) {
        await testimonialsApi.delete(testimonial.id);
      }
      showSuccess("Todos os depoimentos foram removidos!");
    } catch (error) {
      showError("Erro ao remover depoimentos");
      console.error("Error clearing testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Demo - Sistema de Depoimentos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Funcionalidades Implementadas:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>✅ Carrossel dinâmico na homepage com depoimentos ativos</li>
              <li>✅ Tela administrativa para gerenciar depoimentos</li>
              <li>✅ Upload de imagem com redimensionamento automático</li>
              <li>✅ Controle de ativo/inativo para homepage</li>
              <li>✅ CRUD completo (Criar, Ler, Atualizar, Deletar)</li>
              <li>✅ Fotos em moldura circular nos cards</li>
              <li>✅ Navegação por setas e indicadores</li>
              <li>✅ Responsivo para mobile e desktop</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={createSampleTestimonials}
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar Depoimentos de Exemplo"}
            </Button>
            
            <Button 
              variant="outline"
              onClick={clearAllTestimonials}
              disabled={loading}
            >
              {loading ? "Removendo..." : "Limpar Todos"}
            </Button>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Como usar:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Clique em "Criar Depoimentos de Exemplo" para popular o sistema</li>
              <li>Acesse "Área Admin" → "Gerenciar Depoimentos" para editar</li>
              <li>Veja o carrossel funcionando na homepage</li>
              <li>Teste o upload de imagens criando novos depoimentos</li>
              <li>Use o controle ativo/inativo para mostrar/ocultar da homepage</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialsDemo;
