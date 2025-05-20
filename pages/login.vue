<!-- pages/login.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="login" class="space-y-4 max-w-md">
      <div>
        <label for="email" class="block">Email</label>
        <input v-model="form.email" type="email" id="email" class="w-full border rounded p-2" required />
      </div>
      <div>
        <label for="password" class="block">Password</label>
        <input v-model="form.password" type="password" id="password" class="w-full border rounded p-2" required />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Login
      </button>
    </form>
    <p class="mt-4">
      Don't have an account? <NuxtLink to="/register" class="text-blue-500">Register</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { LoginCredentials } from '~/types/auth'; // Use type-only import

const form = ref<LoginCredentials>({ email: '', password: '' });
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    await authStore.login(form.value);
    router.push('/admin/dashboard');
  } catch (error) {
    // Error handled by alert store
  }
};
</script>