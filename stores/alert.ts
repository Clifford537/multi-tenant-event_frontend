// stores/alert.ts
import { defineStore } from 'pinia';
import type { StateTree } from 'pinia';

interface AlertState extends StateTree {
  message: string;
  type: 'success' | 'error' | '';
}

export const useAlertStore = defineStore('alert', {
  state: (): AlertState => ({
    message: '',
    type: '',
  }),
  actions: {
    success(message: string) {
      this.message = message;
      this.type = 'success';
      setTimeout(() => this.clear(), 3000);
    },
    error(message: string) {
      this.message = message;
      this.type = 'error';
      setTimeout(() => this.clear(), 3000);
    },
    clear() {
      this.message = '';
      this.type = '';
    },
  },
});