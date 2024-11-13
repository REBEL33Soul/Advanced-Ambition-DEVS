import { defineStore } from 'pinia'

export const useBuildStore = defineStore('build', {
  state: () => ({
    isBuilding: false,
    progress: 0,
    currentTask: '',
    estimatedTime: 0,
    startTime: null
  }),

  actions: {
    startBuild(estimatedTime: number) {
      this.isBuilding = true
      this.progress = 0
      this.estimatedTime = estimatedTime
      this.startTime = Date.now()
    },

    updateProgress(progress: number, task: string) {
      this.progress = progress
      this.currentTask = task
    },

    completeBuild() {
      this.isBuilding = false
      this.progress = 100
      this.currentTask = 'Complete'
    }
  }
})