<template>
  <div class="model-manager">
    <div class="header">
      <h2>AI Model Management</h2>
      <div class="auto-select">
        <label>
          <input type="checkbox" v-model="autoSelect">
          Auto-select optimal models
        </label>
      </div>
    </div>

    <div class="models-grid">
      <div v-for="model in availableModels" :key="model.id" class="model-card">
        <div class="model-header">
          <h3>{{ model.name }}</h3>
          <span :class="['status', model.status]">{{ model.status }}</span>
        </div>
        <p class="description">{{ model.description }}</p>
        <div class="capabilities">
          <span v-for="cap in model.capabilities" :key="cap" class="capability">
            {{ cap }}
          </span>
        </div>
        <div class="api-key">
          <input 
            :type="showKey[model.id] ? 'text' : 'password'"
            v-model="apiKeys[model.id]"
            placeholder="Enter API Key"
          >
          <button @click="toggleKeyVisibility(model.id)">
            {{ showKey[model.id] ? 'Hide' : 'Show' }}
          </button>
        </div>
        <button 
          :class="['select-btn', { active: selectedModels.includes(model.id) }]"
          @click="toggleModel(model.id)"
        >
          {{ selectedModels.includes(model.id) ? 'Selected' : 'Select' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useModelStore } from '../stores/models'

const modelStore = useModelStore()

const autoSelect = computed({
  get: () => modelStore.autoSelect,
  set: (value) => modelStore.toggleAutoSelect()
})

const availableModels = ref([
  {
    id: 'gpt4',
    name: 'GPT-4',
    status: 'available',
    description: 'Advanced language model for complex tasks',
    capabilities: ['Code Generation', 'Analysis', 'Planning']
  },
  {
    id: 'claude',
    name: 'Claude',
    status: 'available',
    description: 'Specialized in technical documentation and analysis',
    capabilities: ['Documentation', 'Code Review', 'Optimization']
  }
])

const apiKeys = ref({})
const showKey = ref({})
const selectedModels = ref([])

const toggleKeyVisibility = (modelId: string) => {
  showKey.value[modelId] = !showKey.value[modelId]
}

const toggleModel = (modelId: string) => {
  const index = selectedModels.value.indexOf(modelId)
  if (index === -1) {
    selectedModels.value.push(modelId)
    modelStore.setSelectedModel(modelId)
  } else {
    selectedModels.value.splice(index, 1)
    modelStore.setSelectedModel(null)
  }
}
</script>

<style scoped>
.model-manager {
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.model-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.model-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
}

.status.available {
  background: #e6f4ea;
  color: #1e7e34;
}

.capabilities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.capability {
  background: #f1f3f5;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
}

.api-key {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.api-key input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.select-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.select-btn:hover {
  background: #0056b3;
}

.select-btn.active {
  background: #28a745;
}
</style>