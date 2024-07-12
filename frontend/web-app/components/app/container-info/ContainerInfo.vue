<script setup lang="ts">
withDefaults(
  defineProps<{ quantity?: number; prefix?: string; }>(),
  { quantity: 0, prefix: "товаров" }
);
</script>

<template>
  <div class="container-small">
    <div>
      <slot />
    </div>

    <span class="container-small__title">{{ quantity }} {{ prefix }}</span>
  </div>
</template>

<style scoped lang="scss">
.container-small {
  height: 83px;
  display: flex;
  border-radius: 20px;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  box-shadow: 0 4px 49px 0 rgba(0, 0, 0, 0.13);
  padding: 3rem;
  
  &__title {
    font-size: 2.5rem;
  }
}
</style>