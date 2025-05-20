
import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useAuthStore } from '~/stores/auth'; // Import from store

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  if (['/login', '/register'].includes(to.path) && authStore.user) {
    return navigateTo('/admin/dashboard');
  }
});