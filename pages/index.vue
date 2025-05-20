<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Event Management System</h1>
    <p class="mb-4">Select an organization to view its events:</p>

    <div v-if="loading" class="text-gray-500">Loading organizations...</div>

    <div v-else-if="organizations.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="org in organizations"
        :key="org.id"
        :to="`/${org.slug}/events`"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
      >
        {{ org.name }}
      </NuxtLink>
    </div>

    <div v-else class="text-red-500">No organizations available.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Organization } from '~/types/organization';
import { useApi } from '~/composables/useApi';
import { useAlertStore } from '~/stores/alert';

const organizations = ref<Organization[]>([]);
const loading = ref(true);
const { apiFetch } = useApi();
const alertStore = useAlertStore();

onMounted(async () => {
  try {
    const response = await apiFetch<Organization[]>('organizations'); // No leading slash
    organizations.value = response;
  } catch (error) {
    console.error('Error fetching organizations:', error);
    alertStore.error('Failed to load organizations. Please try again.');
  } finally {
    loading.value = false;
  }
});
</script>
