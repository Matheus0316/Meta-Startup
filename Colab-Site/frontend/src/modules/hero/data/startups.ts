import { Startup } from '../types';

export const startups: Startup[] = [
  {
    id: '1',
    name: 'NeoTech Solutions',
    description: 'Plataforma de inteligência artificial para automação de processos industriais, reduzindo custos operacionais em até 40%.',
    shortDescription: 'IA para automação industrial',
    category: 'incubada',
    sector: 'Tecnologia',
    website: 'https://neotech.com',
    founded: '2023',
    tags: ['IA', 'Indústria 4.0', 'Automação']
  },
  {
    id: '2',
    name: 'GreenPath',
    description: 'Soluções sustentáveis para logística urbana com veículos elétricos e otimização de rotas por machine learning.',
    shortDescription: 'Logística sustentável',
    category: 'incubada',
    sector: 'Sustentabilidade',
    website: 'https://greenpath.io',
    founded: '2022',
    tags: ['Sustentabilidade', 'Logística', 'ML']
  },
  {
    id: '3',
    name: 'EduSpark',
    description: 'Plataforma gamificada de educação personalizada usando adaptive learning para potencializar o aprendizado.',
    shortDescription: 'EdTech gamificada',
    category: 'pre-incubada',
    sector: 'Educação',
    website: 'https://eduspark.com.br',
    founded: '2024',
    tags: ['EdTech', 'Gamificação', 'IA']
  },
  {
    id: '4',
    name: 'HealthBridge',
    description: 'Telemedicina avançada com diagnóstico assistido por IA e integração completa com prontuários eletrônicos.',
    shortDescription: 'Telemedicina com IA',
    category: 'incubada',
    sector: 'Saúde',
    website: 'https://healthbridge.med',
    founded: '2023',
    tags: ['HealthTech', 'Telemedicina', 'IA']
  },
  {
    id: '5',
    name: 'AgroSense',
    description: 'IoT e sensoriamento remoto para agricultura de precisão, aumentando produtividade e reduzindo uso de recursos.',
    shortDescription: 'AgTech inteligente',
    category: 'pre-incubada',
    sector: 'Agronegócio',
    website: 'https://agrosense.agro',
    founded: '2024',
    tags: ['AgTech', 'IoT', 'Precisão']
  },
  {
    id: '6',
    name: 'FinFlow',
    description: 'Open banking e gestão financeira inteligente para PMEs com análise preditiva de fluxo de caixa.',
    shortDescription: 'FinTech para PMEs',
    category: 'incubada',
    sector: 'Finanças',
    website: 'https://finflow.fin',
    founded: '2023',
    tags: ['FinTech', 'Open Banking', 'PME']
  },
  {
    id: '7',
    name: 'CyberGuard',
    description: 'Cibersegurança proativa com detecção de ameaças em tempo real usando redes neurais avançadas.',
    shortDescription: 'Segurança cibernética',
    category: 'pre-incubada',
    sector: 'Segurança',
    founded: '2024',
    tags: ['CyberSec', 'IA', 'Proteção']
  },
  {
    id: '8',
    name: 'SmartRetail',
    description: 'Transformação digital do varejo com analytics avançado, personalização e experiência omnichannel.',
    shortDescription: 'Varejo inteligente',
    category: 'incubada',
    sector: 'Varejo',
    website: 'https://smartretail.store',
    founded: '2022',
    tags: ['Retail', 'Analytics', 'Omnichannel']
  }
];

// Paleta de cores do Colab - variações neutras
export const getSectorStyle = (index: number): { bg: string; accent: string } => {
  const styles = [
    { bg: '#01304A', accent: '#669BBB' }, // Azul escuro + azul claro
    { bg: '#669BBB', accent: '#01304A' }, // Azul claro + azul escuro
    { bg: '#780000', accent: '#C1121F' }, // Vermelho escuro + vermelho
    { bg: '#01304A', accent: '#FAF0D6' }, // Azul escuro + bege
    { bg: '#C1121F', accent: '#780000' }, // Vermelho + vermelho escuro
    { bg: '#669BBB', accent: '#FAF0D6' }, // Azul claro + bege
    { bg: '#780000', accent: '#669BBB' }, // Vermelho escuro + azul claro
    { bg: '#01304A', accent: '#C1121F' }, // Azul escuro + vermelho
  ];
  return styles[index % styles.length];
};

export const getSectorIcon = (sector: string): string => {
  const icons: Record<string, string> = {
    'Tecnologia': '⚡',
    'Sustentabilidade': '🌿',
    'Educação': '🎓',
    'Saúde': '💊',
    'Agronegócio': '🌱',
    'Finanças': '📊',
    'Segurança': '🔐',
    'Varejo': '🛍️'
  };
  return icons[sector] || '🚀';
};

