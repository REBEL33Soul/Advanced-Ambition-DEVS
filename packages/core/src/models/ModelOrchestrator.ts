import { ModelRegistry } from './registry'
import { ModelCapabilitySchema } from './registry'
import type { Model } from './registry'

export class ModelOrchestrator {
  private registry: ModelRegistry
  private activeModels: Map<string, Model> = new Map()

  constructor() {
    this.registry = ModelRegistry.getInstance()
  }

  async selectModelsForProject(requirements: {
    capabilities: Array<z.infer<typeof ModelCapabilitySchema>>,
    contextSize?: number,
    budget?: number,
    preferredProviders?: string[]
  }): Promise<Map<string, Model>> {
    const selectedModels = new Map<string, Model>()

    for (const capability of requirements.capabilities) {
      const model = await this.registry.getBestModelForTask(capability, {
        minContextWindow: requirements.contextSize,
        maxCost: requirements.budget,
        preferredProvider: requirements.preferredProviders?.[0]
      })

      if (model) {
        selectedModels.set(capability, model)
      }
    }

    this.activeModels = selectedModels
    return selectedModels
  }

  async switchModel(capability: z.infer<typeof ModelCapabilitySchema>, newModelId: string) {
    const model = await this.registry.getModelById(newModelId)
    if (!model) {
      throw new Error(`Model ${newModelId} not found`)
    }
    
    if (!model.capabilities.includes(capability)) {
      throw new Error(`Model ${newModelId} does not support ${capability}`)
    }

    this.activeModels.set(capability, model)
  }

  getActiveModel(capability: z.infer<typeof ModelCapabilitySchema>): Model | undefined {
    return this.activeModels.get(capability)
  }

  async updateModelStatus(modelId: string, isAvailable: boolean) {
    await this.registry.updateModel(modelId, { isAvailable })
  }
}