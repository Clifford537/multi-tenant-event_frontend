// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useAuthStore } from '~/stores/auth'; // Import from store

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const protectedRoutes = ['/admin/dashboard', '/org3/events/create', '/org3/events/\\d+/edit', '/org3/events/\\d+/attendees'];

  if (protectedRoutes.some((route) => new RegExp(route).test(to.path)) && !authStore.user) {
    return navigateTo('/login');
  }
});