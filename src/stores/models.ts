import { defineStore } from 'pinia'

export const useModelStore = defineStore('models', {
  state: () => ({
    availableModels: [],
    selectedModel: null,
    autoSelect: false,
    apiKeys: {}
  }),

  actions: {
    async fetchAvailableModels() {
      // Fetch models from API
    },

    setSelectedModel(model) {
      this.selectedModel = model
    },

    toggleAutoSelect() {
      this.autoSelect = !this.autoSelect
    },

    addApiKey(model, key) {
      this.apiKeys[model] = key
    }
  }
})