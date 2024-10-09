export default defineNuxtConfig({
  modules: ['../src/module'],
  api: {
    base: 'http://localhost:8080'
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-08-08',
})
