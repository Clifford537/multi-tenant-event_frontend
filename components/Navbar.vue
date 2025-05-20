<!-- components/Navbar.vue -->
<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold">Event Management</NuxtLink>
      <div class="space-x-4">
        <NuxtLink v-if="authStore.user && orgSlug" :to="`/${orgSlug}/events`">Events</NuxtLink>
        <NuxtLink v-if="!authStore.user" to="/">Organizations</NuxtLink>
        <NuxtLink v-if="authStore.user" to="/admin/dashboard">Dashboard</NuxtLink>
        <NuxtLink v-if="!authStore.user" to="/login">Login</NuxtLink>
        <NuxtLink v-if="!authStore.user" to="/register">Register</NuxtLink>
        <button v-if="authStore.user" @click="authStore.logout" class="hover:text-gray-300">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useApi } from '~/composables/useApi';
import type { Organization } from '~/types/organization';

const authStore = useAuthStore();
const { apiFetch } = useApi();
const orgSlug = ref<string>('');

onMounted(async () => {
  if (authStore.user && authStore.user.organization_id) {
    try {
      const response = await apiFetch<{ organization: Organization }>(
        `/organizations/${authStore.user.organization_id}`,
      );
      orgSlug.value = response.organization.slug;
    } catch (error) {
      console.error('Failed to fetch organization slug');
    }
  }
});
</script>