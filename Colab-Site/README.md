# 🚀 Núcleo Colab - Projeto Colaborativo

E aí, como vai? 👋 

Pelo visto, se você está me vendo aqui do seu **VSCode** ou **Windsurf**, quer dizer que você já aprendeu a usar `git clone` (aquele comando mágico que copia projetos da internet pro seu computador). Parabéns! 🎉

Mas caso ainda não tenha feito isso e está vendo essa mensagem direto do **GitHub** (aquele site onde os programadores guardam seus códigos), vem comigo que vou te explicar desde o comecinho. Simbora! 🏃‍♂️

---

## 📚 O que é esse projeto?

Este é um projeto **fullstack** (nome chique pra dizer que tem tanto a parte visual quanto a parte dos dados) feito para você aprender e colaborar com a gente!

É uma plataforma web completa com:
- 🎨 **Frontend** (a parte bonita que você vê no navegador)
- ⚙️ **Backend** (a parte que trabalha nos bastidores)
- 🗄️ **Banco de dados** (onde guardamos as informações)

---

## 🗂️ Estrutura do Projeto

Quando você abrir a pasta do projeto, vai ver duas pastas principais:

```
Site Colab/
├── 📁 Site-Colab/
│   ├── 📁 client/          ← Frontend (é aqui que você vai mexer!)
│   └── 📁 server/          ← Backend (provavelmente você nem vai mexer aqui...)
└── 📄 README.md            ← Você está aqui! 👈
```

### 🎨 Client (Frontend)

É aqui que a mágica visual acontece! Tudo que você vê no navegador vem daqui.

**Tecnologias usadas:**
- **React** - Uma biblioteca JavaScript pra criar interfaces (tipo montar LEGO, mas com código)
- **TypeScript** - JavaScript com superpoderes (ele avisa quando você erra antes de quebrar tudo)
- **TailwindCSS** - Um jeito super rápido de deixar as coisas bonitas
- **Vite** - Uma ferramenta que deixa tudo rodando rapidinho

**Principais pastas dentro de `client/`:**
```
client/
├── src/
│   ├── components/       ← Pedacinhos reutilizáveis (tipo Header, Footer, Botões)
│   ├── modules/          ← Seções grandes (Hero, About, Blog, etc)
│   ├── pages/            ← As páginas do site
│   └── config/           ← Configurações (emails, telefones, etc)
├── public/               ← Imagens e arquivos públicos
└── index.html            ← O arquivo principal que carrega tudo
```

### ⚙️ Server (Backend)

É aqui que ficam as regras de negócio, autenticação e comunicação com o banco de dados.

**Tecnologias usadas:**
- **NestJS** - Um framework Node.js super organizado
- **Prisma** - Uma ferramenta que conversa com o banco de dados
- **MongoDB** - Banco de dados NoSQL (guarda informações em formato de documentos)

**Você provavelmente não vai precisar mexer aqui**, mas se quiser dar uma olhada:
```
server/
├── src/
│   ├── auth/             ← Sistema de login
│   ├── article/          ← Gerenciamento de artigos do blog
│   ├── lead/             ← Formulários de contato
│   └── team/             ← Gerenciamento da equipe
└── prisma/
    └── schema.prisma     ← Estrutura do banco de dados
```

---

## 🛠️ Como rodar o projeto?

### Pré-requisitos (coisas que você precisa instalar antes)

1. **Node.js** (versão 18 ou superior)
   - É tipo o motor que faz tudo funcionar
   - Baixe em: https://nodejs.org/
   - Pra ver se já tem instalado, abra o terminal e digite: `node --version`

2. **Git** (pra clonar o projeto)
   - É a ferramenta que baixa projetos do GitHub
   - Baixe em: https://git-scm.com/
   - Pra ver se já tem: `git --version`

3. **Yarn** (gerenciador de pacotes)
   - É tipo uma loja de apps, mas pra código
   - Depois de instalar o Node, rode: `npm install -g yarn`
   - Pra ver se deu certo: `yarn --version`

