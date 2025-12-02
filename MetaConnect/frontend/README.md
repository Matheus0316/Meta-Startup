# Paulo Maia Advocacia - Site Institucional

Site institucional moderno e responsivo para o escritório de advocacia especializado em Direito Trabalhista.

## 🚀 Funcionalidades

### Para Visitantes:
- **Homepage moderna** com seções informativas
- **Sistema de artigos** com blog jurídico
- **Formulário de contato** integrado com sistema de leads
- **Design responsivo** para todos os dispositivos
- **Informações de contato** e localização

### Para Administradores:
- **Gerenciamento de artigos** com editor completo
- **Sistema de leads** com status e acompanhamento
- **Área administrativa** protegida por autenticação
- **Dashboard** com estatísticas em tempo real

## 🛠️ Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── modules/            # Módulos organizados por funcionalidade
│   ├── articles/       # Sistema de artigos/blog
│   ├── leads/          # Sistema de leads
│   ├── auth/           # Autenticação
│   └── [sections]/     # Seções da homepage
├── hooks/              # Hooks personalizados
├── config/             # Configurações
└── pages/              # Páginas principais
```

## 🔧 Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **React Router** - Roteamento SPA
- **Lucide React** - Ícones modernos
- **Context API** - Gerenciamento de estado global

## 🎨 Características do Design

- **Design System** consistente com cores e tipografia padronizadas
- **Responsivo** para desktop, tablet e mobile
- **Modais personalizados** substituindo popups nativos
- **Animações suaves** e transições elegantes
- **Acessibilidade** com ARIA labels e navegação por teclado

## 🔐 Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=https://sua-api.com/api
VITE_API_TIMEOUT=10000
VITE_JWT_SECRET=sua_chave_secreta
VITE_APP_NAME=Paulo Maia Advocacia
VITE_WHATSAPP_NUMBER=5583999999999
VITE_EMAIL=contato@paulomaia.adv.br
```

## 📦 Deploy

Para deploy em produção:

1. **Build**: `npm run build`
2. **Arquivos gerados**: Pasta `dist/`
3. **Servidor**: Qualquer servidor de arquivos estáticos
4. **Recomendado**: Netlify, Vercel, ou Render

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request
