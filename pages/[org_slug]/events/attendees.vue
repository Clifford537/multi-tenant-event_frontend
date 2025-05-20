<!-- pages/[orgSlug]/events/attendees.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Event Attendees</h1>
    <AttendeeList :event-id="Number(route.params.id)" :org-slug="orgSlug" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const orgSlug = route.params.orgSlug as string;
</script>