import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock, Send, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { leadsApi } from "@/modules/leads/api";
import { useModal } from "@/hooks/useModal";

const CTASection = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showError, showSuccess, showWarning } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showWarning('Por favor, preencha os campos obrigatórios.');
      return;
    }

    try {
      setIsSubmitting(true);
      await leadsApi.create({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim()
      });
      
      showSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      showError('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Telefone",
      value: "(11) 99999-9999"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "E-mail",
      value: "contato@exemplo.com.br"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Horário",
      value: "Seg-Sex: 9h às 18h"
    }
  ];

  return (
    <section id="contato" className="py-6 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <div className="md:hidden mb-6">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-3 rounded-lg border border-primary/20 shadow-sm">
              <h2 className="text-xl font-playfair font-bold text-primary">
                Entre em Contato
              </h2>
            </div>
          </div>
          <h2 className="hidden md:block text-4xl lg:text-5xl font-playfair font-bold text-primary mb-6">
            Entre em Contato
          </h2>
          {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Envie sua mensagem e receba orientação profissional sobre seu caso específico. 
            Nossa abordagem ética e técnica garante o melhor direcionamento para sua situação.
          </p> */}
          
          {/* Admin Button */}
          {isAuthenticated && (
            <div className="mt-8">
              <Button 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => navigate('/admin/leads')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Gerenciar Respostas
              </Button>
            </div>
          )}
        </div>

        {/* Contact Form and Information - Side by side */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <Card className="card-shadow border-2 border-primary/20 h-fit bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair text-primary">
                Informações de Contato
              </CardTitle>
              <p className="text-muted-foreground">
                Entre em contato conosco através dos canais abaixo.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30">
                  <div className="text-primary">
                    {info.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-primary">{info.label}</p>
                    <p className="text-muted-foreground">{info.value}</p>
                    {info.subtitle && (
                      <p className="text-muted-foreground text-sm">{info.subtitle}</p>
                    )}
                  </div>
                </div>
              ))}

            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="card-shadow border-2 border-primary/20 h-fit bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair text-primary">
                Envie sua Mensagem
              </CardTitle>
              <p className="text-muted-foreground">
                Preencha o formulário e entraremos em contato.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefone/WhatsApp</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(83) 9 9999-9999"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* WhatsApp Section - Full width below cards
        <div className="mb-16">
          <Card className="card-shadow border-2 border-primary/20 bg-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-playfair font-semibold text-primary mb-3">
                Atendimento WhatsApp
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Para maior agilidade, entre em contato através do WhatsApp Business
              </p>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                onClick={() => window.open('https://wa.me/558391090902?text=Olá, gostaria de agendar uma consulta sobre direitos trabalhistas.', '_blank')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Agende sua consulta
              </Button>
            </CardContent>
          </Card>
        </div> */}

        
      </div>
    </section>
  );
};

export default CTASection;
