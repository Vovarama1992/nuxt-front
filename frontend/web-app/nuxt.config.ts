// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  vite: {},
  modules: [
    "@vueuse/nuxt",
    "nuxt-quasar-ui",
    "@nuxtjs/device",
    "@pinia/nuxt",
    "@wgr-sa/nuxt-panzoom",
  ],
  panzoom: {
    addControls: false, // Add PanzoomControls component
  },
  quasar: {
    config: {
      ripple: true,
    },
    plugins: ["Notify"],
  },
});
