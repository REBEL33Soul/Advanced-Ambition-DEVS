import { z } from 'zod'

export const ModelConfig = {
  providers: {
    OPENAI: {
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: process.env.OPENAI_LIKE_API_BASE_URL
    },
    ANTHROPIC: {
      apiKey: process.env.ANTHROPIC_API_KEY
    },
    GOOGLE: {
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
    },
    MISTRAL: {
      apiKey: process.env.MISTRAL_API_KEY
    },
    GROQ: {
      apiKey: process.env.GROQ_API_KEY
    },
    DEEPSEEK: {
      apiKey: process.env.DEEPSEEK_API_KEY
    },
    GROK: {
      apiKey: process.env.XAI_API_KEY
    }
  },
  
  defaultModels: {
    CODE_GENERATION: 'gpt-4-turbo',
    CODE_REVIEW: 'claude-3',
    ARCHITECTURE: 'gpt-4-turbo',
    TESTING: 'claude-3',
    DOCUMENTATION: 'mistral-large',
    DEPLOYMENT: 'gpt-4-turbo',
    DATABASE_DESIGN: 'claude-3',
    UI_DESIGN: 'gpt-4-turbo',
    OPTIMIZATION: 'deepseek-coder',
    SECURITY: 'claude-3'
  }
}

export const ModelCapabilities = [
  'CODE_GENERATION',
  'CODE_REVIEW',
  'ARCHITECTURE',
  'TESTING',
  'DOCUMENTATION',
  'DEPLOYMENT',
  'DATABASE_DESIGN',
  'UI_DESIGN',
  'OPTIMIZATION',
  'SECURITY'
] as const