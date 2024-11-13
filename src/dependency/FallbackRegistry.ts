export class FallbackRegistry {
  private static instance: FallbackRegistry
  private fallbacks: Map<string, any> = new Map()

  private constructor() {}

  static getInstance(): FallbackRegistry {
    if (!FallbackRegistry.instance) {
      FallbackRegistry.instance = new FallbackRegistry()
    }
    return FallbackRegistry.instance
  }

  register(packageName: string, fallbackImplementation: any) {
    this.fallbacks.set(packageName, fallbackImplementation)
  }

  getFallback(packageName: string): any {
    return this.fallbacks.get(packageName)
  }

  hasFallback(packageName: string): boolean {
    return this.fallbacks.has(packageName)
  }
}