### 🔽 Passo 1: Clonar o projeto

Se você ainda não clonou (baixou) o projeto:

```bash
# Abra o terminal e navegue até onde quer salvar o projeto
cd Desktop

# Clone o repositório 
git clone https://github.com/caiorafaeldop/Colab-Site.git

# Entre na pasta do projeto
cd "Site-Colab"
```

### ▶️ Passo 2: Abrir 2 Terminais

**IMPORTANTE:** Você vai precisar de **2 terminais abertos** ao mesmo tempo!
- 🖥️ **Terminal 1:** Para rodar o servidor (backend)
- 🎨 **Terminal 2:** Para rodar o site (frontend)

---

### 🔧 Passo 3: Rodar o Servidor (Backend)

**No Terminal 1**, rode estes comandos:

```bash
# Entre na pasta do servidor
cd Site-Colab/server

# Instale as dependências
npm install

# Rode o servidor
npm run start:dev
```

✅ **Servidor rodando!** Você vai ver algo como:
```
[Nest] Application successfully started
```

**Deixe esse terminal aberto!** O servidor precisa ficar rodando.

---

### 🎨 Passo 4: Rodar o Site (Frontend)

**Abra um SEGUNDO terminal** e rode:

```bash
# Entre na pasta do client
cd Site-Colab/client

# Instale as dependências
yarn install

# Rode o projeto em modo desenvolvimento
yarn dev
```

✨ **Pronto!** O terminal vai mostrar algo como:
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
```

Abra seu navegador e acesse `http://localhost:5173/` - o site vai estar lá! 🎉

**Dica:** Toda vez que você salvar um arquivo, o site atualiza sozinho no navegador. É mágica! ✨

---

### 📝 Resumo Rápido

**Terminal 1 (Servidor):**
```bash
cd Site-Colab/server
npm run start:dev
```

**Terminal 2 (Site):**
```bash
cd Site-Colab/client
yarn dev
```

**Mantenha os 2 terminais abertos enquanto estiver desenvolvendo!**

---

### 🗄️ Passo 5: Configurar Banco de Dados (Se necessário)

Se você quiser testar funcionalidades como formulários de contato ou login:

```bash
# Em outro terminal, entre na pasta do server
cd Site-Colab/server

# Instale as dependências
yarn

# Rode o servidor
yarn start:dev
```

O backend vai rodar em `http://localhost:3001/`

**Importante:** Você vai precisar configurar um banco de dados MongoDB. Mas relaxa, pra começar a mexer no visual você não precisa disso!

---

## 🎯 Por onde começar?

Se você é **completamente iniciante**, recomendo começar por aqui:

### 1. 🎨 Mudando Cores e Textos

**Arquivo:** `client/src/config/env.ts`

Aqui você pode mudar:
- Nome do site
- Email de contato
- Telefone
- WhatsApp

```typescript
export const config = {
  app: {
    name: 'Núcleo Colab',  // ← Mude aqui!
  },
  contact: {
    email: 'contato@exemplo.com.br',  // ← E aqui!
    phone: '(11) 99999-9999',
  },
};
```

### 2. 📝 Editando o Conteúdo das Seções

Cada seção do site tem seu próprio arquivo:

- **Hero (primeira seção):** `client/src/modules/hero/pages/index.tsx`
- **Sobre:** `client/src/modules/about/pages/index.tsx`
- **Blog:** `client/src/modules/articles/pages/index.tsx`
- **Contato:** `client/src/modules/cta/pages/index.tsx`

Abra qualquer um desses arquivos e procure por textos entre aspas `"texto aqui"` - você pode mudá-los!

### 3. 🎨 Mudando Estilos

Usamos **TailwindCSS**, que são classes CSS prontas. Por exemplo:

```tsx
<h1 className="text-4xl font-bold text-primary">
  Meu Título
</h1>
```

- `text-4xl` = tamanho grande
- `font-bold` = negrito
- `text-primary` = cor primária do tema

Documentação do Tailwind: https://tailwindcss.com/docs


