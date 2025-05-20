<!-- pages/[orgSlug]/events/index.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Events for {{ orgSlug }}</h1>
    <NuxtLink v-if="authStore.user" to="create" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block">
      Create Event
    </NuxtLink>
    <div v-if="events.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <EventCard v-for="event in events" :key="event.id" :event="event" :org-slug="orgSlug" />
    </div>
    <p v-else>No events available.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Event } from '~/types/event'; // Use type-only import
import { useApi } from '~/composables/useApi';
import { useAlertStore } from '~/stores/alert';
import { useAuthStore } from '~/stores/auth';

const route = useRoute();
const orgSlug = route.params.orgSlug as string;
const events = ref<Event[]>([]);
const { apiFetch } = useApi();
const alertStore = useAlertStore();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const response = await apiFetch<{ events: Event[] }>(`/${orgSlug}/events`);
    events.value = response.events;
  } catch (error) {
    alertStore.error('Failed to load events');
  }
});
</script>