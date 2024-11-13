<template>
  <div class="home-container">
    <h1>Welcome to Advanced Ambition DEVS</h1>
    <div class="project-actions">
      <button @click="createNewProject">Create New Project</button>
      <button @click="openExistingProject">Open Project</button>
      <button @click="importFromGithub">Import from GitHub</button>
    </div>
    <div class="recent-projects" v-if="recentProjects.length">
      <h2>Recent Projects</h2>
      <div class="project-grid">
        <project-card 
          v-for="project in recentProjects" 
          :key="project.id" 
          :project="project"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'

const recentProjects = ref([])

onMounted(async () => {
  // Load recent projects
})

const createNewProject = () => {
  // Handle new project creation
}

const openExistingProject = () => {
  // Handle opening existing project
}

const importFromGithub = () => {
  // Handle GitHub import
}
</script>

<style scoped>
.home-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-actions {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>