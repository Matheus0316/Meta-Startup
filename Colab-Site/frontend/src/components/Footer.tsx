import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Grafos decorativos do footer para fundo bege - forma triangular/hexagonal
const FooterGraphDecorationBeige = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grafo esquerda - forma hexagonal/triangular */}
    <svg 
      className="absolute -left-8 top-1/4 w-[180px] h-[150px]"
      viewBox="0 0 150 120"
      style={{ opacity: 0.1 }}
    >
      <g stroke="#01304A" strokeWidth="1" fill="none">
        <line x1="30" y1="90" x2="75" y2="20" />
        <line x1="75" y1="20" x2="120" y2="90" />
        <line x1="120" y1="90" x2="30" y2="90" />
        <line x1="52" y1="55" x2="98" y2="55" />
        <line x1="45" y1="70" x2="105" y2="70" />
        <line x1="75" y1="20" x2="75" y2="90" />
        <line x1="30" y1="90" x2="10" y2="110" />
        <line x1="120" y1="90" x2="140" y2="110" />
      </g>
      <g fill="#01304A">
        <circle cx="30" cy="90" r="3" />
        <circle cx="75" cy="20" r="3" />
        <circle cx="120" cy="90" r="3" />
        <circle cx="52" cy="55" r="2" />
        <circle cx="98" cy="55" r="2" />
        <circle cx="75" cy="55" r="3" />
      </g>
    </svg>

    {/* Grafo direita - forma de diamante/losango */}
    <svg 
      className="absolute -right-8 bottom-1/4 w-[180px] h-[150px]"
      viewBox="0 0 150 120"
      style={{ opacity: 0.1 }}
    >
      <g stroke="#780000" strokeWidth="1" fill="none">
        <line x1="75" y1="10" x2="130" y2="60" />
        <line x1="130" y1="60" x2="75" y2="110" />
        <line x1="75" y1="110" x2="20" y2="60" />
        <line x1="20" y1="60" x2="75" y2="10" />
        <line x1="75" y1="10" x2="75" y2="110" />
        <line x1="20" y1="60" x2="130" y2="60" />
        <line x1="47" y1="35" x2="103" y2="85" />
        <line x1="103" y1="35" x2="47" y2="85" />
      </g>
      <g fill="#780000">
        <circle cx="75" cy="10" r="3" />
        <circle cx="130" cy="60" r="3" />
        <circle cx="75" cy="110" r="3" />
        <circle cx="20" cy="60" r="3" />
        <circle cx="75" cy="60" r="3" />
      </g>
    </svg>
  </div>
);


const Footer = () => {
  const quickLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Blog", href: "#blog" },
    { name: "Contato", href: "#contato" }
  ];

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#FAF0D6' }}>
      {/* Grafos decorativos */}
      <FooterGraphDecorationBeige />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-playfair font-bold mb-2" style={{ color: '#01304A' }}>
                CoLab
              </h3>
              <p style={{ color: '#669BBB' }}>
                Incubadora de Startups
              </p>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: '#01304A', opacity: 0.7 }}>
              Transformando ideias inovadoras em negócios de sucesso através de mentoria e conexões estratégicas.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6" style={{ color: '#01304A' }}>
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleNavClick(link.href)}
                    className="hover:opacity-70 smooth-transition text-left"
                    style={{ color: '#01304A', opacity: 0.7 }}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{ color: '#01304A' }}>
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" style={{ color: '#669BBB' }} />
                <span style={{ color: '#01304A', opacity: 0.7 }}>
                  (11) 99999-9999
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" style={{ color: '#669BBB' }} />
                <span style={{ color: '#01304A', opacity: 0.7 }}>
                  contato@colab.com.br
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" style={{ color: '#669BBB' }} />
                <div className="flex flex-col">
                  <span style={{ color: '#01304A', opacity: 0.7 }}>
                    Endereço
                  </span>
                  <span className="text-sm" style={{ color: '#01304A', opacity: 0.5 }}>
                    Cidade, Estado
                  </span>
                </div>
              </div>
            </div>

            <div 
              className="mt-6 p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(1,48,74,0.08)' }}
            >
              <p className="text-sm" style={{ color: '#01304A', opacity: 0.8 }}>
                <strong>Horário de Atendimento:</strong><br />
                Segunda a Sexta: 9h às 18h
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" style={{ backgroundColor: 'rgba(1,48,74,0.15)' }} />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm" style={{ color: '#01304A', opacity: 0.6 }}>
              2025 CoLab. Todos os direitos reservados.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs max-w-md" style={{ color: '#01304A', opacity: 0.5 }}>
              Incubadora de Startups e Inovação
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;