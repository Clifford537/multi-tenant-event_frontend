// composables/useApi.ts
import { useAuthStore } from '~/stores/auth';

export const useApi = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const apiFetch = async <T>(
    endpoint: string,
    options: Parameters<typeof useFetch>[1] = {},
  ): Promise<T> => {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(options.headers ? Object.fromEntries(Object.entries(options.headers).filter(([_, v]) => typeof v === 'string')) : {}),
    };

    if (authStore.token) {
      headers.Authorization = `Bearer ${authStore.token}`;
    }

    const response = await useFetch(`${config.public.apiBase}/${endpoint}`, {
      ...options,
      headers,
    });

    if (response.error.value) {
      throw new Error(response.error.value.message);
    }

    return response.data.value as T;
  };

  return { apiFetch };
};