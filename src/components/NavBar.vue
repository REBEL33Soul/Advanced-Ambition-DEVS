<template>
  <nav class="navbar">
    <div class="nav-brand">
      <router-link to="/">Advanced Ambition DEVS</router-link>
    </div>
    <div class="nav-items">
      <router-link to="/models">Models</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/settings">Settings</router-link>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-brand a {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
}

.nav-items {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-items a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-items a:hover {
  color: #007bff;
}

.logout-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #dc3545;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #c82333;
}
</style>