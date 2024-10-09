<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
const { $api } = useNuxtApp();

const data = await $api.v1.productsControllerGetProducts({ page: 1, limit: 10 });
console.log(data.data);
</script>
