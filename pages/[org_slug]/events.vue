<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Events for {{ orgSlug }}</h1>

    <div v-if="loading" class="text-gray-500">Loading events...</div>

    <div v-else-if="events.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="event in events"
        :key="event.id"
        class="border p-4 rounded shadow hover:shadow-md transition"
      >
        <h2 class="text-xl font-semibold">{{ event.title }}</h2>
        <p class="text-gray-600">{{ event.description }}</p>
        <p class="mt-2 text-sm text-gray-500">
          📅 {{ formatDate(event.date) }} | 📍 {{ event.venue }}
        </p>
        <p class="mt-1 text-sm text-blue-600">
          💵 {{ event.price }} | 👥 Max: {{ event.max_attendees }}
        </p>
        <span class="inline-block mt-2 px-2 py-1 text-xs rounded bg-gray-200">
          Status: {{ event.status }}
        </span>
      </div>
    </div>

    <div v-else class="text-red-500">No events found for this organization.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '~/composables/useApi';
import { useAlertStore } from '~/stores/alert';

interface Event {
  id: number;
  title: string;
  description: string;
  venue: string;
  date: string;
  price: string;
  max_attendees: number;
  status: string;
}

const events = ref<Event[]>([]);
const loading = ref(true);
const route = useRoute();
const orgSlug = route.params.org_slug as string;
const { apiFetch } = useApi();
const alertStore = useAlertStore();

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

onMounted(async () => {
  try {
    const response = await apiFetch<{ data: Event[] }>(`${orgSlug}/events`);
    events.value = response.data;
  } catch (error) {
    console.error('Failed to load events:', error);
    alertStore.error('Unable to load events. Please try again.');
  } finally {
    loading.value = false;
  }
});
</script>
