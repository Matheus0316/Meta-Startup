import { useState, useEffect, useRef } from "react";
import { startups } from "../data/startups";
import StartupCard from "../components/StartupCard";

// Componente de elementos gráficos geométricos - GRANDE e mais visível - APENAS DESKTOP
const GeometricElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
    {/* Rede de conexões GRANDE - cobre toda a lateral esquerda */}
    <svg 
      className="absolute -bottom-40 -left-40 w-[1000px] h-[1000px]"
      viewBox="0 0 400 400"
      style={{ opacity: 0.15 }}
    >
      {/* Linhas de conexão */}
      <g stroke="#01304A" strokeWidth="1.5" fill="none">
        <line x1="50" y1="350" x2="120" y2="280" />
        <line x1="120" y1="280" x2="80" y2="200" />
        <line x1="80" y1="200" x2="150" y2="150" />
        <line x1="150" y1="150" x2="220" y2="180" />
        <line x1="220" y1="180" x2="280" y2="120" />
        <line x1="280" y1="120" x2="350" y2="150" />
        <line x1="120" y1="280" x2="200" y2="300" />
        <line x1="200" y1="300" x2="250" y2="250" />
        <line x1="250" y1="250" x2="220" y2="180" />
        <line x1="50" y1="350" x2="100" y2="380" />
        <line x1="100" y1="380" x2="180" y2="350" />
        <line x1="180" y1="350" x2="200" y2="300" />
        <line x1="80" y1="200" x2="30" y2="150" />
        <line x1="30" y1="150" x2="80" y2="100" />
        <line x1="80" y1="100" x2="150" y2="150" />
        {/* Mais linhas para expandir a rede */}
        <line x1="350" y1="150" x2="380" y2="80" />
        <line x1="350" y1="150" x2="400" y2="200" />
        <line x1="280" y1="120" x2="320" y2="50" />
        <line x1="150" y1="150" x2="100" y2="50" />
        <line x1="100" y1="50" x2="180" y2="30" />
        <line x1="180" y1="30" x2="280" y2="50" />
        <line x1="280" y1="50" x2="320" y2="50" />
      </g>
      
      {/* Nós/Pontos com animação sutil */}
      <g fill="#01304A">
        <circle cx="50" cy="350" r="7">
          <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="120" cy="280" r="5" />
        <circle cx="80" cy="200" r="8">
          <animate attributeName="r" values="8;11;8" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="150" r="5" />
        <circle cx="220" cy="180" r="6" />
        <circle cx="280" cy="120" r="5" />
        <circle cx="350" cy="150" r="6" />
        <circle cx="200" cy="300" r="5" />
        <circle cx="250" cy="250" r="7">
          <animate attributeName="r" values="7;10;7" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="380" r="5" />
        <circle cx="180" cy="350" r="6" />
        <circle cx="30" cy="150" r="5" />
        <circle cx="80" cy="100" r="6" />
        <circle cx="380" cy="80" r="5" />
        <circle cx="400" cy="200" r="4" />
        <circle cx="320" cy="50" r="5" />
        <circle cx="100" cy="50" r="6" />
        <circle cx="180" cy="30" r="5" />
        <circle cx="280" cy="50" r="6" />
      </g>
    </svg>

    {/* Forma orgânica fluida GRANDE - canto superior direito */}
    <svg 
      className="absolute -top-60 -right-60 w-[900px] h-[900px]"
      viewBox="0 0 200 200"
      style={{ opacity: 0.1 }}
    >
      <path
        d="M100,20 
           C140,20 180,60 180,100 
           C180,140 150,170 120,180 
           C90,190 60,170 40,140 
           C20,110 30,60 60,40 
           C80,25 90,20 100,20"
        fill="#780000"
      />
    </svg>

    {/* Rede de conexões GRANDE - canto superior direito */}
    <svg 
      className="absolute -top-20 -right-20 w-[800px] h-[600px]"
      viewBox="0 0 400 300"
      style={{ opacity: 0.12 }}
    >
      <g stroke="#669BBB" strokeWidth="1.5" fill="none">
        <line x1="100" y1="50" x2="200" y2="80" />
        <line x1="200" y1="80" x2="280" y2="40" />
        <line x1="280" y1="40" x2="350" y2="90" />
        <line x1="350" y1="90" x2="400" y2="60" />
        <line x1="200" y1="80" x2="180" y2="150" />
        <line x1="180" y1="150" x2="250" y2="180" />
        <line x1="250" y1="180" x2="320" y2="150" />
        <line x1="320" y1="150" x2="350" y2="90" />
        <line x1="250" y1="180" x2="280" y2="250" />
        <line x1="320" y1="150" x2="380" y2="200" />
        <line x1="380" y1="200" x2="400" y2="280" />
        <line x1="100" y1="50" x2="50" y2="100" />
        <line x1="50" y1="100" x2="80" y2="180" />
        <line x1="80" y1="180" x2="180" y2="150" />
      </g>
      <g fill="#669BBB">
        <circle cx="100" cy="50" r="6" />
        <circle cx="200" cy="80" r="7">
          <animate attributeName="r" values="7;9;7" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="40" r="5" />
        <circle cx="350" cy="90" r="6" />
        <circle cx="400" cy="60" r="5" />
        <circle cx="180" cy="150" r="6" />
        <circle cx="250" cy="180" r="7">
          <animate attributeName="r" values="7;9;7" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="150" r="5" />
        <circle cx="280" cy="250" r="6" />
        <circle cx="380" cy="200" r="5" />
        <circle cx="400" cy="280" r="6" />
        <circle cx="50" cy="100" r="5" />
        <circle cx="80" cy="180" r="6" />
      </g>
    </svg>

    {/* Forma orgânica secundária MAIOR */}
    <svg 
      className="absolute bottom-20 right-0 w-[400px] h-[400px]"
      viewBox="0 0 150 150"
      style={{ opacity: 0.08 }}
    >
      <path
        d="M75,10 
           C110,10 140,40 140,75 
           C140,110 110,140 75,140 
           C40,140 20,120 15,90 
           C10,60 40,10 75,10"
        fill="#01304A"
      />
    </svg>

    {/* Grafo adicional no centro-esquerda */}
    <svg 
      className="absolute top-1/3 -left-10 w-[500px] h-[400px]"
      viewBox="0 0 300 250"
      style={{ opacity: 0.1 }}
    >
      <g stroke="#780000" strokeWidth="1" fill="none">
        <line x1="20" y1="100" x2="80" y2="60" />
        <line x1="80" y1="60" x2="150" y2="100" />
        <line x1="150" y1="100" x2="200" y2="50" />
        <line x1="200" y1="50" x2="280" y2="80" />
        <line x1="80" y1="60" x2="60" y2="150" />
        <line x1="150" y1="100" x2="120" y2="200" />
        <line x1="200" y1="50" x2="250" y2="150" />
      </g>
      <g fill="#780000">
        <circle cx="20" cy="100" r="5" />
        <circle cx="80" cy="60" r="6">
          <animate attributeName="r" values="6;8;6" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="100" r="5" />
        <circle cx="200" cy="50" r="6" />
        <circle cx="280" cy="80" r="5" />
        <circle cx="60" cy="150" r="5" />
        <circle cx="120" cy="200" r="6">
          <animate attributeName="r" values="6;8;6" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="150" r="5" />
      </g>
    </svg>
  </div>
);

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const targetSpeedRef = useRef(0.8);
  const currentSpeedRef = useRef(0.8);

  // Entrada animada
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll infinito - VELOCIDADE CONSTANTE, SEM DESACELERAÇÃO
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const constantSpeed = 0.8; // Velocidade fixa, sempre a mesma
    let animationId: number;

    const scroll = () => {
      // Velocidade sempre constante, sem interpolação
      scrollPositionRef.current += constantSpeed;
      const maxScroll = scrollContainer.scrollWidth / 2;
      
      if (scrollPositionRef.current >= maxScroll) {
        scrollPositionRef.current = 0;
      }
      
      scrollContainer.scrollLeft = scrollPositionRef.current;
      animationId = requestAnimationFrame(scroll);
    };

    // NÃO adicionar event listeners de mouse - sem desaceleração
    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const incubadas = startups.filter(s => s.category === 'incubada').length;
  const preIncubadas = startups.filter(s => s.category === 'pre-incubada').length;
  const duplicatedStartups = [...startups, ...startups];

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #FAF0D6 0%, #F5E8C8 40%, #EFE2BC 70%, #FAF0D6 100%)'
      }}
    >
      {/* Elementos gráficos geométricos */}
      <GeometricElements />

      {/* Header Content */}
      <div 
        className={`
          relative z-20 pt-28 md:pt-36 pb-12 px-4
          transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
        `}
      >
        <div className="container mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <p 
              className="uppercase tracking-[0.3em] text-sm mb-4 font-medium"
              style={{ color: '#669BBB' }}
            >
              Ecossistema de Inovação
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-playfair mb-6">
              <span style={{ color: '#01304A' }}>Nossas </span>
              <span style={{ color: '#780000' }}>Startups</span>
            </h1>
            <p 
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#01304A', opacity: 0.7 }}
            >
              Conheça as empresas inovadoras que estão transformando o futuro através do nosso programa de incubação
            </p>
          </div>
        </div>
      </div>

      {/* Carousel - Auto-scrolling */}
      <div 
        className={`
          relative z-10 pb-16
          transition-all duration-1000 delay-300 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        {/* Gradient Fade Left */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none"
          style={{ 
            background: 'linear-gradient(to right, #F5E8C8 0%, rgba(245,232,200,0.8) 50%, transparent 100%)' 
          }}
        />
        
        {/* Gradient Fade Right */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none"
          style={{ 
            background: 'linear-gradient(to left, #F5E8C8 0%, rgba(245,232,200,0.8) 50%, transparent 100%)' 
          }}
        />

        {/* Scrolling Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden px-4 scrollbar-hide"
        >
          {duplicatedStartups.map((startup, index) => (
            <StartupCard
              key={`${startup.id}-${index}`}
              startup={startup}
              index={index % startups.length}
            />
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: '#01304A' }}
      />
    </section>
  );
};

export default HeroSection;
