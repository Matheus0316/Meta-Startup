import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, User, Linkedin, Instagram } from "lucide-react";
import { teamApi } from "../api";
import { TeamMember } from "../types";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import GraphDecoration from "@/components/GraphDecoration";

// Ícone do GitHub (Lucide não tem, então criamos um SVG inline)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  // Triplicar membros para criar loop infinito com scroll suave
  const getTriplicatedMembers = () => {
    if (teamMembers.length === 0) return [];
    return [...teamMembers, ...teamMembers, ...teamMembers];
  };

  // Centraliza no meio (segunda cópia) ao carregar
  useEffect(() => {
    if (teamMembers.length > 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 306; // 280/300px + gap
      const middlePosition = cardWidth * teamMembers.length;
      container.scrollLeft = middlePosition;
    }
  }, [teamMembers]);

  // Função para navegar com scroll suave - lista circular
  const navigate = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container || isScrollingRef.current) return;

    isScrollingRef.current = true;
    const cardWidth = 306;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    // Libera após animação
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 350);
  };

  // Detecta fim do scroll e faz "teleporte" invisível para manter loop infinito
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || teamMembers.length === 0 || isScrollingRef.current) return;

    const cardWidth = 306;
    const singleSetWidth = cardWidth * teamMembers.length;
    
    // Se scrollou muito para a direita (passou da terceira cópia)
    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft = container.scrollLeft - singleSetWidth;
    }
    // Se scrollou muito para a esquerda (antes da primeira cópia)
    else if (container.scrollLeft < singleSetWidth * 0.5) {
      container.scrollLeft = container.scrollLeft + singleSetWidth;
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scrollend', handleScroll);
      return () => container.removeEventListener('scrollend', handleScroll);
    }
  }, [teamMembers]);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamApi.getActive();
      setTeamMembers(response.team);
    } catch (error) {
      console.error("Error loading team members:", error);
      // Fallback para membros estáticos
      setTeamMembers([
        {
          id: "1",
          name: "João Silva",
          position: "CEO & Fundador",
          description: "Empreendedor serial com mais de 10 anos de experiência em startups de tecnologia.",
          image: "",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "2",
          name: "Maria Santos",
          position: "Diretora de Operações",
          description: "Especialista em gestão de projetos e desenvolvimento de negócios.",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "3",
          name: "Pedro Costa",
          position: "Mentor de Tecnologia",
          description: "Engenheiro de software sênior com experiência em grandes empresas de tech.",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "4",
          name: "Ana Oliveira",
          position: "Mentora de Negócios",
          description: "MBA em Empreendedorismo, ajudou mais de 50 startups a conseguir investimento.",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Membros triplicados para loop infinito
  const triplicatedMembers = getTriplicatedMembers();

  if (loading) {
    return (
      <section 
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: '#FAF0D6' }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg" style={{ color: '#01304A' }}>
              Carregando equipe...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section 
      id="equipe"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: '#FAF0D6' }}
    >
      <GraphDecoration position="both" color="blue" size="medium" opacity={0.08} />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimationWrapper animation="fade-in-up">
          <div className="text-center mb-12 md:mb-16">
            <p 
              className="uppercase tracking-[0.3em] text-sm mb-4 font-medium"
              style={{ color: '#669BBB' }}
            >
              Conheça Quem Faz Acontecer
            </p>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4"
              style={{ color: '#01304A' }}
            >
              Nossa <span style={{ color: '#780000' }}>Equipe</span>
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#01304A', opacity: 0.7 }}
            >
              Profissionais dedicados a transformar ideias em negócios de sucesso
            </p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="scale-in" delay={200}>
          <div className="relative">
            {/* Botão Seta Esquerda */}
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-2 md:left-2 top-1/2 -translate-y-1/2 z-20 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: '#FAF0D6', borderColor: '#01304A', color: '#01304A' }}
              onClick={() => navigate('left')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            {/* Botão Seta Direita */}
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-2 md:right-2 top-1/2 -translate-y-1/2 z-20 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: '#FAF0D6', borderColor: '#01304A', color: '#01304A' }}
              onClick={() => navigate('right')}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Gradient Fade Left */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-8 md:w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #FAF0D6 0%, transparent 100%)' }}
            />
            {/* Gradient Fade Right */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-8 md:w-16 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, #FAF0D6 0%, transparent 100%)' }}
            />

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto px-12 md:px-16 py-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {triplicatedMembers.map((member, index) => (
                <Card 
                  key={`${member.id}-${index}`} 
                  className="flex-shrink-0 w-[280px] md:w-[300px] border-0 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    boxShadow: '0 10px 40px rgba(1,48,74,0.1)'
                  }}
                >
                  {/* Detalhe decorativo no topo do card */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: 'linear-gradient(90deg, #01304A 0%, #780000 50%, #669BBB 100%)' }}
                  />
                  
                  <CardContent className="p-6 pt-8 flex flex-col h-full">
                    <div className="flex justify-center mb-5">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-28 h-28 rounded-full object-cover shadow-lg"
                          style={{ border: '4px solid #01304A' }}
                        />
                      ) : (
                        <div 
                          className="w-28 h-28 rounded-full flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: 'rgba(1,48,74,0.1)', border: '4px solid #01304A' }}
                        >
                          <User className="w-14 h-14" style={{ color: '#01304A' }} />
                        </div>
                      )}
                    </div>

                    <div className="text-center flex-1 flex flex-col">
                      <h3 
                        className="text-xl font-playfair font-bold mb-1"
                        style={{ color: '#01304A' }}
                      >
                        {member.name}
                      </h3>
                      <p 
                        className="text-sm font-medium mb-3"
                        style={{ color: '#780000' }}
                      >
                        {member.position}
                      </p>
                      <p 
                        className="text-sm leading-relaxed flex-1"
                        style={{ color: '#01304A', opacity: 0.7 }}
                      >
                        {member.description}
                      </p>

                      {/* Ícones sempre alinhados no final do card */}
                      <div className="flex justify-center gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(1,48,74,0.1)' }}>
                        <button 
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          style={{ backgroundColor: 'rgba(1,48,74,0.1)', color: '#01304A' }}
                        >
                          <Linkedin className="w-4 h-4" />
                        </button>
                        <button 
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          style={{ backgroundColor: 'rgba(1,48,74,0.1)', color: '#01304A' }}
                        >
                          <Instagram className="w-4 h-4" />
                        </button>
                        <button 
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          style={{ backgroundColor: 'rgba(1,48,74,0.1)', color: '#01304A' }}
                        >
                          <GithubIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default TeamSection;
