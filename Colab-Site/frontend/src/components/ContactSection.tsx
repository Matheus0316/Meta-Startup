import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Rocket, Send, Lightbulb, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    email: '',
    phone: '',
    sector: '',
    description: '',
    stage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Projeto enviado com sucesso! Entraremos em contato em breve.');
    setFormData({
      startupName: '',
      founderName: '',
      email: '',
      phone: '',
      sector: '',
      description: '',
      stage: ''
    });
    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Mentoria Especializada",
      description: "Acompanhamento com especialistas do mercado"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Networking",
      description: "Conexão com investidores e parceiros estratégicos"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Aceleração",
      description: "Programas estruturados para escalar seu negócio"
    }
  ];

  return (
    <section 
      id="contato" 
      className="py-20"
      style={{ backgroundColor: '#FAF0D6' }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(1,48,74,0.1)' }}
          >
            <Rocket className="w-4 h-4" style={{ color: '#01304A' }} />
            <span className="text-sm font-medium" style={{ color: '#01304A' }}>
              Faça parte do nosso ecossistema
            </span>
          </div>
          
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4"
            style={{ color: '#01304A' }}
          >
            Submeta seu <span style={{ color: '#780000' }}>Projeto</span>
          </h2>
          
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#01304A', opacity: 0.7 }}
          >
            Tem uma ideia inovadora? Inscreva sua startup para nosso programa de incubação e pré-incubação
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Benefits */}
          <div className="space-y-8">
            <div>
              <h3 
                className="text-2xl font-playfair font-bold mb-6"
                style={{ color: '#01304A' }}
              >
                Por que se juntar ao Núcleo Colab?
              </h3>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <Card 
                    key={index} 
                    className="border-0 shadow-md hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: 'white' }}
                  >
                    <CardContent className="p-4 flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#01304A' }}
                      >
                        <div style={{ color: '#FAF0D6' }}>{benefit.icon}</div>
                      </div>
                      <div>
                        <h4 
                          className="font-bold mb-1"
                          style={{ color: '#01304A' }}
                        >
                          {benefit.title}
                        </h4>
                        <p 
                          className="text-sm"
                          style={{ color: '#669BBB' }}
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div 
              className="p-6 rounded-2xl"
              style={{ backgroundColor: '#01304A' }}
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div 
                    className="text-3xl font-bold font-playfair"
                    style={{ color: '#FAF0D6' }}
                  >
                    50+
                  </div>
                  <div 
                    className="text-xs uppercase tracking-wider"
                    style={{ color: '#669BBB' }}
                  >
                    Startups
                  </div>
                </div>
                <div>
                  <div 
                    className="text-3xl font-bold font-playfair"
                    style={{ color: '#FAF0D6' }}
                  >
                    R$2M
                  </div>
                  <div 
                    className="text-xs uppercase tracking-wider"
                    style={{ color: '#669BBB' }}
                  >
                    Investidos
                  </div>
                </div>
                <div>
                  <div 
                    className="text-3xl font-bold font-playfair"
                    style={{ color: '#FAF0D6' }}
                  >
                    85%
                  </div>
                  <div 
                    className="text-xs uppercase tracking-wider"
                    style={{ color: '#669BBB' }}
                  >
                    Taxa de Sucesso
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card 
            className="border-0 shadow-xl"
            style={{ backgroundColor: 'white' }}
          >
            <CardContent className="p-6 md:p-8">
              <h3 
                className="text-xl font-playfair font-bold mb-6"
                style={{ color: '#01304A' }}
              >
                Formulário de Submissão
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="startupName"
                      style={{ color: '#01304A' }}
                    >
                      Nome da Startup *
                    </Label>
                    <Input
                      id="startupName"
                      placeholder="Ex: TechSolutions"
                      value={formData.startupName}
                      onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                      required
                      className="border-gray-200 focus:border-[#01304A]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label 
                      htmlFor="founderName"
                      style={{ color: '#01304A' }}
                    >
                      Nome do Fundador *
                    </Label>
                    <Input
                      id="founderName"
                      placeholder="Seu nome completo"
                      value={formData.founderName}
                      onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                      required
                      className="border-gray-200 focus:border-[#01304A]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="email"
                      style={{ color: '#01304A' }}
                    >
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-gray-200 focus:border-[#01304A]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label 
                      htmlFor="phone"
                      style={{ color: '#01304A' }}
                    >
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-gray-200 focus:border-[#01304A]"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="sector"
                      style={{ color: '#01304A' }}
                    >
                      Setor de Atuação *
                    </Label>
                    <Input
                      id="sector"
                      placeholder="Ex: Tecnologia, Saúde, Educação"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      required
                      className="border-gray-200 focus:border-[#01304A]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label 
                      htmlFor="stage"
                      style={{ color: '#01304A' }}
                    >
                      Estágio Atual *
                    </Label>
                    <select
                      id="stage"
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                      required
                      className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-[#01304A] focus:outline-none focus:ring-1 focus:ring-[#01304A] text-sm"
                    >
                      <option value="">Selecione...</option>
                      <option value="ideacao">Ideação</option>
                      <option value="validacao">Validação</option>
                      <option value="mvp">MVP</option>
                      <option value="tracao">Tração</option>
                      <option value="escala">Escala</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="description"
                    style={{ color: '#01304A' }}
                  >
                    Descreva seu Projeto *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Conte-nos sobre sua ideia, problema que resolve, diferencial e objetivos..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="border-gray-200 focus:border-[#01304A] resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white font-medium py-3"
                  style={{ backgroundColor: '#780000' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C1121F'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#780000'}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Submeter Projeto
                    </div>
                  )}
                </Button>

                <p 
                  className="text-xs text-center"
                  style={{ color: '#669BBB' }}
                >
                  Ao submeter, você concorda com nossa política de privacidade
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
