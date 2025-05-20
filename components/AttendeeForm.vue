<!-- components/AttendeeForm.vue -->
<template>
  <form @submit.prevent="submit" class="space-y-4">
    <div>
      <label for="name" class="block">Name</label>
      <input v-model="form.name" type="text" id="name" class="w-full border rounded p-2" required />
    </div>
    <div>
      <label for="email" class="block">Email</label>
      <input v-model="form.email" type="email" id="email" class="w-full border rounded p-2" required />
    </div>
    <div>
      <label for="phone" class="block">Phone</label>
      <input v-model="form.phone" type="tel" id="phone" class="w-full border rounded p-2" required />
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Register
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '~/composables/useApi';
import { useAlertStore } from '~/stores/alert';

const props = defineProps<{
  eventId: number;
  orgSlug: string;
}>();

const form = ref({
  name: '',
  email: '',
  phone: '',
});

const { apiFetch } = useApi();
const alertStore = useAlertStore();

const submit = async () => {
  try {
    await apiFetch(`/${props.orgSlug}/events/${props.eventId}/attendees`, {
      method: 'POST',
      body: form.value,
    });
    alertStore.success('Registered successfully');
    form.value = { name: '', email: '', phone: '' };
  } catch (error) {
    alertStore.error('Failed to register');
  }
};
</script>