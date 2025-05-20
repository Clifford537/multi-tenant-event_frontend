<!-- pages/admin/dashboard.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <p>Welcome, {{ authStore.user?.name }}</p>
    <NuxtLink to="/org3/events" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Manage Events
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
</script>