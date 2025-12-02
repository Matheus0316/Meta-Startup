import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Rocket, CheckCircle2, ArrowLeft, Send } from "lucide-react";
import GraphDecoration from "@/components/GraphDecoration";



const SubmitProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    startupName: '',
    problem: '',
    solution: '',
    targetMarket: '',
    differential: '',
    stage: '',
    whyColab: '',
    links: ''
  });
  
  // Scroll to top quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio (aqui você pode integrar com o backend)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Scroll to top após submissão
    window.scrollTo(0, 0);
  };

  const stages = [
    { value: 'ideacao', label: 'Ideação - Apenas uma ideia' },
    { value: 'validacao', label: 'Validação - Pesquisando o mercado' },
    { value: 'mvp', label: 'MVP - Produto mínimo viável' },
    { value: 'tracao', label: 'Tração - Primeiros clientes' },
    { value: 'escala', label: 'Escala - Crescimento acelerado' }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: '#01304A' }}>
        <GraphDecoration position="both" color="light" size="large" opacity={0.12} />
        <Header />
        <main className="flex-1 flex items-center justify-center relative z-10">
          <div className="relative z-10 text-center px-4 py-20">
            <div 
              className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #780000 0%, #C1121F 100%)' }}
            >
              <CheckCircle2 className="w-12 h-12" style={{ color: '#FAF0D6' }} />
            </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4" style={{ color: '#FAF0D6' }}>
              Projeto Submetido com Sucesso!
            </h1>
            <p className="text-lg mb-8 max-w-md mx-auto" style={{ color: '#FAF0D6', opacity: 0.9 }}>
              Recebemos sua submissão e entraremos em contato em breve para os próximos passos do processo de seleção.
            </p>
            <Button
              onClick={() => navigate('/')}
              className="gap-2"
              style={{ 
                background: 'linear-gradient(135deg, #780000 0%, #C1121F 100%)',
                color: '#FAF0D6'
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Início
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: '#01304A' }}>
      <GraphDecoration position="both" color="light" size="large" opacity={0.12} />
      <Header />
      <main className="flex-1 relative z-10">
        
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 mb-6 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: '#FAF0D6' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao site
            </button>
            
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6"
              style={{ 
                background: 'rgba(250,240,214,0.15)',
                border: '1px solid rgba(250,240,214,0.3)'
              }}
            >
              <Rocket className="w-4 h-4" style={{ color: '#FAF0D6' }} />
              <span className="text-sm font-medium" style={{ color: '#FAF0D6' }}>
                Processo Seletivo 2025
              </span>
            </div>
            
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4"
              style={{ color: '#FAF0D6' }}
            >
              Submeta seu Projeto
            </h1>
            
            <p 
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#FAF0D6', opacity: 0.85 }}
            >
              Preencha o formulário abaixo com os detalhes da sua startup. 
              Nossa equipe analisará sua submissão e entrará em contato.
            </p>
          </div>

          {/* Form Card */}
          <Card 
            className="max-w-4xl mx-auto border-0 overflow-hidden"
            style={{ 
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(250,240,214,0.2)'
            }}
          >
            <CardContent className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Seção 1: Dados Pessoais */}
                <div>
                  <h2 
                    className="text-xl font-playfair font-bold mb-6 pb-2 border-b"
                    style={{ color: '#780000', borderColor: 'rgba(120,0,0,0.2)' }}
                  >
                    Dados do Responsável
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label 
                        htmlFor="fullName"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        Nome Completo do Responsável pelo Projeto *
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Seu nome completo"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="h-11 border-gray-300 focus:border-[#01304A]"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    </div>
                    
                    <div>
                      <Label 
                        htmlFor="email"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        E-mail Principal para Contato *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-11 border-gray-300 focus:border-[#01304A]"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    </div>
                    
                    <div>
                      <Label 
                        htmlFor="phone"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        Telefone / WhatsApp (com DDD) *
                      </Label>
                      <Input
                        id="phone"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="h-11 border-gray-300 focus:border-[#01304A]"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Seção 2: Sobre a Startup */}
                <div>
                  <h2 
                    className="text-xl font-playfair font-bold mb-6 pb-2 border-b"
                    style={{ color: '#780000', borderColor: 'rgba(120,0,0,0.2)' }}
                  >
                    Sobre sua Startup
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label 
                        htmlFor="startupName"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        Nome da Startup / Projeto *
                        <span className="font-normal text-xs ml-2" style={{ color: '#669BBB' }}>
                          (mesmo que provisório)
                        </span>
                      </Label>
                      <Input
                        id="startupName"
                        placeholder="Qual o nome do seu negócio?"
                        value={formData.startupName}
                        onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                        required
                        className="h-11 border-gray-300 focus:border-[#01304A]"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    </div>
                    
                    <div>
                      <Label 
                        htmlFor="problem"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        Qual problema sua startup resolve? *
                        <span className="font-normal text-xs block mt-1" style={{ color: '#669BBB' }}>
                          Descreva em detalhes qual problema real do mercado ou da sociedade a sua startup se propõe a resolver. Qual é a 'dor' do seu cliente?
                        </span>
                      </Label>
                      <Textarea
                        id="problem"
                        placeholder="Descreva o problema que você identificou..."
                        value={formData.problem}
                        onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                        required
                        rows={4}
                        className="border-gray-300 focus:border-[#01304A] resize-none"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    </div>
                    
                    <div>
                      <Label 
                        htmlFor="solution"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        Como sua startup resolve esse problema? *
                        <span className="font-normal text-xs block mt-1" style={{ color: '#669BBB' }}>
                          Descreva seu produto, serviço ou plataforma e como ele funciona na prática.
                        </span>
                      </Label>
                      <Textarea
                        id="solution"
                        placeholder="Descreva sua solução em detalhes..."
                        value={formData.solution}
                        onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                        required
                        rows={4}
                        className="border-gray-300 focus:border-[#01304A] resize-none"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    </div>
                    
                    <div>
                      <Label 
                        htmlFor="targetMarket"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        Mercado-alvo *
                        <span className="font-normal text-xs block mt-1" style={{ color: '#669BBB' }}>
                          Quem são seus clientes ideais (persona)? Qual o tamanho estimado do mercado que você pretende atingir?
                        </span>
                      </Label>
                      <Textarea
                        id="targetMarket"
                        placeholder="Descreva seu público-alvo e tamanho do mercado..."
                        value={formData.targetMarket}
                        onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                        required
                        rows={3}
                        className="border-gray-300 focus:border-[#01304A] resize-none"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    </div>
                    
                    <div>
                      <Label 
                        htmlFor="differential"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        Diferencial competitivo *
                        <span className="font-normal text-xs block mt-1" style={{ color: '#669BBB' }}>
                          O que torna sua solução única? Quem são seus principais concorrentes e por que sua ideia é melhor ou diferente?
                        </span>
                      </Label>
                      <Textarea
                        id="differential"
                        placeholder="Explique seu diferencial e análise de concorrência..."
                        value={formData.differential}
                        onChange={(e) => setFormData({ ...formData, differential: e.target.value })}
                        required
                        rows={3}
                        className="border-gray-300 focus:border-[#01304A] resize-none"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    </div>
                    
                    <div>
                      <Label 
                        htmlFor="stage"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        Estágio Atual do Projeto *
                      </Label>
                      <select
                        id="stage"
                        value={formData.stage}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                        required
                        className="w-full h-11 px-3 rounded-md border border-gray-300 focus:border-[#01304A] focus:outline-none focus:ring-1 focus:ring-[#01304A] text-sm"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      >
                        <option value="">Selecione o estágio...</option>
                        {stages.map(stage => (
                          <option key={stage.value} value={stage.value}>
                            {stage.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seção 3: Motivação */}
                <div>
                  <h2 
                    className="text-xl font-playfair font-bold mb-6 pb-2 border-b"
                    style={{ color: '#780000', borderColor: 'rgba(120,0,0,0.2)' }}
                  >
                    Por que o CoLab?
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label 
                        htmlFor="whyColab"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        Por que você quer ser incubado(a)? *
                        <span className="font-normal text-xs block mt-1" style={{ color: '#669BBB' }}>
                          Dê uma breve descrição do porquê o CoLab deveria lhe ajudar a desenvolver a sua ideia
                        </span>
                      </Label>
                      <Textarea
                        id="whyColab"
                        placeholder="Conte-nos por que deseja fazer parte do CoLab..."
                        value={formData.whyColab}
                        onChange={(e) => setFormData({ ...formData, whyColab: e.target.value })}
                        required
                        rows={4}
                        className="border-gray-300 focus:border-[#01304A] resize-none"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    </div>
                    
                    <div>
                      <Label 
                        htmlFor="links"
                        className="text-sm font-medium mb-2 block"
                        style={{ color: '#01304A' }}
                      >
                        Links relevantes
                        <span className="font-normal text-xs block mt-1" style={{ color: '#669BBB' }}>
                          Cole aqui links relevantes: site, LinkedIn do fundador, vídeo demo, etc. (Se não houver nenhum, deixe em branco)
                        </span>
                      </Label>
                      <Textarea
                        id="links"
                        placeholder="https://..."
                        value={formData.links}
                        onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                        rows={2}
                        className="border-gray-300 focus:border-[#01304A] resize-none"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-medium transition-all duration-300"
                    style={{ 
                      background: isSubmitting 
                        ? 'linear-gradient(135deg, #780000 0%, #780000 100%)' 
                        : 'linear-gradient(135deg, #780000 0%, #9a1a1a 100%)',
                      color: '#FAF0D6'
                    }}
                    onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.background = 'linear-gradient(135deg, #9a1a1a 0%, #C1121F 100%)')}
                    onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.background = 'linear-gradient(135deg, #780000 0%, #9a1a1a 100%)')}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando submissão...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send className="w-5 h-5" />
                        Submeter Projeto
                      </div>
                    )}
                  </Button>
                  
                  <p 
                    className="text-xs text-center mt-4"
                    style={{ color: '#669BBB' }}
                  >
                    Ao submeter, você concorda com nossa política de privacidade e processamento de dados
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitProject;
