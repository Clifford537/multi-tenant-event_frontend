// stores/auth.ts
import { defineStore } from 'pinia';
import type { User, LoginCredentials, RegisterCredentials } from '~/types/auth';
import { useApi } from '~/composables/useApi';
import { useAlertStore } from '~/stores/alert';
import type { StateTree } from 'pinia';

interface AuthState extends StateTree {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('alert', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(credentials: LoginCredentials) {
      const { apiFetch } = useApi();
      const alertStore = useAlertStore();
      try {
        const response = await apiFetch<{ user: User; token: string }>('auth/login', {
          method: 'POST',
          body: credentials,
        });
        this.user = response.user;
        this.token = response.token;
        alertStore.success('Logged in successfully');
      } catch (error) {
        alertStore.error('Login failed');
        throw error;
      }
    },
    async register(credentials: RegisterCredentials) {
      const { apiFetch } = useApi();
      const alertStore = useAlertStore();
      try {
        const response = await apiFetch<{ user: User; token: string }>('auth/register', {
          method: 'POST',
          body: credentials,
        });
        this.user = response.user;
        this.token = response.token;
        alertStore.success('Registered successfully');
      } catch (error) {
        alertStore.error('Registration failed');
        throw error;
      }
    },
    async logout() {
      const { apiFetch } = useApi();
      const alertStore = useAlertStore();
      try {
        await apiFetch('auth/logout', { method: 'POST' });
        this.user = null;
        this.token = null;
        alertStore.success('Logged out successfully');
      } catch (error) {
        alertStore.error('Logout failed');
      }
    },
  },
});