**Cores do tema:**
- Principal: `#780000` (Vermelho escuro)
- Secundária: `#01304A` (Azul marinho)
- Terciária: `#C1121F` (Vermelho vibrante)
- Quaternária: `#669BBB` (Azul claro)
- Background: `#fdf0d5` (bege)

---

## 🤝 Como Contribuir?

1. **Faça um Fork** do projeto (cria uma cópia sua com git clone)
2. **Crie uma Branch** pra sua mudança: `git checkout -b minha-feature`
3. **Faça suas alterações** e teste bem!
4. **Commit suas mudanças**: `git commit -m "Adiciona nova feature"`
5. **Push pra sua branch**: `git push origin minha-feature`
6. **Abra um Pull Request** (pede pra gente revisar e adicionar suas mudanças)

**Não sabe o que é Fork, Branch, Commit?** Sem problema! Vamos te ensinar no caminho. 😊

---

## 📖 Glossário (Dicionário de Termos)

Pra você não se perder:

- **Frontend:** A parte visual do site (HTML, CSS, JavaScript)
- **Backend:** A parte que processa dados e regras de negócio
- **API:** Ponte que conecta frontend e backend
- **Component:** Pedacinho reutilizável de código (tipo um LEGO)
- **Props:** Informações que você passa pra um componente
- **State:** Informação que muda com o tempo (tipo um contador)
- **Hook:** Funções especiais do React (começam com `use`)
- **npm/yarn:** Gerenciadores de pacotes (instalam bibliotecas)
- **Git:** Sistema de controle de versão (tipo um "ctrl+z" turbinado)
- **GitHub:** Site onde guardamos código com Git
- **Clone:** Baixar um projeto do GitHub
- **Commit:** Salvar mudanças no Git
- **Push:** Enviar mudanças pro GitHub
- **Pull:** Baixar mudanças do GitHub

---

## 🆘 Precisa de Ajuda?

Se travou em alguma coisa:

1. 🔍 **Procure no Google (Ou na IA, melhor ainda)** - Sério, 90% das dúvidas já foram respondidas!
2. 💬 **Pergunta no grupo** - Estamos aqui pra ajudar
3. 📚 **Se tiver punk, leia a documentação** das tecnologias
4. 🎥 **Assista tutoriais** no YouTube

**Lembre-se:** Todo programador começou sem saber nada. Errar faz parte do processo! 💪

---

## 🎓 Recursos para Aprender

### JavaScript/TypeScript
- [MDN Web Docs](https://developer.mozilla.org/pt-BR/) - A bíblia do JavaScript
- [JavaScript.info](https://javascript.info/) - Tutorial completo

### React
- [Documentação Oficial](https://react.dev/) - Em inglês, mas muito boa
- [React para Iniciantes](https://www.youtube.com/watch?v=FXqX7oof0I0) - Curso no YouTube

### TailwindCSS
- [Documentação Oficial](https://tailwindcss.com/docs) - Com exemplos visuais

### Git/GitHub
- [Git e GitHub para Iniciantes](https://www.youtube.com/watch?v=UBAX-13g8OM) - Curso no YouTube

---

## 📝 Comandos Úteis

```bash
# Ver status do Git (o que mudou)
git status

# Ver histórico de commits
git log

# Criar uma nova branch
git checkout -b nome-da-branch

# Voltar pra branch principal
git checkout main

# Atualizar seu código com as mudanças do GitHub
git pull

# Instalar dependências
yarn

# Rodar o projeto
yarn dev

# Criar build de produção
yarn build
```

---

## 🎉 Considerações Finais

Este projeto é um espaço seguro para aprender e experimentar. **Não tenha medo de errar!** 

Cada linha de código que você escreve é um passo na sua jornada como desenvolvedor(a). 🚀

Se tiver qualquer dúvida, por menor que pareça, pergunte! Estamos todos aprendendo juntos.

**Bora codar!** 💻✨

---
**Feito com ❤️ pelo Núcleo Colab**