<!-- layouts/default.vue -->
<template>
  <div>
    <Navbar />
    <Alert />
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>