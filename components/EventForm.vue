<!-- components/EventForm.vue -->
<template>
  <form @submit.prevent="submit" class="space-y-4">
    <div>
      <label for="title" class="block">Title</label>
      <input v-model="form.title" type="text" id="title" class="w-full border rounded p-2" required />
    </div>
    <div>
      <label for="description" class="block">Description</label>
      <textarea v-model="form.description" id="description" class="w-full border rounded p-2"></textarea>
    </div>
    <div>
      <label for="venue" class="block">Venue</label>
      <input v-model="form.venue" type="text" id="venue" class="w-full border rounded p-2" required />
    </div>
    <div>
      <label for="date" class="block">Date</label>
      <input v-model="form.date" type="datetime-local" id="date" class="w-full border rounded p-2" required />
    </div>
    <div>
      <label for="price" class="block">Price</label>
      <input v-model="form.price" type="number" step="0.01" id="price" class="w-full border rounded p-2" />
    </div>
    <div>
      <label for="max_attendees" class="block">Max Attendees</label>
      <input v-model="form.max_attendees" type="number" id="max_attendees" class="w-full border rounded p-2" required />
    </div>
    <div>
      <label for="status" class="block">Status</label>
      <select v-model="form.status" id="status" class="w-full border rounded p-2">
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      {{ isEdit ? 'Update Event' : 'Create Event' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Event } from '~/types/event'; // Use type-only import
import { useApi } from '~/composables/useApi';
import { useAlertStore } from '~/stores/alert';

const props = defineProps<{
  event?: Event;
  orgSlug: string;
}>();

const isEdit = computed(() => !!props.event);

const form = ref({
  title: props.event?.title || '',
  description: props.event?.description || '',
  venue: props.event?.venue || '',
  date: props.event?.date ? new Date(props.event.date).toISOString().slice(0, 16) : '',
  price: props.event?.price || '0.00',
  max_attendees: props.event?.max_attendees || 100,
  status: props.event?.status || 'draft',
});

const { apiFetch } = useApi();
const alertStore = useAlertStore();
const router = useRouter();

const submit = async () => {
  try {
    const endpoint = isEdit.value
      ? `/${props.orgSlug}/events/${props.event!.id}`
      : `/${props.orgSlug}/events`;
    const method = isEdit.value ? 'PUT' : 'POST';

    await apiFetch(endpoint, {
      method,
      body: form.value,
    });

    alertStore.success(isEdit.value ? 'Event updated successfully' : 'Event created successfully');
    router.push(`/${props.orgSlug}/events`);
  } catch (error) {
    alertStore.error(isEdit.value ? 'Failed to update event' : 'Failed to create event');
  }
};
</script>