import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { 
  Briefcase, 
  DollarSign, 
  Clock, 
  Shield, 
  AlertTriangle, 
  UserX 
} from "lucide-react";
import { WorkersCardImageDesktopSkeleton, WorkersCardImageMobileSkeleton } from "@/components/ui/article-skeleton";

const WorkersSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Mostrar cards após componente montar
  useEffect(() => {
    setMounted(true);
    // Pequeno delay para permitir que o DOM seja renderizado
    const timer = setTimeout(() => {
      setVisibleCards([0, 1, 2, 3, 4, 5]);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const workersRights = [
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "Reconhecimento de vínculo empregatício",
      description: "Orientação especializada para formalização de relações trabalhistas irregulares",
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758768817/maia-advocacia/vsmqecoo7p6qxrx9gft4.jpg"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: "Recuperação de verbas rescisórias",
      description: "Assessoria para obtenção de direitos trabalhistas devidos na rescisão",
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758768957/maia-advocacia/bdvxzexcohfz3mri23bu.jpg"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Horas extras não remuneradas",
      description: "Análise técnica de jornadas e cálculo de horas extraordinárias",
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758768885/maia-advocacia/lrnnkac6urjwotksjgtg.jpg"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Adicional de periculosidade ou insalubridade",
      description: "Avaliação de condições de trabalho e direitos adicionais aplicáveis",
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758503208/maia-advocacia/mlwmmqtce1tejitghcob.jpg"
    },
    {
      icon: <UserX className="w-8 h-8 text-primary" />,
      title: "Assédio moral e discriminação",
      description: "Orientação jurídica para situações de constrangimento no ambiente laboral",
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758503163/maia-advocacia/v1y0p78uklckakskyfl0.webp"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-primary" />,
      title: "Acidentes de trabalho e doenças ocupacionais",
      description: "Assessoria especializada em infortúnios laborais e suas consequências",
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758768988/maia-advocacia/ryz2vedvafoeovip2oxs.jpg"
    }
  ];

  return (
    <section id="trabalhadores" className="py-6 md:py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <div className="md:hidden mb-6">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-3 rounded-lg border border-primary/20 shadow-sm">
              <h2 className="text-xl font-playfair font-bold text-primary">
                Seus Direitos Trabalhistas Protegidos
              </h2>
            </div>
          </div>
          <h2 className="hidden md:block text-2xl md:text-4xl lg:text-5xl font-playfair font-bold text-primary mb-4 md:mb-6">
            Seus Direitos Trabalhistas Protegidos
          </h2>
          {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A orientação jurídica especializada é fundamental para garantir o exercício pleno 
            de seus direitos trabalhistas. Nossa abordagem técnica e ética assegura o melhor 
            acompanhamento para sua situação.
          </p> */}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {workersRights.map((right, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`transform transition-all duration-700 ease-out ${
                visibleCards.includes(index)
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="card-shadow border-0 smooth-transition hover:scale-105 h-full bg-secondary overflow-hidden">
              <CardContent className="p-0 flex flex-col h-full">
                {right.image && (
                  <div className="relative h-48 overflow-hidden">
                    {!imageLoaded[index] && <WorkersCardImageDesktopSkeleton />}
                    <img
                      src={right.image}
                      alt={right.title}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
                    />
                    {imageLoaded[index] && (
                      <div className="absolute top-4 left-4">
                        <div className="w-8 h-8 text-primary bg-white rounded-full p-1.5 flex items-center justify-center shadow-md">
                          {right.icon}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  {!right.image && (
                    <div className="mb-6">
                      <div className="w-8 h-8 text-secondary-foreground">
                        {right.icon}
                      </div>
                    </div>
                  )}
                  <h3 className="text-xl font-playfair font-semibold text-secondary-foreground mb-4">
                    {right.title}
                  </h3>
                  <p className="text-secondary-foreground/80 leading-relaxed flex-grow">
                    {right.description}
                  </p>
                </div>
              </CardContent>
            </Card>
            </div>
          ))}
        </div>

        {/* Mobile Grid - 2x3 com animações */}
        <div className="grid grid-cols-2 gap-4 mb-12 md:hidden">
          {workersRights.map((right, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`transform transition-all duration-700 ease-out ${
                visibleCards.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="card-shadow border-0 smooth-transition hover:scale-105 h-full bg-secondary overflow-hidden">
                <CardContent className="p-0 flex flex-col h-full">
                  {right.image && (
                    <div className="relative h-24 overflow-hidden">
                      {!imageLoaded[index] && <WorkersCardImageMobileSkeleton />}
                      <img
                        src={right.image}
                        alt={right.title}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
                      />
                      {imageLoaded[index] && (
                        <div className="absolute top-2 left-2">
                          <div className="w-6 h-6 text-primary bg-white rounded-full p-1 flex items-center justify-center shadow-md">
                            {right.icon}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-3 flex flex-col flex-grow text-center">
                    {!right.image && (
                      <div className="mb-2 flex justify-center">
                        <div className="w-6 h-6 text-secondary-foreground">
                          {right.icon}
                        </div>
                      </div>
                    )}
                    <h3 className="text-xs font-playfair font-semibold text-secondary-foreground leading-tight">
                      {right.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkersSection;