import { EventEmitter } from 'events'
import { execSync } from 'child_process'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'

interface DependencyConfig {
  name: string
  version: string
  alternatives?: string[]
  fallbacks?: string[]
  isOptional?: boolean
}

export class DependencyManager extends EventEmitter {
  private static instance: DependencyManager
  private dependencies: Map<string, DependencyConfig> = new Map()
  private healthCheckInterval: NodeJS.Timer | null = null
  private retryAttempts: Map<string, number> = new Map()
  private readonly MAX_RETRIES = 3

  private constructor() {
    super()
    this.initializeHealthCheck()
  }

  static getInstance(): DependencyManager {
    if (!DependencyManager.instance) {
      DependencyManager.instance = new DependencyManager()
    }
    return DependencyManager.instance
  }

  private initializeHealthCheck() {
    this.healthCheckInterval = setInterval(() => {
      this.checkDependencyHealth()
    }, 30000) // Check every 30 seconds
  }

  private async checkDependencyHealth() {
    for (const [name, config] of this.dependencies) {
      try {
        // Try to require the dependency
        require(name)
      } catch (error) {
        this.handleDependencyFailure(name, config, error)
      }
    }
  }

  private async handleDependencyFailure(name: string, config: DependencyConfig, error: any) {
    console.error(`Dependency failure detected for ${name}:`, error.message)
    
    const attempts = this.retryAttempts.get(name) || 0
    
    if (attempts < this.MAX_RETRIES) {
      this.retryAttempts.set(name, attempts + 1)
      
      // Try self-healing strategies
      await this.attemptSelfHeal(name, config)
    } else if (config.isOptional) {
      console.warn(`Optional dependency ${name} failed to load after ${this.MAX_RETRIES} attempts`)
      this.emit('dependencyWarning', { name, message: 'Optional dependency failed to load' })
    } else {
      this.emit('dependencyError', { name, message: 'Critical dependency failed to load' })
    }
  }

  private async attemptSelfHeal(name: string, config: DependencyConfig) {
    const strategies = [
      this.tryLocalCache.bind(this),
      this.tryAlternativeVersion.bind(this),
      this.tryAlternativePackage.bind(this),
      this.tryFallbackImplementation.bind(this)
    ]

    for (const strategy of strategies) {
      try {
        if (await strategy(name, config)) {
          this.emit('dependencyHealed', { name, message: 'Dependency restored' })
          return true
        }
      } catch (error) {
        console.error(`Healing strategy failed for ${name}:`, error)
      }
    }

    return false
  }

  private async tryLocalCache(name: string, config: DependencyConfig): Promise<boolean> {
    const cachePath = resolve(process.cwd(), 'node_modules', '.cache', name)
    try {
      if (require(cachePath)) {
        return true
      }
    } catch {
      return false
    }
    return false
  }

  private async tryAlternativeVersion(name: string, config: DependencyConfig): Promise<boolean> {
    const pkgJson = JSON.parse(readFileSync('package.json', 'utf-8'))
    const currentVersion = pkgJson.dependencies[name] || pkgJson.devDependencies[name]
    
    if (currentVersion) {
      // Try a different version
      const versions = execSync(`npm view ${name} versions --json`).toString()
      const availableVersions = JSON.parse(versions)
      
      for (const version of availableVersions.reverse()) {
        try {
          execSync(`npm install ${name}@${version} --no-save`)
          return true
        } catch {
          continue
        }
      }
    }
    
    return false
  }

  private async tryAlternativePackage(name: string, config: DependencyConfig): Promise<boolean> {
    if (config.alternatives) {
      for (const alt of config.alternatives) {
        try {
          execSync(`npm install ${alt} --no-save`)
          // Update package references
          this.updateReferences(name, alt)
          return true
        } catch {
          continue
        }
      }
    }
    return false
  }

  private async tryFallbackImplementation(name: string, config: DependencyConfig): Promise<boolean> {
    if (config.fallbacks) {
      for (const fallback of config.fallbacks) {
        try {
          const fallbackModule = require(fallback)
          // Register fallback implementation
          this.registerFallback(name, fallbackModule)
          return true
        } catch {
          continue
        }
      }
    }
    return false
  }

  private updateReferences(oldPkg: string, newPkg: string) {
    const files = this.findProjectFiles('.ts', '.js', '.tsx', '.jsx')
    
    for (const file of files) {
      try {
        const content = readFileSync(file, 'utf-8')
        const updated = content.replace(
          new RegExp(`require\\(['"]${oldPkg}['"]\\)`, 'g'),
          `require("${newPkg}")`
        ).replace(
          new RegExp(`from ['"]${oldPkg}['"]`, 'g'),
          `from "${newPkg}"`
        )
        
        writeFileSync(file, updated)
      } catch (error) {
        console.error(`Failed to update references in ${file}:`, error)
      }
    }
  }

  private findProjectFiles(...extensions: string[]): string[] {
    const projectRoot = process.cwd()
    const { globSync } = require('glob')
    
    return globSync(`${projectRoot}/**/*{${extensions.join(',')}}`, {
      ignore: ['**/node_modules/**', '**/dist/**']
    })
  }

  private registerFallback(name: string, fallbackModule: any) {
    // Register the fallback in the module cache
    require.cache[require.resolve(name)] = {
      id: name,
      filename: name,
      loaded: true,
      exports: fallbackModule
    }
  }

  async addDependency(config: DependencyConfig) {
    this.dependencies.set(config.name, config)
    this.retryAttempts.set(config.name, 0)
  }

  async removeDependency(name: string) {
    this.dependencies.delete(name)
    this.retryAttempts.delete(name)
  }
}