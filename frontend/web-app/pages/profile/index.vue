<script setup lang="ts">
const { isMobile } = useDevice();
const route = useRoute();

// if (!isMobile && route.path === '/profile') await navigateTo('/profile/orders')
</script>

<template>
  <div v-if="!isMobile"></div>
  <view-profile-mobile v-if="isMobile" />
</template>