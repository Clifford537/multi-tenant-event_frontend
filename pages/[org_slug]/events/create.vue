<!-- pages/[orgSlug]/events/create.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Create Event</h1>
    <EventForm :org-slug="orgSlug" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const orgSlug = route.params.orgSlug as string;
</script>