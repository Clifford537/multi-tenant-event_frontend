import { defineNuxtPlugin } from '#app'
import type { Pinia, Store } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia

  pinia.use(({ store }: { store: Store }) => {
    // Optional: Add custom store logic here
  })
})
