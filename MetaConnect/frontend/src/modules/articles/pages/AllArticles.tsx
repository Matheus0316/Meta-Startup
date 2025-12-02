import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ArrowRight, 
  Search,
  ChevronLeft, 
  ChevronRight,
  Filter,
  Edit,
  Plus
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articlesApi } from "../api";
import { Article } from "../types";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { ArticleGridSkeleton } from "@/components/ui/article-skeleton";

const AllArticles = () => {
  useScrollToTop(); // Hook para scroll automático ao topo
  
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const articlesPerPage = 6;
  
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

  useEffect(() => {
    loadArticles();
    loadCategories();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, selectedCategory]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await articlesApi.getAll();
      setArticles(response.articles || []);
    } catch (error) {
      console.error('Erro ao carregar artigos:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await articlesApi.getCategories();
      setCategories(response.categories || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      setCategories([]);
    }
  };

  const filterArticles = () => {
    // Verificar se articles é um array válido
    if (!Array.isArray(articles)) {
      setFilteredArticles([]);
      return;
    }
    
    let filtered = articles;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article && article.title && article.content &&
        (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtrar por categoria
    if (selectedCategory) {
      filtered = filtered.filter(article => article && article.category === selectedCategory);
    }

    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset para primeira página ao filtrar
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterArticles();
  };

  // Paginação
  const totalPages = Math.ceil((filteredArticles?.length || 0) / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles?.slice(startIndex, startIndex + articlesPerPage) || [];

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll suave para o topo da lista de artigos
    const articlesSection = document.querySelector('main');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleArticleClick = (articleId: string) => {
    // Navegar para página do artigo individual
    navigate(`/artigo/${articleId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8 mt-32">
          {/* Título skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 w-80 bg-muted animate-pulse rounded-md mx-auto mb-4"></div>
            <div className="h-6 w-96 bg-muted animate-pulse rounded-md mx-auto"></div>
          </div>
          
          {/* Filtros skeleton */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="h-10 w-full md:w-80 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 w-32 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 w-40 bg-muted animate-pulse rounded-md"></div>
          </div>
          
          {/* Grid de artigos skeleton */}
          <ArticleGridSkeleton count={6} />
          
          {/* Paginação skeleton */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <div className="h-10 w-10 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 w-10 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 w-10 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 w-10 bg-muted animate-pulse rounded-md"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-32">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-primary mb-4">
                Todos os Artigos
              </h1>
            </div>
            {isAdmin && (
              <Button 
                size="lg"
                onClick={() => navigate('/admin/artigos/novo')}
                className="mb-4 sm:mb-0"
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar Artigo
              </Button>
            )}
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore nosso conteúdo completo sobre Direito Trabalhista e mantenha-se 
            sempre atualizado com as últimas novidades jurídicas.
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Busca */}
            <div className="md:col-span-2">
              <form onSubmit={handleSearch} className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar artigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">
                  Buscar
                </Button>
              </form>
            </div>

            {/* Filtro por categoria */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {filteredArticles?.length || 0} artigo{(filteredArticles?.length || 0) !== 1 ? 's' : ''} encontrado{(filteredArticles?.length || 0) !== 1 ? 's' : ''}
            </span>
            {(searchTerm || selectedCategory) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
              >
                Limpar filtros
              </Button>
            )}
          </div>
        </div>

        {/* Grade de artigos */}
        {currentArticles.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="card-shadow border-0 overflow-hidden group smooth-transition cursor-pointer"
                  onClick={() => handleArticleClick(article.id)}
                >
                  {/* Imagem do artigo */}
                  <div className="h-48 overflow-hidden">
                    {article.image ? (
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover smooth-transition"
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
                    <h3 className="text-xl font-playfair font-semibold text-primary group-hover:text-primary/80 smooth-transition line-clamp-2">
                      {article.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {article.subtitle || article.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-primary hover:text-primary/80 font-medium group">
                        <span>Ler artigo</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 smooth-transition" />
                      </div>
                      {isAdmin && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/artigos/editar/${article.id}`);
                          }}
                          className="opacity-0 group-hover:opacity-100 smooth-transition"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
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
                  Anterior
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
                  Próxima
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum artigo encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar seus filtros ou termo de busca.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
            >
              Ver todos os artigos
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AllArticles;
