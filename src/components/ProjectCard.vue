<template>
  <div class="project-card">
    <div class="project-header">
      <h3>{{ project.name }}</h3>
      <span :class="['status', project.status]">{{ project.status }}</span>
    </div>
    <p class="description">{{ project.description }}</p>
    <div class="tech-stack">
      <span v-for="tech in project.technologies" :key="tech" class="tech">
        {{ tech }}
      </span>
    </div>
    <div class="actions">
      <button @click="openProject" class="primary">Open</button>
      <button @click="deployProject" class="secondary">Deploy</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  project: {
    id: string
    name: string
    description: string
    status: string
    technologies: string[]
  }
}>()

const openProject = () => {
  // Handle project opening
}

const deployProject = () => {
  // Handle project deployment
}
</script>

<style scoped>
.project-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.project-header {
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

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tech {
  background: #f1f3f5;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

button.primary {
  background: #007bff;
  color: white;
}

button.secondary {
  background: #6c757d;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>