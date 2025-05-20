<!-- components/EventCard.vue -->
<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-xl font-bold">{{ event.title }}</h2>
    <p>{{ event.description }}</p>
    <p><strong>Venue:</strong> {{ event.venue }}</p>
    <p><strong>Date:</strong> {{ new Date(event.date).toLocaleString() }}</p>
    <p><strong>Price:</strong> ${{ event.price }}</p>
    <p><strong>Max Attendees:</strong> {{ event.max_attendees }}</p>
    <p><strong>Status:</strong> {{ event.status }}</p>
    <div class="mt-4 space-x-2">
      <NuxtLink :to="`/${orgSlug}/events/${event.id}`" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Register
      </NuxtLink>
      <NuxtLink v-if="authStore.user" :to="`/${orgSlug}/events/${event.id}?edit=true`" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        Edit
      </NuxtLink>
      <button v-if="authStore.user" @click="deleteEvent" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Delete
      </button>
      <NuxtLink v-if="authStore.user" :to="`/${orgSlug}/events/${event.id}/attendees`" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Attendees
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types/event'; // Use type-only import
import { useAuthStore } from '~/stores/auth';
import { useApi } from '~/composables/useApi';
import { useAlertStore } from '~/stores/alert';

const props = defineProps<{
  event: Event;
  orgSlug: string;
}>();

const authStore = useAuthStore();
const { apiFetch } = useApi();
const alertStore = useAlertStore();
const router = useRouter();

const deleteEvent = async () => {
  if (confirm('Are you sure you want to delete this event?')) {
    try {
      await apiFetch(`/${props.orgSlug}/events/${props.event.id}`, { method: 'DELETE' });
      alertStore.success('Event deleted successfully');
      router.push(`/${props.orgSlug}/events`);
    } catch (error) {
      alertStore.error('Failed to delete event');
    }
  }
};
</script>