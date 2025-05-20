<!-- components/Alert.vue -->
<template>
  <div v-if="alertStore.message" :class="{
    'bg-green-100 border-green-400 text-green-700': alertStore.type === 'success',
    'bg-red-100 border-red-400 text-red-700': alertStore.type === 'error',
  }" class="border px-4 py-3 rounded relative mb-4" role="alert">
    <span class="block sm:inline">{{ alertStore.message }}</span>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from '~/stores/alert';
const alertStore = useAlertStore();
</script>