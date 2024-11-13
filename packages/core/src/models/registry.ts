import { z } from 'zod'

export const ModelCapabilitySchema = z.enum([
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
])

export const ModelProviderSchema = z.enum([
  'OPENAI',
  'ANTHROPIC',
  'NVIDIA',
  'GOOGLE',
  'META',
  'AMAZON',
  'SAP',
  'ORACLE',
  'COHERE',
  'MISTRAL'
])

export const ModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: ModelProviderSchema,
  capabilities: z.array(ModelCapabilitySchema),
  contextWindow: z.number(),
  costPer1kTokens: z.number(),
  isAvailable: z.boolean(),
  apiEndpoint: z.string(),
  apiVersion: z.string(),
  lastUpdated: z.date(),
  specializations: z.array(z.string()),
  performance: z.record(z.string(), z.number())
})

export type Model = z.infer<typeof ModelSchema>

export class ModelRegistry {
  private static instance: ModelRegistry
  private models: Map<string, Model> = new Map()
  private apiKeys: Map<string, string> = new Map()

  private constructor() {
    this.initializeModels()
  }

  static getInstance(): ModelRegistry {
    if (!ModelRegistry.instance) {
      ModelRegistry.instance = new ModelRegistry()
    }
    return ModelRegistry.instance
  }

  private initializeModels() {
    const defaultModels: Model[] = [
      {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        provider: 'OPENAI',
        capabilities: ['CODE_GENERATION', 'CODE_REVIEW', 'ARCHITECTURE'],
        contextWindow: 128000,
        costPer1kTokens: 0.01,
        isAvailable: true,
        apiEndpoint: 'https://api.openai.com/v1/chat/completions',
        apiVersion: '2024-01',
        lastUpdated: new Date(),
        specializations: ['Full-Stack Development', 'System Design'],
        performance: {
          codeQuality: 0.95,
          speed: 0.9,
          accuracy: 0.93
        }
      },
      {
        id: 'claude-3',
        name: 'Claude 3',
        provider: 'ANTHROPIC',
        capabilities: ['DOCUMENTATION', 'TESTING', 'SECURITY'],
        contextWindow: 200000,
        costPer1kTokens: 0.0085,
        isAvailable: true,
        apiEndpoint: 'https://api.anthropic.com/v1/messages',
        apiVersion: '2024-01',
        lastUpdated: new Date(),
        specializations: ['Code Analysis', 'Documentation'],
        performance: {
          codeQuality: 0.92,
          speed: 0.88,
          accuracy: 0.95
        }
      },
      {
        id: 'nvidia-nim',
        name: 'NVIDIA NIM',
        provider: 'NVIDIA',
        capabilities: ['OPTIMIZATION', 'UI_DESIGN', 'DEPLOYMENT'],
        contextWindow: 100000,
        costPer1kTokens: 0.015,
        isAvailable: true,
        apiEndpoint: 'https://api.nvidia.com/nim/v1',
        apiVersion: '2024-01',
        lastUpdated: new Date(),
        specializations: ['Performance Optimization', 'GPU Acceleration'],
        performance: {
          codeQuality: 0.9,
          speed: 0.95,
          accuracy: 0.91
        }
      }
    ]

    defaultModels.forEach(model => this.models.set(model.id, model))
  }

  async addModel(model: Model) {
    if (this.models.has(model.id)) {
      throw new Error(`Model ${model.id} already exists`)
    }
    this.models.set(model.id, model)
  }

  async setApiKey(provider: string, apiKey: string) {
    this.apiKeys.set(provider, apiKey)
  }

  async getBestModelForTask(
    capability: z.infer<typeof ModelCapabilitySchema>,
    requirements: {
      minContextWindow?: number
      maxCost?: number
      preferredProvider?: string
    } = {}
  ): Promise<Model | null> {
    const candidates = Array.from(this.models.values())
      .filter(model => {
        const hasCapability = model.capabilities.includes(capability)
        const meetsContext = !requirements.minContextWindow || 
                           model.contextWindow >= requirements.minContextWindow
        const meetsCost = !requirements.maxCost || 
                         model.costPer1kTokens <= requirements.maxCost
        const meetsProvider = !requirements.preferredProvider || 
                            model.provider === requirements.preferredProvider
        
        return hasCapability && meetsContext && meetsCost && meetsProvider
      })
      .sort((a, b) => {
        // Sort by performance scores
        const aScore = a.performance.accuracy * 0.4 + 
                      a.performance.codeQuality * 0.4 + 
                      a.performance.speed * 0.2
        const bScore = b.performance.accuracy * 0.4 + 
                      b.performance.codeQuality * 0.4 + 
                      b.performance.speed * 0.2
        return bScore - aScore
      })

    return candidates[0] || null
  }

  async getModelById(id: string): Promise<Model | null> {
    return this.models.get(id) || null
  }

  async getAllModels(): Promise<Model[]> {
    return Array.from(this.models.values())
  }

  async updateModel(id: string, updates: Partial<Model>) {
    const model = this.models.get(id)
    if (!model) {
      throw new Error(`Model ${id} not found`)
    }
    this.models.set(id, { ...model, ...updates })
  }
}