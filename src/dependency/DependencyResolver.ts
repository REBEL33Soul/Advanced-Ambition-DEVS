import { DependencyManager } from './DependencyManager'
import { MinimalBundler } from './fallbacks/minimal-bundler'
import { ModelRegistry } from '../models/registry'
import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { resolve } from 'path'

export class DependencyResolver {
  private static instance: DependencyResolver
  private manager: DependencyManager
  private modelRegistry: ModelRegistry
  private minimalBundler: MinimalBundler
  private lockfileCache: Map<string, string> = new Map()

  private constructor() {
    this.manager = DependencyManager.getInstance()
    this.modelRegistry = ModelRegistry.getInstance()
    this.minimalBundler = new MinimalBundler()
    this.initializeResolver()
  }

  static getInstance(): DependencyResolver {
    if (!DependencyResolver.instance) {
      DependencyResolver.instance = new DependencyResolver()
    }
    return DependencyResolver.instance
  }

  private initializeResolver() {
    // Monitor package.json changes
    this.watchDependencies()

    // Setup fallback strategies
    this.setupFallbacks()

    // Initialize AI-powered dependency resolution
    this.initializeAIDependencyResolution()
  }

  private watchDependencies() {
    const packageJsonPath = resolve(process.cwd(), 'package.json')
    
    try {
      const content = readFileSync(packageJsonPath, 'utf-8')
      this.lockfileCache.set(packageJsonPath, content)
      
      // Check for changes every 5 seconds
      setInterval(() => {
        const currentContent = readFileSync(packageJsonPath, 'utf-8')
        if (currentContent !== this.lockfileCache.get(packageJsonPath)) {
          this.handleDependencyChanges(currentContent)
          this.lockfileCache.set(packageJsonPath, currentContent)
        }
      }, 5000)
    } catch (error) {
      console.error('Failed to watch dependencies:', error)
    }
  }

  private async handleDependencyChanges(newContent: string) {
    try {
      const pkg = JSON.parse(newContent)
      
      // Use pnpm for better dependency management
      execSync('pnpm install --frozen-lockfile', { stdio: 'inherit' })
      
      // Verify installation
      this.verifyDependencies(pkg.dependencies || {})
    } catch (error) {
      console.error('Failed to handle dependency changes:', error)
      await this.attemptRecovery()
    }
  }

  private async verifyDependencies(dependencies: Record<string, string>) {
    for (const [name, version] of Object.entries(dependencies)) {
      try {
        require.resolve(name)
      } catch (error) {
        await this.manager.addDependency({
          name,
          version,
          alternatives: this.findAlternatives(name),
          fallbacks: this.findFallbacks(name)
        })
      }
    }
  }

  private findAlternatives(packageName: string): string[] {
    // Map of known alternatives
    const alternatives: Record<string, string[]> = {
      'vite': ['@vitejs/vite-plugin', 'webpack', 'parcel'],
      'react': ['preact', '@vue/compat'],
      'express': ['fastify', 'koa', 'hapi'],
      'typescript': ['esbuild', 'swc'],
      'webpack': ['vite', 'parcel', 'rollup']
    }
    
    return alternatives[packageName] || []
  }

  private findFallbacks(packageName: string): string[] {
    // Map of fallback implementations
    const fallbacks: Record<string, string[]> = {
      'vite': ['./fallbacks/minimal-bundler'],
      'webpack': ['./fallbacks/minimal-bundler'],
      'typescript': ['./fallbacks/js-compiler'],
      'express': ['./fallbacks/minimal-server']
    }
    
    return fallbacks[packageName] || []
  }

  private setupFallbacks() {
    // Register minimal bundler as fallback
    this.manager.on('dependencyError', async ({ name }) => {
      if (name === 'vite' || name === 'webpack') {
        await this.minimalBundler.bundle(
          resolve(process.cwd(), 'src/index.ts'),
          resolve(process.cwd(), 'dist/index.js')
        )
      }
    })
  }

  private async initializeAIDependencyResolution() {
    // Use AI to suggest optimal dependencies
    const model = await this.modelRegistry.getBestModelForTask('OPTIMIZATION', {
      minContextWindow: 16384
    })

    if (model) {
      // Setup AI-powered dependency optimization
      this.manager.on('dependencyWarning', async ({ name }) => {
        try {
          const suggestion = await model.suggest({
            type: 'dependency-optimization',
            package: name,
            context: this.getDependencyContext()
          })

          if (suggestion.alternatives) {
            await this.tryAlternatives(name, suggestion.alternatives)
          }
        } catch (error) {
          console.error('AI dependency resolution failed:', error)
        }
      })
    }
  }

  private getDependencyContext() {
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
    return {
      dependencies: pkg.dependencies || {},
      devDependencies: pkg.devDependencies || {},
      engines: pkg.engines || {},
      type: pkg.type
    }
  }

  private async tryAlternatives(packageName: string, alternatives: string[]) {
    for (const alt of alternatives) {
      try {
        execSync(`pnpm add ${alt} --save-exact`, { stdio: 'inherit' })
        console.log(`Successfully switched from ${packageName} to ${alt}`)
        return true
      } catch {
        continue
      }
    }
    return false
  }

  private async attemptRecovery() {
    try {
      // Clear cache
      execSync('pnpm store prune', { stdio: 'inherit' })
      
      // Remove node_modules
      execSync('rm -rf node_modules', { stdio: 'inherit' })
      
      // Clean install
      execSync('pnpm install --frozen-lockfile', { stdio: 'inherit' })
      
      console.log('Successfully recovered from dependency issues')
    } catch (error) {
      console.error('Recovery failed:', error)
      throw error
    }
  }
}