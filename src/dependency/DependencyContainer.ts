import { Container } from 'inversify'
import { DependencyManager } from './DependencyManager'

export class DependencyContainer {
  private static instance: DependencyContainer
  private container: Container
  private manager: DependencyManager

  private constructor() {
    this.container = new Container()
    this.manager = DependencyManager.getInstance()
    this.initializeContainer()
  }

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer()
    }
    return DependencyContainer.instance
  }

  private initializeContainer() {
    // Register core services
    this.container.bind('DependencyManager').toConstantValue(this.manager)
    
    // Set up dependency injection rules
    this.container.bind('ILogger').to(console).inSingletonScope()
    
    // Handle circular dependencies
    this.container.bind('CircularDependencyResolver').toFactory((context) => {
      return (dependency: string) => {
        return context.container.get(dependency)
      }
    })
  }

  async resolve<T>(identifier: string): Promise<T> {
    try {
      return this.container.get<T>(identifier)
    } catch (error) {
      // Attempt to lazy-load the dependency
      await this.manager.addDependency({
        name: identifier,
        version: 'latest'
      })
      
      return this.container.get<T>(identifier)
    }
  }

  register(identifier: string, implementation: any) {
    this.container.bind(identifier).toConstantValue(implementation)
  }
}