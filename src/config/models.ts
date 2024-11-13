import { z } from 'zod'
import { config } from 'dotenv'

config()

export const ModelConfig = {
  providers: {
    OPENAI: {
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: process.env.OPENAI_LIKE_API_BASE_URL || 'https://api.openai.com/v1',
      models: {
        'gpt-4-turbo': {
          contextWindow: 128000,
          costPer1kTokens: 0.01,
          capabilities: ['CODE_GENERATION', 'ARCHITECTURE', 'UI_DESIGN']
        },
        'gpt-4': {
          contextWindow: 8192,
          costPer1kTokens: 0.03,
          capabilities: ['CODE_REVIEW', 'SECURITY', 'TESTING']
        }
      }
    },
    ANTHROPIC: {
      apiKey: process.env.ANTHROPIC_API_KEY,
      baseUrl: 'https://api.anthropic.com/v1',
      models: {
        'claude-3-opus': {
          contextWindow: 200000,
          costPer1kTokens: 0.015,
          capabilities: ['CODE_REVIEW', 'DOCUMENTATION', 'SECURITY']
        },
        'claude-3-sonnet': {
          contextWindow: 200000,
          costPer1kTokens: 0.003,
          capabilities: ['TESTING', 'DATABASE_DESIGN']
        }
      }
    },
    GOOGLE: {
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      baseUrl: 'https://generativelanguage.googleapis.com/v1',
      models: {
        'gemini-pro': {
          contextWindow: 32768,
          costPer1kTokens: 0.0005,
          capabilities: ['CODE_GENERATION', 'DOCUMENTATION']
        }
      }
    },
    MISTRAL: {
      apiKey: process.env.MISTRAL_API_KEY,
      baseUrl: 'https://api.mistral.ai/v1',
      models: {
        'mistral-large': {
          contextWindow: 32768,
          costPer1kTokens: 0.002,
          capabilities: ['CODE_GENERATION', 'DOCUMENTATION']
        },
        'mistral-small': {
          contextWindow: 32768,
          costPer1kTokens: 0.0002,
          capabilities: ['CODE_REVIEW']
        }
      }
    },
    GROQ: {
      apiKey: process.env.GROQ_API_KEY,
      baseUrl: 'https://api.groq.com/v1',
      models: {
        'mixtral-8x7b': {
          contextWindow: 32768,
          costPer1kTokens: 0.0004,
          capabilities: ['CODE_GENERATION', 'OPTIMIZATION']
        }
      }
    },
    DEEPSEEK: {
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseUrl: 'https://api.deepseek.com/v1',
      models: {
        'deepseek-coder': {
          contextWindow: 32768,
          costPer1kTokens: 0.0008,
          capabilities: ['CODE_GENERATION', 'OPTIMIZATION']
        }
      }
    },
    XAI: {
      apiKey: process.env.XAI_API_KEY,
      baseUrl: 'https://api.xai.com/v1',
      models: {
        'grok-1': {
          contextWindow: 8192,
          costPer1kTokens: 0.0015,
          capabilities: ['CODE_GENERATION', 'CODE_REVIEW']
        }
      }
    },
    NVIDIA: {
      models: {
        'nim-code': {
          contextWindow: 32768,
          capabilities: ['CODE_GENERATION', 'OPTIMIZATION']
        }
      }
    }
  },
  
  defaultModels: {
    CODE_GENERATION: ['gpt-4-turbo', 'claude-3-opus', 'deepseek-coder'],
    CODE_REVIEW: ['claude-3-opus', 'gpt-4', 'mistral-large'],
    ARCHITECTURE: ['gpt-4-turbo', 'claude-3-opus'],
    TESTING: ['claude-3-opus', 'gpt-4'],
    DOCUMENTATION: ['claude-3-opus', 'mistral-large'],
    DEPLOYMENT: ['gpt-4-turbo', 'claude-3-opus'],
    DATABASE_DESIGN: ['claude-3-opus', 'gpt-4-turbo'],
    UI_DESIGN: ['gpt-4-turbo', 'claude-3-opus'],
    OPTIMIZATION: ['deepseek-coder', 'mixtral-8x7b'],
    SECURITY: ['claude-3-opus', 'gpt-4']
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

export const ApiKeySchema = z.object({
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),
  ANTHROPIC_API_KEY: z.string().min(1, 'Anthropic API key is required'),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1, 'Google AI API key is required'),
  MISTRAL_API_KEY: z.string().min(1, 'Mistral API key is required'),
  GROQ_API_KEY: z.string().min(1, 'Groq API key is required'),
  DEEPSEEK_API_KEY: z.string().min(1, 'Deepseek API key is required'),
  XAI_API_KEY: z.string().min(1, 'XAI API key is required')
})

export function validateApiKeys() {
  const result = ApiKeySchema.safeParse(process.env)
  if (!result.success) {
    console.warn('API Key validation warnings:', result.error.format())
    return false
  }
  return true
}

export function getBestModelForTask(task: keyof typeof ModelConfig.defaultModels, requirements?: {
  minContextWindow?: number
  maxCost?: number
  preferredProvider?: string
}) {
  const defaultModels = ModelConfig.defaultModels[task]
  
  return defaultModels
    .map(modelId => {
      for (const [provider, config] of Object.entries(ModelConfig.providers)) {
        const model = config.models?.[modelId]
        if (model) {
          return {
            id: modelId,
            provider,
            ...model,
            apiKey: config.apiKey,
            baseUrl: config.baseUrl
          }
        }
      }
      return null
    })
    .filter(model => {
      if (!model) return false
      if (requirements?.minContextWindow && model.contextWindow < requirements.minContextWindow) return false
      if (requirements?.maxCost && model.costPer1kTokens > requirements.maxCost) return false
      if (requirements?.preferredProvider && model.provider !== requirements.preferredProvider) return false
      return true
    })
    .sort((a, b) => (a?.costPer1kTokens || 0) - (b?.costPer1kTokens || 0))[0] || null
}