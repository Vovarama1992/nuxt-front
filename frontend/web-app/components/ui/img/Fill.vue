<script setup lang="ts">
defineProps<{
  src: string;
}>();
</script>

<template>
  <div class="img-fill">
    <img :src="src" />
  </div>
</template>

<style scoped lang="scss">
.img-fill {
  display: flex;
  align-items: center;
  border-radius: .8rem;
  justify-content: center;
  background-color: #F3F3F3;

  img {
    width: 100%;
    display: block;
    object-fit: contain;
    object-position: 50% 50%;
    mix-blend-mode: multiply;
  }
}
</style>