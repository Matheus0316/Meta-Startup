import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import { 
  HeroSection,
  WorkersSection,
  AreasAtuacaoSection,
  ProcessSection,
  AboutSection,
  BlogSection,
  TestimonialsSection,
  FAQSection
} from "@/modules";
import TeamSection from "@/modules/team/pages/TeamSection";
import Footer from "@/components/Footer";
import { Rocket, ArrowRight, TrendingUp, Users, Lightbulb, Target, Award, Zap } from "lucide-react";
import GraphDecoration from "@/components/GraphDecoration";

// Componente de background com grafos grandes
const CTAGraphBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grafo esquerda grande */}
    <svg 
      className="absolute -bottom-20 -left-20 w-[600px] h-[500px] opacity-20"
      viewBox="0 0 400 350"
    >
      <g stroke="#FAF0D6" strokeWidth="1.5" fill="none">
        <line x1="0" y1="300" x2="80" y2="240" />
        <line x1="80" y1="240" x2="60" y2="160" />
        <line x1="60" y1="160" x2="140" y2="120" />
        <line x1="140" y1="120" x2="200" y2="160" />
        <line x1="200" y1="160" x2="280" y2="100" />
        <line x1="280" y1="100" x2="360" y2="140" />
        <line x1="80" y1="240" x2="160" y2="270" />
        <line x1="160" y1="270" x2="220" y2="220" />
        <line x1="220" y1="220" x2="200" y2="160" />
        <line x1="0" y1="300" x2="60" y2="330" />
        <line x1="60" y1="330" x2="140" y2="300" />
        <line x1="140" y1="300" x2="160" y2="270" />
        <line x1="60" y1="160" x2="20" y2="100" />
        <line x1="20" y1="100" x2="80" y2="60" />
        <line x1="80" y1="60" x2="140" y2="120" />
        <line x1="280" y1="100" x2="320" y2="40" />
        <line x1="320" y1="40" x2="400" y2="80" />
      </g>
      <g fill="#FAF0D6">
        <circle cx="0" cy="300" r="6">
          <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="240" r="5" />
        <circle cx="60" cy="160" r="6">
          <animate attributeName="r" values="6;8;6" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="120" r="5" />
        <circle cx="200" cy="160" r="6" />
        <circle cx="280" cy="100" r="5" />
        <circle cx="360" cy="140" r="6" />
        <circle cx="160" cy="270" r="5" />
        <circle cx="220" cy="220" r="6">
          <animate attributeName="r" values="6;7;6" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="330" r="5" />
        <circle cx="140" cy="300" r="6" />
        <circle cx="20" cy="100" r="5" />
        <circle cx="80" cy="60" r="6" />
        <circle cx="320" cy="40" r="5" />
        <circle cx="400" cy="80" r="6" />
      </g>
    </svg>

    {/* Grafo direita grande */}
    <svg 
      className="absolute -top-10 -right-20 w-[550px] h-[450px] opacity-15"
      viewBox="0 0 350 300"
    >
      <g stroke="#FAF0D6" strokeWidth="1.5" fill="none">
        <line x1="350" y1="50" x2="280" y2="90" />
        <line x1="280" y1="90" x2="300" y2="160" />
        <line x1="300" y1="160" x2="230" y2="200" />
        <line x1="230" y1="200" x2="170" y2="160" />
        <line x1="170" y1="160" x2="100" y2="200" />
        <line x1="100" y1="200" x2="40" y2="150" />
        <line x1="280" y1="90" x2="200" y2="60" />
        <line x1="200" y1="60" x2="140" y2="100" />
        <line x1="140" y1="100" x2="170" y2="160" />
        <line x1="230" y1="200" x2="260" y2="270" />
        <line x1="260" y1="270" x2="180" y2="280" />
        <line x1="180" y1="280" x2="100" y2="200" />
      </g>
      <g fill="#FAF0D6">
        <circle cx="350" cy="50" r="5" />
        <circle cx="280" cy="90" r="6">
          <animate attributeName="r" values="6;8;6" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="160" r="5" />
        <circle cx="230" cy="200" r="6" />
        <circle cx="170" cy="160" r="5" />
        <circle cx="100" cy="200" r="6">
          <animate attributeName="r" values="6;7;6" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="150" r="5" />
        <circle cx="200" cy="60" r="6" />
        <circle cx="140" cy="100" r="5" />
        <circle cx="260" cy="270" r="6" />
        <circle cx="180" cy="280" r="5" />
      </g>
    </svg>

    {/* Forma orgânica canto inferior direito */}
    <svg 
      className="absolute -bottom-20 -right-20 w-[400px] h-[400px] opacity-10"
      viewBox="0 0 200 200"
    >
      <path
        d="M150,200 
           C180,180 200,140 200,100 
           C200,60 180,30 150,20 
           C120,10 100,40 90,80 
           C80,120 100,180 150,200"
        fill="#FAF0D6"
      />
    </svg>
  </div>
);

