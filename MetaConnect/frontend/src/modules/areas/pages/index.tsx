import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const AreasAtuacaoSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const areas = [
    {
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758768817/maia-advocacia/vsmqecoo7p6qxrx9gft4.jpg",
      title: "DIREITO DO TRABALHO PARA TRABALHADORES",
      description: "Atuamos na defesa dos direitos de empregados da iniciativa privada e de empregados públicos de Sociedades de Economia Mista e Empresas Pública em processos judiciais e administrativos. Assessoria na Rescisão Contratual."
    },
    {
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758768854/maia-advocacia/ticpqsynw8gziwxawzh7.jpg",
      title: "PROTEÇÃO DE DADOS",
      description: "Consultoria jurídica de adequação à Lei Geral de Proteção de Dados Pessoais (LGPD)."
    },
    {
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758768885/maia-advocacia/lrnnkac6urjwotksjgtg.jpg",
      title: "SERVIDORES PÚBLICOS",
      description: "Atuamos com uma equipe preparada e experiente em todas as questões jurídicas que envolvem o Servidor Público estatutário ou Celetista."
    },
    {
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758768957/maia-advocacia/bdvxzexcohfz3mri23bu.jpg",
      title: "DIREITO SUCESSÓRIO",
      description: "Inventários e arrolamentos judiciais e extrajudiciais e planejamentos sucessórios, em que se utilizam os instrumentos previstos no Direito, com a análise da melhor solução jurídica para você."
    },
    {
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758768930/maia-advocacia/q94cuzrzzwjaliv6g5j5.jpg",
      title: "DIREITO PREVIDENCIÁRIO",
      description: "Atuamos em sua defesa perante o INSS e a Justiça para garantir o correto recebimento do seu benefício."
    },
    {
      image: "https://res.cloudinary.com/dkcrbcfcy/image/upload/v1758768988/maia-advocacia/ryz2vedvafoeovip2oxs.jpg",
      title: "DIREITO MÉDICO",
      description: "Nosso escritório é especializado em garantir o exercício seguro da medicina."
    }
  ];

  // Auto-scroll automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % areas.length);
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, [areas.length]);

  // Scroll para o card atual
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex(prev => prev === 0 ? areas.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % areas.length);
  };

  return (
    <section id="areas-atuacao" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-playfair font-bold text-primary mb-4 md:mb-6">
            Áreas de Atuação
          </h2>
          {/* Subtítulo apenas no desktop */}
          <p className="hidden md:block text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nossa expertise abrange diversas áreas do direito, oferecendo soluções 
            jurídicas especializadas e personalizadas para cada necessidade.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {areas.map((area, index) => (
            <Card key={index} className="card-shadow border-2 border-primary/20 smooth-transition hover:scale-105 h-full">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-lg font-playfair font-semibold text-primary mb-4 leading-tight">
                    {area.title}
                  </h3>
                  <p className="text-foreground leading-relaxed text-sm flex-grow font-medium">
                    {area.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel - 1 por 1 com auto-scroll */}
        <div className="md:hidden relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-background/30 border-primary/10 hover:bg-primary/20 w-8 h-8 p-0"
            onClick={handlePrevious}
          >
            <ChevronLeft className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-background/30 border-primary/10 hover:bg-primary/20 w-8 h-8 p-0"
            onClick={handleNext}
          >
            <ChevronRight className="w-3 h-3" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {areas.map((area, index) => (
              <Card key={index} className="card-shadow border-2 border-primary/20 flex-shrink-0 w-full mx-2">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-playfair font-bold text-primary mb-3 leading-tight">
                      {area.title}
                    </h3>
                    <p className="text-foreground leading-relaxed text-sm font-medium">
                      {area.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {areas.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center mt-8 md:mt-12 px-4">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg font-medium w-full md:w-auto"
            onClick={() => window.open('https://wa.me/558391090902?text=Olá', '_blank')}
          >
            Descubra como podemos ajudar você
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AreasAtuacaoSection;
