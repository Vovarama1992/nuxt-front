<script setup lang="ts">
const props = defineProps<{
  _id: string;
  title: string;
  discount: number;
  price: number;
  preview: string;
  sizeGrid: string;
  sizeValue: string;
  quantity: number;
}>();

const discountSum = ref((props.price / 100) * props.discount);
</script>

<template>
  <div class="product-card-fill">
    <div>
      <ui-img-fill style="height: 26.5rem;" :src="`http://localhost:8080/${preview}`"/>
      <p class="product-card-fill__title">
        {{ title }}
      </p>
    </div>

    <div>
      <p class="product-card-fill__size">
        {{ sizeValue }} {{ sizeGrid }} x {{ quantity }}
      </p>
  
      <q-separator style="width: 8.5rem;" />
      <p class="product-card-fill__price">{{ usePriceFormat(price - discountSum) }}</p>
      <p class="product-card-fill__price-discount" :style="discount ? '' : 'opacity: 0;'">{{ usePriceFormat(price) }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card-fill {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__title, &__size {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 171%;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  &__size {
    font-weight: 300;
    margin-top: 0;
  }

  &__price, &__price-discount {
    margin-top: 1rem;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 100%;
    margin-bottom: 0;
  }

  &__price-discount {
    color: #a7a4a4;
    font-size: 1.2rem;
    text-decoration: line-through;
  }
}
</style>