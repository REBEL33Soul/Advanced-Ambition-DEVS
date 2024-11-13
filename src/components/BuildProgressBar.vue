<template>
  <div class="build-progress">
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
    </div>
    <div class="progress-info">
      <span class="task">{{ currentTask }}</span>
      <span class="time">{{ remainingTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBuildStore } from '../stores/build'

const buildStore = useBuildStore()

const progress = computed(() => buildStore.progress)
const currentTask = computed(() => buildStore.currentTask)
const remainingTime = computed(() => {
  if (!buildStore.startTime) return ''
  const elapsed = Date.now() - buildStore.startTime
  const remaining = Math.max(0, buildStore.estimatedTime - elapsed)
  return `${Math.ceil(remaining / 1000)}s remaining`
})
</script>

<style scoped>
.build-progress {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 0.5rem 1rem;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}

.progress-container {
  height: 4px;
  background: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #007bff;
  transition: width 0.3s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
}
</style>