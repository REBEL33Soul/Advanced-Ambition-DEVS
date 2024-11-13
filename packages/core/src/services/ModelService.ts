import { ModelConfig, ModelCapabilities } from '../config/models'
import { createClient } from '@advanced-ambition/api-client'

export class ModelService {
  private static instance: ModelService
  private clients: Map<string, any> = new Map()

  private constructor() {
    this.initializeClients()
  }

  static getInstance(): ModelService {
    if (!ModelService.instance) {
      ModelService.instance = new ModelService()
    }
    return ModelService.instance
  }

  private initializeClients() {
    Object.entries(ModelConfig.providers).forEach(([provider, config]) => {
      if (config.apiKey) {
        this.clients.set(provider, createClient({
          provider,
          apiKey: config.apiKey,
          baseUrl: config.baseUrl
        }))
      }
    })
  }

  async getBestModelForTask(task: typeof ModelCapabilities[number], context: {
    codeSize?: number,
    complexity?: number,
    priority?: 'SPEED' | 'QUALITY' | 'COST'
  } = {}) {
    // Implement smart model selection logic
    const defaultModel = ModelConfig.defaultModels[task]
    return this.clients.get(defaultModel) || this.clients.get('OPENAI')
  }

  async switchModel(task: typeof ModelCapabilities[number], provider: string) {
    const client = this.clients.get(provider)
    if (!client) {
      throw new Error(`Provider ${provider} not configured`)
    }
    return client
  }
}