import { z } from 'zod'
import { ModelRegistry } from '../models/registry'
import { UserPreferencesSchema } from '../config/preferences'
import { BuildProgressEmitter } from '../utils/BuildProgressEmitter'
import { AppError } from '../utils/errors'

export class BuilderService {
  private modelRegistry = ModelRegistry.getInstance()
  private progressEmitter = BuildProgressEmitter.getInstance()
  private preferences = UserPreferencesSchema.parse(
    JSON.parse(localStorage.getItem('user-preferences') || '{}')
  )

  async buildProject(config: any) {
    const isAutonomous = this.preferences.interactionMode === 'autonomous'

    try {
      // Start build process
      this.progressEmitter.start({
        steps: ['setup', 'dependencies', 'build', 'test', 'deploy'],
        totalTime: this.estimateBuildTime(config)
      })

      // Project setup
      await this.setupProject(config, isAutonomous)

      // Install dependencies
      await this.installDependencies(config, isAutonomous)

      // Build project
      await this.buildProjectFiles(config, isAutonomous)

      // Run tests
      const testResults = await this.runTests(config, isAutonomous)

      // Auto-deploy if enabled
      if (this.preferences.autoDeploy) {
        await this.deployProject(config, isAutonomous)
      }

      // Generate recommendations
      const recommendations = await this.generateRecommendations(config, testResults)

      return {
        success: true,
        testResults,
        recommendations
      }
    } catch (error) {
      this.progressEmitter.error(error.message)
      throw error
    }
  }

  private async setupProject(config: any, isAutonomous: boolean) {
    this.progressEmitter.update('setup', 'Setting up project structure')
    
    // Select optimal models for the task
    const models = await this.modelRegistry.getBestModelForTask('CODE_GENERATION')
    
    // Generate project structure
    const structure = await models.generateProjectStructure(config)
    
    if (!isAutonomous) {
      // In interactive mode, wait for user confirmation
      await this.progressEmitter.waitForConfirmation('Project structure ready. Continue?')
    }
    
    return structure
  }

  private async installDependencies(config: any, isAutonomous: boolean) {
    this.progressEmitter.update('dependencies', 'Installing dependencies')
    
    // Use AI to optimize dependencies
    const models = await this.modelRegistry.getBestModelForTask('OPTIMIZATION')
    const optimizedDeps = await models.optimizeDependencies(config.dependencies)
    
    if (!isAutonomous) {
      await this.progressEmitter.waitForConfirmation('Dependencies optimized. Install?')
    }
    
    // Install optimized dependencies
    await this.installOptimizedDependencies(optimizedDeps)
  }

  private async buildProjectFiles(config: any, isAutonomous: boolean) {
    this.progressEmitter.update('build', 'Building project files')
    
    const models = await this.modelRegistry.getBestModelForTask('CODE_GENERATION')
    const files = await models.generateProjectFiles(config)
    
    if (!isAutonomous) {
      await this.progressEmitter.waitForConfirmation('Files generated. Continue with build?')
    }
    
    await this.writeProjectFiles(files)
  }

  private async runTests(config: any, isAutonomous: boolean) {
    this.progressEmitter.update('test', 'Running comprehensive tests')
    
    const models = await this.modelRegistry.getBestModelForTask('TESTING')
    const tests = await models.generateTests(config)
    
    if (!isAutonomous) {
      await this.progressEmitter.waitForConfirmation('Tests generated. Run tests?')
    }
    
    return await this.executeTests(tests)
  }

  private async deployProject(config: any, isAutonomous: boolean) {
    this.progressEmitter.update('deploy', 'Deploying project')
    
    if (!isAutonomous) {
      await this.progressEmitter.waitForConfirmation('Project ready. Deploy?')
    }
    
    // Deploy to configured provider
    await this.deployToProvider(config)
  }

  private async generateRecommendations(config: any, testResults: any) {
    const models = await this.modelRegistry.getBestModelForTask('CODE_REVIEW')
    return await models.generateRecommendations({
      config,
      testResults,
      buildLogs: this.progressEmitter.getLogs()
    })
  }

  private estimateBuildTime(config: any): number {
    // Calculate estimated time based on project complexity
    const baseTime = 60000 // 1 minute base
    const complexityMultiplier = this.calculateComplexityMultiplier(config)
    return baseTime * complexityMultiplier
  }

  private calculateComplexityMultiplier(config: any): number {
    let multiplier = 1
    
    // Adjust based on project type
    if (config.type === 'full-stack') multiplier *= 2
    if (config.type === 'mobile') multiplier *= 1.5
    
    // Adjust based on features
    multiplier += (config.features?.length || 0) * 0.2
    
    // Adjust based on dependencies
    multiplier += Object.keys(config.dependencies || {}).length * 0.1
    
    return multiplier
  }
}