import { EventEmitter } from 'events'

interface BuildProgress {
  step: string
  message: string
  progress: number
  timeRemaining: number
}

export class BuildProgressEmitter extends EventEmitter {
  private static instance: BuildProgressEmitter
  private currentBuild: {
    steps: string[]
    currentStep: number
    startTime: number
    totalTime: number
    logs: string[]
  } | null = null

  private constructor() {
    super()
  }

  static getInstance(): BuildProgressEmitter {
    if (!BuildProgressEmitter.instance) {
      BuildProgressEmitter.instance = new BuildProgressEmitter()
    }
    return BuildProgressEmitter.instance
  }

  start({ steps, totalTime }: { steps: string[], totalTime: number }) {
    this.currentBuild = {
      steps,
      currentStep: 0,
      startTime: Date.now(),
      totalTime,
      logs: []
    }
    this.emit('start', { steps, totalTime })
  }

  update(step: string, message: string) {
    if (!this.currentBuild) return

    const stepIndex = this.currentBuild.steps.indexOf(step)
    if (stepIndex === -1) return

    this.currentBuild.currentStep = stepIndex
    this.currentBuild.logs.push(`[${step}] ${message}`)

    const progress = this.calculateProgress()
    const timeRemaining = this.calculateTimeRemaining()

    this.emit('progress', {
      step,
      message,
      progress,
      timeRemaining
    } as BuildProgress)
  }

  async waitForConfirmation(message: string): Promise<void> {
    return new Promise((resolve) => {
      this.emit('confirmation-required', { message, resolve })
    })
  }

  error(message: string) {
    this.currentBuild?.logs.push(`[ERROR] ${message}`)
    this.emit('error', { message })
  }

  getLogs(): string[] {
    return this.currentBuild?.logs || []
  }

  private calculateProgress(): number {
    if (!this.currentBuild) return 0
    return (this.currentBuild.currentStep / this.currentBuild.steps.length) * 100
  }

  private calculateTimeRemaining(): number {
    if (!this.currentBuild) return 0
    
    const elapsed = Date.now() - this.currentBuild.startTime
    const progress = this.calculateProgress()
    
    if (progress === 0) return this.currentBuild.totalTime
    
    const timePerPercent = elapsed / progress
    const remaining = (100 - progress) * timePerPercent
    
    return Math.max(0, remaining)
  }
}