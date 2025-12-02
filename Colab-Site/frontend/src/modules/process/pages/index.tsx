import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Search, Target, MessageCircle } from "lucide-react";

const ProcessSection = () => {
  const processSteps = [
    {
      icon: <ClipboardList className="w-12 h-12 text-primary" />,
      step: "01",
      title: "Consulta Inicial",
      description: "Entendimento completo do caso através de análise técnica detalhada, sem compromisso inicial."
    },
    {
      icon: <Search className="w-12 h-12 text-primary" />,
      step: "02", 
      title: "Análise Técnica",
      description: "Estudo minucioso da documentação e legislação aplicável ao caso específico."
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      step: "03",
      title: "Estratégia Personalizada",
      description: "Definição da melhor abordagem jurídica baseada na análise técnica realizada."
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-primary" />,
      step: "04",
      title: "Acompanhamento Contínuo",
      description: "Transparência total em todas as etapas do processo com comunicação regular."
    }
  ];

  return (
    <section className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-primary mb-6">
            Nosso Processo de Atendimento
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nossa metodologia de trabalho prioriza a ética profissional e a transparência 
            em todas as etapas, garantindo o melhor acompanhamento técnico para cada situação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="card-shadow border-0 text-center relative">
              <CardContent className="p-8">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>

                <div className="mt-4 mb-6 flex justify-center">
                  {step.icon}
                </div>

                <h3 className="text-xl font-playfair font-semibold text-primary mb-4">
                  {step.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-primary/10 px-6 py-4 rounded-lg">
            <p className="text-primary font-semibold">
              ✓ Comprometidos com a ética profissional e total conformidade com o Código de Ética da OAB
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
