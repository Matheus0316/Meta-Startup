export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  category: string;
  image?: string;
  active?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateArticleRequest {
  title: string;
  subtitle?: string;
  content: string;
  category: string;
  image?: string;
  active?: boolean;
}

export interface UpdateArticleRequest {
  title?: string;
  subtitle?: string;
  content?: string;
  category?: string;
  image?: string;
  active?: boolean;
}

export interface ArticlesResponse {
  success: boolean;
  count: number;
  articles: Article[];
}

export interface ArticleResponse {
  success: boolean;
  article: Article;
}

export interface SearchArticlesResponse {
  success: boolean;
  count: number;
  articles: Article[];
  query: string;
}

export interface CategoriesResponse {
  success: boolean;
  categories: string[];
}
