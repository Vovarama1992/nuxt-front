<script setup lang="ts">
defineProps<{
  preview: string;
  title: string;
  price: number;
  sizeGrid: string;
  sizeTitle: string;
  discount: number;
}>();
</script>

<template>
  <div class="product-card-compact">
    <div class="product-card-compact__preview">
      <img :src="useCDN(preview)" :alt="title">
    </div>

    <div class="product-card-compact__info">
      <span class="product-card-compact__title">
        {{ title }}
      </span>
      <span class="product-card-compact__price">
        {{ usePriceFormat(price) }}
      </span>
      <!-- <span class="product-card-compact__discount">
        {{ usePriceFormat(price) }}
      </span> -->
    </div>

    <div class="product-card-compact__quantity">
      <ui-counter  />

      <div class="product-card-compact__size">
        <span>{{ sizeTitle }}</span>
        <span>{{ sizeGrid }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card-compact {
  display: flex;
  align-items: center;

  &__preview {
    width: 6.2rem;
    height: 8.8rem;

    img {
      width: 80%;
      object-fit: contain;
      object-position: 50% 50%;
      mix-blend-mode: multiply;
    }
  }

  &__info {
    span {
      font-weight: 500;
      font-size: 1.5rem;
    }
  }
}
</style>