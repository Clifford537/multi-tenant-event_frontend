<!-- pages/register.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="register" class="space-y-4 max-w-md">
      <div>
        <label for="name" class="block">Name</label>
        <input v-model="form.name" type="text" id="name" class="w-full border rounded p-2" required />
      </div>
      <div>
        <label for="email" class="block">Email</label>
        <input v-model="form.email" type="email" id="email" class="w-full border rounded p-2" required />
      </div>
      <div>
        <label for="password" class="block">Password</label>
        <input v-model="form.password" type="password" id="password" class="w-full border rounded p-2" required />
      </div>
      <div>
        <label for="password_confirmation" class="block">Confirm Password</label>
        <input v-model="form.password_confirmation" type="password" id="password_confirmation" class="w-full border rounded p-2" required />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Register
      </button>
    </form>
    <p class="mt-4">
      Already have an account? <NuxtLink to="/login" class="text-blue-500">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { RegisterCredentials } from '~/types/auth'; // Use type-only import

const form = ref<RegisterCredentials>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});
const authStore = useAuthStore();
const router = useRouter();

const register = async () => {
  try {
    await authStore.register(form.value);
    router.push('/admin/dashboard');
  } catch (error) {
    // Error handled by alert store
  }
};
</script>