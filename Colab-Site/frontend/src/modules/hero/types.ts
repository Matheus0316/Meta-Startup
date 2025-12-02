export interface Startup {
  id: string;
  name: string;
  logo?: string;
  description: string;
  shortDescription: string;
  category: 'incubada' | 'pre-incubada';
  sector: string;
  website?: string;
  founded?: string;
  tags: string[];
}

export type StartupCategory = 'todas' | 'incubada' | 'pre-incubada';
