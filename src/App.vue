<template>
  <div class="app-container">
    <nav-bar v-if="isAuthenticated" />
    <router-view />
    <build-progress-bar v-if="isBuilding" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'
import { useBuildStore } from './stores/build'
import NavBar from './components/NavBar.vue'
import BuildProgressBar from './components/BuildProgressBar.vue'

const authStore = useAuthStore()
const buildStore = useBuildStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isBuilding = computed(() => buildStore.isBuilding)
</script>

<style>
.app-container {
  min-height: 100vh;
  background: #f8f9fa;
}
</style>