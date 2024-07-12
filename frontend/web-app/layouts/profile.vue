<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const { isMobile } = useDevice();
</script>

<template>
  <q-layout view="hhh Lpr lff">
  <app-header />
  
  <q-page-container>
    <view-profile v-if="!isMobile">
      <slot />
    </view-profile>

    <template v-if="isMobile">
      <slot />
    </template>
  </q-page-container>

  <app-footer />
  </q-layout>
</template>