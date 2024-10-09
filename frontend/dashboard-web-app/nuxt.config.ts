// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@vueuse/nuxt',
    'nuxt-quasar-ui',
    '@3hundred/api'
  ],
  quasar: {
    plugins: [
      'Notify',
    ]
  },
  api: {
    base: 'http://localhost:8080'
  }
});