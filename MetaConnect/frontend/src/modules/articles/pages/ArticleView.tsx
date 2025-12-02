import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ArrowLeft, 
  ArrowRight,
  Share2,
  Clock,
  User,
  Edit
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articlesApi } from "../api";
import { Article } from "../types";
import { useModal } from "@/hooks/useModal";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { ArticleViewSkeleton } from "@/components/ui/article-skeleton";

const ArticleView: React.FC = () => {
  useScrollToTop(); // Hook para scroll automático ao topo
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showSuccess } = useModal();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Verificar estado de admin
  const checkAdminStatus = () => {
    const hasToken = localStorage.getItem('authToken');
    const hasUser = localStorage.getItem('user');
    setIsAdmin(!!(hasToken && hasUser));
  };
  
  useEffect(() => {
    // Verificar status inicial
    checkAdminStatus();
    
    // Escutar mudanças no localStorage
    const handleStorageChange = () => {
      checkAdminStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Escutar evento customizado para mudanças de login
    const handleAuthChange = () => {
      checkAdminStatus();
    };
    
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const articleId = id || '';

  useEffect(() => {
    if (articleId && articleId.length > 0) {
      // Fazer scroll para o topo sempre que um novo artigo for carregado
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      loadArticle();
      loadRelatedArticles();
    } else {
      setLoading(false);
    }
  }, [articleId]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const response = await articlesApi.getById(articleId);
      
      if (response && response.article) {
        setArticle(response.article);
      } else {
        console.error('Resposta da API não contém artigo:', response);
        setArticle(null);
      }
    } catch (error) {
      console.error('Erro ao carregar artigo:', error);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedArticles = async () => {
    try {
      const response = await articlesApi.getAll();
      // Filtrar artigos relacionados (mesma categoria, excluindo o atual)
      const related = response.articles
        .filter(a => a.id !== articleId)
        .slice(0, 3); // Pegar apenas 3 artigos relacionados
      setRelatedArticles(related);
    } catch (error) {
      console.error('Erro ao carregar artigos relacionados:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.subtitle || article.title,
          url: window.location.href,
        });
      } catch (error) {
        // Silencioso - fallback será usado
      }
    } else {
      // Fallback: copiar URL para clipboard
      navigator.clipboard.writeText(window.location.href);
      showSuccess('Link copiado para a área de transferência!');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToArticle = (articleId: string) => {
    navigate(`/artigo/${articleId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <ArticleViewSkeleton />
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-4 md:py-8 mt-20 md:mt-32 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Artigo não encontrado
            </h1>
            <p className="text-gray-600 mb-6">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Button 
              variant="outline"
              onClick={goBack}
              className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 text-primary hover:bg-primary/15 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-4 md:py-8 mt-20 md:mt-32 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        {/* Navegação */}
        <div className="mb-4 md:mb-8">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline"
              onClick={goBack} 
              className="mb-2 md:mb-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 text-primary hover:bg-primary/15 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            {isAdmin && (
              <Button 
                onClick={() => navigate(`/admin/artigos/editar/${article.id}`)}
                className="mb-4"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar Artigo
              </Button>
            )}
          </div>
        </div>

        {/* Artigo */}
        <article className="max-w-4xl mx-auto">
          {/* Imagem do artigo */}
          <div className="mb-8">
            {article.image ? (
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            ) : (
              <div className="h-64 lg:h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                <Calendar className="w-16 h-16 text-primary/40" />
              </div>
            )}
          </div>

          {/* Título */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {article.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>5 min de leitura</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-primary mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Subtítulo */}
            {article.subtitle && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {article.subtitle}
              </p>
            )}

            {/* Botão de compartilhar */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Paulo Maia</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </header>

          {/* Conteúdo do artigo */}
          <div className="prose prose-lg max-w-none mb-12">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Rodapé do artigo */}
          <footer className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Publicado em {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                {article.updatedAt !== article.createdAt && (
                  <span> • Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-BR')}</span>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </footer>
        </article>

        {/* Artigos relacionados */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-playfair font-bold text-primary mb-8 text-center">
              Artigos Relacionados
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card 
                  key={relatedArticle.id}
                  className="card-shadow border-0 overflow-hidden group smooth-transition hover:scale-105 cursor-pointer"
                  onClick={() => goToArticle(relatedArticle.id)}
                >
                  <div className="h-32 overflow-hidden">
                    {relatedArticle.image ? (
                      <img 
                        src={relatedArticle.image} 
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-primary/40" />
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary w-fit mb-2">
                      {relatedArticle.category}
                    </Badge>
                    <h3 className="text-lg font-playfair font-semibold text-primary group-hover:text-primary/80 smooth-transition line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center text-primary hover:text-primary/80 font-medium group">
                      <span className="text-sm">Ler artigo</span>
                      <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 smooth-transition" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ArticleView;
