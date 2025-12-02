import { 
  Article, 
  CreateArticleRequest, 
  UpdateArticleRequest, 
  ArticlesResponse, 
  ArticleResponse,
  SearchArticlesResponse,
  CategoriesResponse 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_KEY = 'your_secure_api_key_here_32_characters_long';

// Dados mock para fallback quando a API não estiver disponível
const MOCK_ARTICLES: Article[] = [
  {
    id: '507f1f77bcf86cd799439011',
    title: "Reforma Trabalhista 2025: O que mudou na prática",
    subtitle: "Análise técnica das principais alterações na legislação trabalhista e seus impactos práticos para trabalhadores e empresas.",
    content: "A Reforma Trabalhista de 2025 trouxe mudanças significativas...",
    category: "Legislação",
    active: true,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: '507f1f77bcf86cd799439012',
    title: "5 Medidas Preventivas para Empresas Evitarem Ações Trabalhistas",
    subtitle: "Estratégias práticas de compliance trabalhista para reduzir riscos jurídicos e fortalecer relações laborais.",
    content: "Para evitar ações trabalhistas, as empresas devem adotar medidas preventivas...",
    category: "Consultoria",
    active: true,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z"
  },
  {
    id: '507f1f77bcf86cd799439013',
    title: "Direitos Básicos do Trabalhador: O que Você Precisa Saber",
    subtitle: "Guia completo sobre direitos fundamentais garantidos pela legislação trabalhista brasileira.",
    content: "Todo trabalhador possui direitos fundamentais garantidos pela legislação...",
    category: "Direitos",
    active: true,
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2025-01-05T10:00:00Z"
  },
  {
    id: '507f1f77bcf86cd799439014',
    title: "Rescisão de Contrato: Procedimentos e Cálculos",
    subtitle: "Entenda os procedimentos corretos e como calcular verbas rescisórias.",
    content: "A rescisão de contrato de trabalho envolve diversos procedimentos...",
    category: "Procedimentos",
    active: false,
    createdAt: "2024-12-20T10:00:00Z",
    updatedAt: "2024-12-20T10:00:00Z"
  },
  {
    id: '507f1f77bcf86cd799439015',
    title: "Assédio Moral no Trabalho: Como Identificar e Agir",
    subtitle: "Saiba como identificar situações de assédio moral e quais medidas tomar.",
    content: "O assédio moral no ambiente de trabalho é uma questão séria...",
    category: "Direitos",
    active: false,
    createdAt: "2024-12-15T10:00:00Z",
    updatedAt: "2024-12-15T10:00:00Z"
  },
  {
    id: '507f1f77bcf86cd799439016',
    title: "Home Office: Direitos e Deveres na Era Digital",
    subtitle: "Conheça os direitos e deveres relacionados ao trabalho remoto.",
    content: "O trabalho remoto se tornou uma realidade para muitos profissionais...",
    category: "Legislação",
    active: false,
    createdAt: "2024-12-10T10:00:00Z",
    updatedAt: "2024-12-10T10:00:00Z"
  }
];

const MOCK_CATEGORIES = ["Legislação", "Consultoria", "Direitos", "Procedimentos"];

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
});

export const articlesApi = {
  // GET /articles
  getAll: async (): Promise<ArticlesResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json();
      
      // Verificar se a API retorna diretamente um array ou um objeto com articles
      if (Array.isArray(data)) {
        // API retorna diretamente o array de artigos
        return {
          success: true,
          count: data.length,
          articles: data
        };
      } else if (data && Array.isArray(data.articles)) {
        // API retorna objeto com propriedade articles
        return data;
      } else {
        throw new Error('Formato de dados inválido');
      }
    } catch (error) {
      console.warn('API não disponível, usando dados mock:', error);
      // Retornar dados mock quando a API não estiver disponível
      return {
        success: true,
        count: MOCK_ARTICLES.length,
        articles: MOCK_ARTICLES
      };
    }
  },

  // GET /articles/{id}
  getById: async (id: string): Promise<ArticleResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }

      const data = await response.json();
      
      // Verificar se a API retorna diretamente o artigo ou um objeto com article
      if (data && data.id) {
        // API retorna diretamente o artigo
        return {
          success: true,
          article: data
        };
      } else if (data && data.article) {
        // API retorna objeto com propriedade article
        return data;
      } else {
        throw new Error('Formato de artigo inválido');
      }
    } catch (error) {
      console.warn('API não disponível, buscando artigo mock:', error);
      // Buscar artigo mock pelo ID
      const mockArticle = MOCK_ARTICLES.find(article => article.id === id);
      if (mockArticle) {
        return {
          success: true,
          article: mockArticle
        };
      } else {
        throw new Error('Artigo não encontrado');
      }
    }
  },

  // POST /articles
  create: async (data: CreateArticleRequest): Promise<ArticleResponse> => {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create article');
    }

    return response.json();
  },

  // PUT /articles/{id}
  update: async (id: string, data: UpdateArticleRequest): Promise<ArticleResponse> => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update article');
    }

    return response.json();
  },

  // DELETE /articles/{id}
  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete article');
    }

    return response.json();
  },

  // GET /articles/search/query
  search: async (query: string): Promise<SearchArticlesResponse> => {
    const response = await fetch(`${API_BASE_URL}/articles/search/query?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to search articles');
    }

    return response.json();
  },

  // GET /articles/category/filter
  getByCategory: async (category: string): Promise<ArticlesResponse> => {
    const response = await fetch(`${API_BASE_URL}/articles/category/filter?category=${encodeURIComponent(category)}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles by category');
    }

    return response.json();
  },

  // GET /articles/categories/list
  getCategories: async (): Promise<CategoriesResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/categories/list`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      
      // Verificar se a API retorna diretamente um array ou um objeto com categories
      if (Array.isArray(data)) {
        // API retorna diretamente o array de categorias
        return {
          success: true,
          categories: data
        };
      } else if (data && Array.isArray(data.categories)) {
        // API retorna objeto com propriedade categories
        return data;
      } else {
        throw new Error('Formato de categorias inválido');
      }
    } catch (error) {
      console.warn('API não disponível, usando categorias mock:', error);
      // Retornar categorias mock quando a API não estiver disponível
      return {
        success: true,
        categories: MOCK_CATEGORIES
      };
    }
  },
};
