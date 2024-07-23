<script setup lang="ts">
defineProps<{images: string[]}>()
const slide = ref(0);
</script>

<template>
  <div>
    <q-carousel
      style="height: 40rem"
      transition-prev="slide-right"
      transition-next="slide-left"
      ref="carousel"
      swipeable
      animated
      navigation
      v-model="slide"
      infinite
    >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <div
          v-if="active"
          style="
            width: 6px;
            height: 6px;
            background-color: #000;
            border-radius: 10px;
            margin-right: 2px;
            margin-left: 2px;
          "
          @click="onClick"
        ></div>
        <div
          v-else
          style="
            width: 6px;
            height: 6px;
            background-color: #000;
            opacity: 0.15;
            border-radius: 10px;
            margin-right: 2px;
            margin-left: 2px;
          "
          @click="onClick"
        ></div>
      </template>
      <q-carousel-slide v-for="(img, i) in images" :key="img" :name="i">
        <q-img :src="img" fit="contain" />
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<style lang="scss" scoped>
:deep(.q-panel) {
  overflow-y: hidden;
}

:deep(.q-img) {
  height: 100%;
}

:deep(.q-img__image), :deep(.q-img) {
  overflow: visible;
}
</style>