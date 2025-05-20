<!-- components/AttendeeList.vue -->
<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Attendees</h2>
    <div v-if="attendees.length" class="space-y-4">
      <div v-for="attendee in attendees" :key="attendee.id" class="bg-white shadow-md rounded-lg p-4">
        <p><strong>Name:</strong> {{ attendee.name }}</p>
        <p><strong>Email:</strong> {{ attendee.email }}</p>
        <p><strong>Phone:</strong> {{ attendee.phone }}</p>
      </div>
    </div>
    <p v-else>No attendees registered.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Attendee } from '~/types/attendee'; // Use type-only import
import { useApi } from '~/composables/useApi';
import { useAlertStore } from '~/stores/alert';

const props = defineProps<{
  eventId: number;
  orgSlug: string;
}>();

const attendees = ref<Attendee[]>([]);
const { apiFetch } = useApi();
const alertStore = useAlertStore();

onMounted(async () => {
  try {
    const response = await apiFetch<{ attendees: Attendee[] }>(
      `/${props.orgSlug}/events/${props.eventId}/attendees`,
    );
    attendees.value = response.attendees;
  } catch (error) {
    alertStore.error('Failed to load attendees');
  }
});
</script>