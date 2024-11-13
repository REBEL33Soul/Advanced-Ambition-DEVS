const { DependencyManager } = require('../packages/core/src/dependency/DependencyManager')
const { DependencyContainer } = require('../packages/core/src/dependency/DependencyContainer')

const manager = DependencyManager.getInstance()
const container = DependencyContainer.getInstance()

// Listen for dependency events
manager.on('dependencyError', ({ name, message }) => {
  console.error(`Dependency Error: ${name} - ${message}`)
})

manager.on('dependencyWarning', ({ name, message }) => {
  console.warn(`Dependency Warning: ${name} - ${message}`)
})

manager.on('dependencyHealed', ({ name, message }) => {
  console.log(`Dependency Healed: ${name} - ${message}`)
})

// Initialize core dependencies
async function initializeDependencies() {
  await manager.addDependency({
    name: '@nativescript/core',
    version: '~8.6.0',
    alternatives: ['@nativescript/core-vue', '@nativescript/core-react'],
    isOptional: false
  })

  await manager.addDependency({
    name: 'vite',
    version: '^4.4.9',
    alternatives: ['webpack', 'parcel'],
    fallbacks: ['./fallbacks/minimal-bundler'],
    isOptional: false
  })
}

initializeDependencies().catch(console.error)