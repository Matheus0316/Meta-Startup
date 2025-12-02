import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Edit, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Home,
  AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articlesApi } from "../api";
import { Article } from "../types";
import { useModal } from "@/hooks/useModal";
import { AdminArticlesSkeleton } from "@/components/ui/admin-skeleton";

const AdminArticles = () => {
  const navigate = useNavigate();
  const { showError, showWarning } = useModal();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [homepageArticles, setHomepageArticles] = useState<string[]>([]);
  const [switchLoading, setSwitchLoading] = useState<string | null>(null);
  const articlesPerPage = 9;

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await articlesApi.getAll();
      setArticles(response.articles);
      
      // Carregar artigos que estão na homepage
      const homepageIds = response.articles
        .filter(article => article.active)
        .map(article => article.id);
      setHomepageArticles(homepageIds);
    } catch (error) {
      console.error('Erro ao carregar artigos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHomepageToggle = async (articleId: string, isChecked: boolean) => {
    try {
      // Verificar se já tem 3 artigos na homepage
      if (isChecked && homepageArticles.length >= 3) {
        showWarning('Você só pode selecionar até 3 artigos para a tela inicial.');
        return;
      }

      // Iniciar loading para este switch específico
      setSwitchLoading(articleId);

      // Atualizar no backend
      await articlesApi.update(articleId, { active: isChecked });
      
      // Atualizar estado local
      if (isChecked) {
        setHomepageArticles([...homepageArticles, articleId]);
      } else {
        setHomepageArticles(homepageArticles.filter(id => id !== articleId));
      }

      // Atualizar lista de artigos
      setArticles(articles.map(article => 
        article.id === articleId 
          ? { ...article, active: isChecked }
          : article
      ));
    } catch (error) {
      console.error('Erro ao atualizar artigo:', error);
      showError('Erro ao atualizar artigo. Tente novamente.');
    } finally {
      setSwitchLoading(null);
    }
  };

  // Paginação
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <AdminArticlesSkeleton />
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
          <div>
            <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
              Gerenciar Artigos
            </h1>
            <p className="text-muted-foreground">
              Gerencie seus artigos e selecione quais aparecerão na tela inicial
            </p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/admin/artigos/novo')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Artigo
          </Button>
        </div>

        {/* Informações sobre homepage */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">
              Artigos na tela inicial: {homepageArticles.length}/3
            </span>
          </div>
          {homepageArticles.length === 3 && (
            <div className="flex items-center space-x-2 mt-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-800">
                Limite máximo atingido. Desative um artigo para ativar outro.
              </span>
            </div>
          )}
        </div>

        {/* Grade de artigos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentArticles.map((article) => (
            <Card key={article.id} className="card-shadow border-0 overflow-hidden">
              {/* Imagem do artigo */}
              <div className="h-48 overflow-hidden">
                {article.image ? (
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-primary/40" />
                  </div>
                )}
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {article.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <CardTitle className="text-lg font-playfair text-primary line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Toggle para homepage */}
                <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Home className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Tela inicial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {switchLoading === article.id && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    )}
                    <Switch
                      checked={article.active || false}
                      onCheckedChange={(checked) => handleHomepageToggle(article.id, checked)}
                      disabled={switchLoading === article.id || (!article.active && homepageArticles.length >= 3)}
                      className="disabled:cursor-default"
                    />
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/artigo/${article.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/admin/artigos/editar/${article.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminArticles;
