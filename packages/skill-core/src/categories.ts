import { CategoryInfo } from './types.js';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'backend',
    name: 'Backend Development',
    slug: 'backend-development',
    description: 'Architekturmuster, API-Design, Schichtenreinheit, Persistenz und Skalierbarkeit für moderne Serveranwendungen.',
    icon: 'Server',
    color: 'emerald'
  },
  {
    id: 'security',
    name: 'Cyber Security',
    slug: 'cyber-security',
    description: 'OWASP-Prüfungen, Schwachstellenanalysen, sicheres Auth-Design, Secrets-Handling und defensive Risikobewertung.',
    icon: 'ShieldAlert',
    color: 'red'
  },
  {
    id: 'ai-engineering',
    name: 'AI Engineering',
    slug: 'ai-engineering',
    description: 'RAG-Architekturen, Chunking, Embeddings, Vektordatenbanken, Hybrid Search und messbare LLM-Evaluation.',
    icon: 'Cpu',
    color: 'purple'
  },
  {
    id: 'testing',
    name: 'Testing & Quality Assurance',
    slug: 'testing-quality-assurance',
    description: 'Automatisierte Teststrategien, Testpyramide, Mocking, Edge-Case-Analyse und Ausfallsicherheit.',
    icon: 'CheckCircle2',
    color: 'blue'
  }
];

export function getCategoryByName(name: string): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.name.toLowerCase() === name.toLowerCase());
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.slug === slug || c.id === slug);
}

