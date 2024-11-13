import { describe, it, expect, beforeEach } from 'vitest'
import { ModelRegistry } from '../../src/models/registry'
import { ModelOrchestrator } from '../../src/models/ModelOrchestrator'

describe('Model Switching Performance', () => {
  let registry: ModelRegistry
  let orchestrator: ModelOrchestrator

  beforeEach(() => {
    registry = ModelRegistry.getInstance()
    orchestrator = new ModelOrchestrator()
  })

  it('should efficiently switch between models', async () => {
    const start = performance.now()
    
    await orchestrator.selectModelsForProject({
      capabilities: ['CODE_GENERATION', 'TESTING'],
      contextSize: 16384,
      budget: 0.01
    })

    const switchTime = performance.now() - start
    expect(switchTime).toBeLessThan(100) // Should switch in under 100ms
  })

  it('should handle concurrent model selections', async () => {
    const promises = Array(10).fill(null).map(() => 
      orchestrator.selectModelsForProject({
        capabilities: ['CODE_GENERATION'],
        contextSize: 8192
      })
    )

    const results = await Promise.all(promises)
    expect(results).toHaveLength(10)
    results.forEach(result => {
      expect(result.size).toBeGreaterThan(0)
    })
  })

  it('should maintain performance under load', async () => {
    const iterations = 100
    const times: number[] = []

    for (let i = 0; i < iterations; i++) {
      const start = performance.now()
      await orchestrator.selectModelsForProject({
        capabilities: ['CODE_GENERATION', 'TESTING', 'DOCUMENTATION'],
        contextSize: 32768
      })
      times.push(performance.now() - start)
    }

    const avgTime = times.reduce((a, b) => a + b) / times.length
    expect(avgTime).toBeLessThan(150) // Average under 150ms
  })
})