// Seção CTA para submissão de projetos
const SubmitCTA = () => (
  <section 
    className="relative py-20 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #780000 0%, #5a0000 50%, #780000 100%)' }}
  >
    <CTAGraphBackground />
    
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <div 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6"
          style={{ 
            background: 'rgba(250,240,214,0.15)',
            border: '1px solid rgba(250,240,214,0.3)'
          }}
        >
          <Rocket className="w-4 h-4" style={{ color: '#FAF0D6' }} />
          <span className="text-sm font-medium" style={{ color: '#FAF0D6' }}>
            Processo Seletivo Aberto
          </span>
        </div>
        
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-6"
          style={{ color: '#FAF0D6' }}
        >
          Tem uma ideia inovadora?
        </h2>
        
        <p 
          className="text-lg md:text-xl mb-10 leading-relaxed"
          style={{ color: '#FAF0D6', opacity: 0.9 }}
        >
          Submeta seu projeto e faça parte do ecossistema de inovação do CoLab. 
          Oferecemos mentoria, infraestrutura e conexões para acelerar sua startup.
        </p>
        
        <Link 
          to="/submeter-projeto"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{ 
            background: 'linear-gradient(135deg, #01304A 0%, #1a4a6a 100%)',
            color: '#FAF0D6',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }}
        >
          Submeter Projeto
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </section>
);

// Seção "Quem Somos" - Diferenciais do CoLab
const QuemSomosSection = () => {
  const differentials = [
    {
      icon: Lightbulb,
      title: 'Mentoria Personalizada',
      description: 'Acompanhamento individual com especialistas de mercado para cada fase do seu negócio.'
    },
    {
      icon: Target,
      title: 'Conexões Estratégicas',
      description: 'Acesso a uma rede de investidores, parceiros e clientes potenciais.'
    },
    {
      icon: Zap,
      title: 'Infraestrutura Completa',
      description: 'Espaço de coworking, laboratórios e recursos tecnológicos à sua disposição.'
    },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#FAF0D6' }}
    >
      <GraphDecoration position="both" color="blue" size="large" opacity={0.06} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p 
            className="uppercase tracking-[0.3em] text-sm mb-4 font-medium"
            style={{ color: '#669BBB' }}
          >
            Conheça o CoLab
          </p>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-6"
            style={{ color: '#01304A' }}
          >
            Quem <span style={{ color: '#780000' }}>Somos</span>
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#01304A', opacity: 0.7 }}
          >
            Transformamos ideias promissoras em negócios de sucesso através de um programa completo de incubação
          </p>
        </div>

        {/* Differentials */}
        <div className="grid md:grid-cols-3 gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 group"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 15px 50px rgba(1,48,74,0.1)'
                }}
              >
                {/* Accent line top */}
                <div 
                  className="absolute top-0 left-8 right-8 h-1 rounded-full transition-all duration-300 group-hover:left-4 group-hover:right-4"
                  style={{ backgroundColor: '#780000' }}
                />
                
                <div 
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: 'linear-gradient(135deg, #01304A 0%, #1a4a6a 100%)',
                    boxShadow: '0 8px 25px rgba(1,48,74,0.3)'
                  }}
                >
                  <Icon className="w-8 h-8" style={{ color: '#FAF0D6' }} />
                </div>
                
                <h3 
                  className="text-xl font-playfair font-bold mb-3"
                  style={{ color: '#01304A' }}
                >
                  {item.title}
                </h3>
                
                <p 
                  className="leading-relaxed"
                  style={{ color: '#01304A', opacity: 0.7 }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link 
            to="/submeter-projeto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: '#01304A',
              color: '#FAF0D6',
              boxShadow: '0 8px 25px rgba(1,48,74,0.3)'
            }}
          >
            Conheça nosso programa
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        {/* <WorkersSection /> */}
        {/* <AreasAtuacaoSection /> */}
        {/* <ProcessSection /> */}
        {/* <AboutSection /> */}
        <QuemSomosSection />
        <TeamSection />
        <BlogSection />
        {/* <TestimonialsSection /> */}
        {/* <FAQSection /> */}
        <SubmitCTA />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
