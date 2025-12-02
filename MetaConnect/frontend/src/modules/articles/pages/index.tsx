import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Edit, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { articlesApi } from "../api";
import { Article } from "../types";
import { BlogSectionSkeleton } from "@/components/ui/article-skeleton";
import GraphDecoration from "@/components/GraphDecoration";

const BlogSection = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  
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
    loadHomepageArticles();
  }, []);

  // Auto-scroll para mobile
  useEffect(() => {
    if (articles.length > 1) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const maxIndex = articles.length - 1;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 5000); // Muda a cada 5 segundos

      return () => {
        if (autoScrollRef.current) {
          clearInterval(autoScrollRef.current);
        }
      };
    }
  }, [articles.length]);

  // Scroll para o índice específico
  useEffect(() => {
    if (scrollContainerRef.current && articles.length > 0) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 16; // 1rem gap
      const scrollPosition = currentIndex * (cardWidth + gap);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, articles]);

  const loadHomepageArticles = async () => {
    try {
      setLoading(true);
      const response = await articlesApi.getAll();
      
      const articles = response.articles || [];
      
      // Filtrar apenas artigos marcados para aparecer na homepage (máximo 3)
      const homepageArticles = articles
        .filter(article => article.active)
        .slice(0, 3);
      
      // Se não houver artigos marcados para homepage, pegar os 3 mais recentes
      if (homepageArticles.length === 0) {
        const recentArticles = articles
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);
        setArticles(recentArticles);
      } else {
        setArticles(homepageArticles);
      }
    } catch (error) {
      console.error('Erro ao carregar artigos da homepage:', error);
      // Em caso de erro, usar artigos estáticos como fallback
      setArticles([
        {
          id: "1",
          title: "Reforma Trabalhista 2025: O que mudou na prática",
          subtitle: "Análise técnica das principais alterações na legislação trabalhista e seus impactos práticos para trabalhadores e empresas.",
          content: "",
          category: "Legislação",
          active: true,
          createdAt: "2025-01-15T10:00:00Z",
          updatedAt: "2025-01-15T10:00:00Z"
        },
        {
          id: "2",
          title: "5 Medidas Preventivas para Empresas Evitarem Ações Trabalhistas",
          subtitle: "Estratégias práticas de compliance trabalhista para reduzir riscos jurídicos e fortalecer relações laborais.",
          content: "",
          category: "Consultoria",
          active: true,
          createdAt: "2025-01-10T10:00:00Z",
          updatedAt: "2025-01-10T10:00:00Z"
        },
        {
          id: "3",
          title: "Direitos Básicos do Trabalhador: O que Você Precisa Saber",
          subtitle: "Guia completo sobre direitos fundamentais garantidos pela legislação trabalhista brasileira.",
          content: "",
          category: "Direitos",
          active: true,
          createdAt: "2025-01-05T10:00:00Z",
          updatedAt: "2025-01-05T10:00:00Z"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      "bg-gradient-to-br from-primary/10 to-primary/5",
      "bg-gradient-to-br from-blue-100 to-blue-50",
      "bg-gradient-to-br from-green-100 to-green-50"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section 
      id="blog" 
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: '#01304A' }}
    >
      {/* Decoração de grafos - azul claro no fundo escuro */}
      <GraphDecoration position="both" color="light" size="large" opacity={0.08} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ 
              backgroundColor: 'rgba(102,155,187,0.15)',
              border: '1px solid rgba(102,155,187,0.3)'
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#669BBB' }} />
            <span className="text-sm font-medium" style={{ color: '#669BBB' }}>
              Conteúdo Exclusivo
            </span>
          </div>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4"
            style={{ color: '#FAF0D6' }}
          >
            Últimas <span style={{ color: '#C1121F' }}>Notícias</span>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#669BBB' }}
          >
            Insights, tendências e novidades do ecossistema de inovação
          </p>
        </div>

        {loading ? (
          <BlogSectionSkeleton />
        ) : (
          <>
            {/* Desktop Layout - 1 Grande + 2 Menores */}
            <div className="hidden md:block mb-12">
              {articles.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Artigo Principal - Grande */}
                  <div className="lg:col-span-2 flex flex-col h-full">
                    <Card 
                      className="border-0 overflow-hidden group smooth-transition hover:scale-[1.02] cursor-pointer flex-grow rounded-2xl"
                      style={{ 
                        backgroundColor: 'rgba(250,240,214,0.05)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                      }}
                      onClick={() => navigate(`/artigo/${articles[0].id}`)}
                    >
                      {/* Imagem do artigo principal */}
                      <div className="h-56 overflow-hidden relative">
                        {articles[0].image ? (
                          <img 
                            src={articles[0].image} 
                            alt={articles[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div 
                            className="h-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, rgba(120,0,0,0.3) 0%, rgba(193,18,31,0.2) 100%)' }}
                          >
                            <Calendar className="w-16 h-16" style={{ color: '#FAF0D6', opacity: 0.5 }} />
                          </div>
                        )}
                        {/* Overlay gradiente */}
                        <div 
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(to top, rgba(1,48,74,0.8) 0%, transparent 50%)' }}
                        />
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between mb-3">
                          <span 
                            className="text-sm font-medium px-3 py-1 rounded-full"
                            style={{ 
                              backgroundColor: 'rgba(193,18,31,0.2)',
                              color: '#C1121F',
                              border: '1px solid rgba(193,18,31,0.3)'
                            }}
                          >
                            {articles[0].category}
                          </span>
                          <span className="text-sm" style={{ color: '#669BBB' }}>
                            {new Date(articles[0].createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <h3 
                          className="text-xl font-playfair font-bold leading-tight"
                          style={{ color: '#FAF0D6' }}
                        >
                          {articles[0].title}
                        </h3>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p 
                          className="leading-relaxed mb-4 text-base"
                          style={{ color: '#669BBB' }}
                        >
                          {articles[0].subtitle || articles[0].content.substring(0, 150) + '...'}
                        </p>
                        <div className="flex items-center justify-between">
                          <Button 
                            variant="ghost" 
                            className="p-0 font-medium group pointer-events-none text-base"
                            style={{ color: '#C1121F' }}
                          >
                            Ler artigo completo
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 smooth-transition" />
                          </Button>
                          {isAdmin && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/admin/artigos/editar/${articles[0].id}`);
                              }}
                              className="opacity-0 group-hover:opacity-100 smooth-transition border-[#669BBB] text-[#669BBB]"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Botão Chamativo para Ver Todos */}
                    <div 
                      className="mt-6 rounded-xl p-5 text-center flex-shrink-0"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(120,0,0,0.2) 0%, rgba(193,18,31,0.15) 100%)',
                        border: '1px solid rgba(193,18,31,0.3)'
                      }}
                    >
                      <h4 
                        className="text-lg font-playfair font-bold mb-2"
                        style={{ color: '#FAF0D6' }}
                      >
                        Explore Mais Conteúdo
                      </h4>
                      <p 
                        className="text-sm mb-4"
                        style={{ color: '#669BBB' }}
                      >
                        Acesse nossa biblioteca completa de artigos
                      </p>
                      <Button 
                        className="px-6 py-2.5 font-semibold shadow-lg hover:shadow-xl smooth-transition"
                        style={{ 
                          background: 'linear-gradient(135deg, #780000 0%, #C1121F 100%)',
                          color: '#FAF0D6'
                        }}
                        onClick={() => navigate('/artigos')}
                      >
                        Ver Todos os Artigos
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  {/* Artigos Secundários - Menores */}
                  <div className="space-y-6 h-full flex flex-col">
                    {articles.slice(1, 3).map((article, index) => (
                      <Card 
                        key={article.id} 
                        className="border-0 overflow-hidden group smooth-transition hover:scale-[1.02] cursor-pointer flex-1 rounded-xl"
                        style={{ 
                          backgroundColor: 'rgba(250,240,214,0.05)',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.25)'
                        }}
                        onClick={() => navigate(`/artigo/${article.id}`)}
                      >
                        {/* Imagem do artigo secundário */}
                        <div className="h-36 overflow-hidden relative">
                          {article.image ? (
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div 
                              className="h-full flex items-center justify-center"
                              style={{ background: `linear-gradient(135deg, rgba(${index === 0 ? '102,155,187' : '120,0,0'},0.3) 0%, rgba(${index === 0 ? '1,48,74' : '193,18,31'},0.2) 100%)` }}
                            >
                              <Calendar className="w-10 h-10" style={{ color: '#FAF0D6', opacity: 0.5 }} />
                            </div>
                          )}
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span 
                              className="text-xs font-medium px-2 py-1 rounded-full"
                              style={{ 
                                backgroundColor: 'rgba(102,155,187,0.2)',
                                color: '#669BBB'
                              }}
                            >
                              {article.category}
                            </span>
                            <span className="text-xs" style={{ color: '#669BBB', opacity: 0.7 }}>
                              {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <h3 
                            className="text-sm font-playfair font-semibold leading-tight"
                            style={{ color: '#FAF0D6' }}
                          >
                            {article.title}
                          </h3>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <p 
                            className="leading-relaxed mb-3 text-sm"
                            style={{ color: '#669BBB', opacity: 0.8 }}
                          >
                            {article.subtitle ? article.subtitle.substring(0, 80) + '...' : article.content.substring(0, 80) + '...'}
                          </p>
                          <div className="flex items-center justify-between">
                            <Button 
                              variant="ghost" 
                              className="p-0 font-medium group pointer-events-none text-sm"
                              style={{ color: '#C1121F' }}
                            >
                              Ler mais
                              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 smooth-transition" />
                            </Button>
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
                                <Edit className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  </div>
                </div>
              )}
            </div>


            {/* Mobile Carousel - Shows 1 card at a time with auto-scroll */}
            <div className="relative mb-8 md:hidden">
              {/* Scrollable Container - Shows 1 card */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide scroll-smooth px-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {articles.map((article, index) => (
                  <Card 
                    key={article.id} 
                    className="border-0 overflow-hidden group smooth-transition cursor-pointer flex-shrink-0 w-[calc(100vw-4rem)] mr-4 last:mr-0 rounded-xl"
                    style={{ 
                      backgroundColor: 'rgba(250,240,214,0.05)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.25)'
                    }}
                    onClick={() => navigate(`/artigo/${article.id}`)}
                  >
                    {/* Imagem do artigo */}
                    <div className="h-36 overflow-hidden relative">
                      {article.image ? (
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                        />
                      ) : (
                        <div 
                          className="h-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, rgba(120,0,0,0.3) 0%, rgba(193,18,31,0.2) 100%)' }}
                        >
                          <Calendar className="w-10 h-10" style={{ color: '#FAF0D6', opacity: 0.5 }} />
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: 'rgba(193,18,31,0.2)',
                            color: '#C1121F'
                          }}
                        >
                          {article.category}
                        </span>
                      </div>
                      <h3 
                        className="text-sm font-playfair font-semibold leading-tight"
                        style={{ color: '#FAF0D6' }}
                      >
                        {article.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="pt-0 p-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="p-0 font-medium group pointer-events-none text-xs"
                        style={{ color: '#C1121F' }}
                      >
                        Ler artigo
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 smooth-transition" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Dots Indicator */}
              {articles.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {articles.map((_, index) => (
                    <button
                      key={index}
                      className="w-3 h-3 rounded-full transition-colors"
                      style={{ 
                        backgroundColor: index === currentIndex ? '#C1121F' : 'rgba(193,18,31,0.3)'
                      }}
                      onClick={() => {
                        setCurrentIndex(index);
                        if (autoScrollRef.current) {
                          clearInterval(autoScrollRef.current);
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Botão Ver Todos os Artigos - Mobile */}
            <div className="text-center md:hidden mt-6">
              <Button 
                className="px-6 py-3 font-semibold shadow-lg hover:shadow-xl smooth-transition"
                style={{ 
                  background: 'linear-gradient(135deg, #780000 0%, #C1121F 100%)',
                  color: '#FAF0D6'
                }}
                onClick={() => navigate('/artigos')}
              >
                Ver Todos os Artigos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}

        {/* Botão Admin para Mobile */}
        {isAdmin && (
          <div className="text-center md:hidden mt-4">
            <Button 
              size="lg"
              className="px-8 py-4 text-lg"
              style={{ 
                backgroundColor: 'rgba(250,240,214,0.1)',
                color: '#FAF0D6',
                border: '1px solid rgba(250,240,214,0.3)'
              }}
              onClick={() => navigate('/admin/artigos/novo')}
            >
              Criar novo artigo
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
