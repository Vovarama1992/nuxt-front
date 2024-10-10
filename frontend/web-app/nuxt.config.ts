// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false
  },

  api: {
    base: 'http://localhost:8080'
  },

  alias: {
    '@3hundred/api': '/home/project/mobile-client/frontend/api/src'
  },

  modules: [
    "@vueuse/nuxt",
    "nuxt-quasar-ui",
    "@nuxtjs/device",
    "@wgr-sa/nuxt-panzoom",
    "@pinia/nuxt",
    "@3hundred/api"
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

  compatibilityDate: "2024-07-15"
});
