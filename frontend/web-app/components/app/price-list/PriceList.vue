<script setup lang="ts">
const cart = useCartStore();
const totalPrice = computed(() => cart.$state.cart.reduce((acc, el) => acc += el.price * el.quantity, 0));
const price = computed(() => cart.$state.cart.reduce((acc, el) => acc += el.price * el.quantity, 0));
const services = ref([
  {
    title: "Общая скидка",
    price: 0,
  },
  {
    title: "Доставка",
    text: "Сумма будет рассчитана во время оплаты",
  },
]);
</script>

<template>
  <div class="price-list">
    <div class="price-list__main">
      <p>{{ usePriceFormat(totalPrice).replace("&nbsp;₽", "") }} Рублей</p>
    </div>

    <div class="price-list__sub">
      <p class="price-list__title">Общая сумма заказа:</p>
      <p>{{ usePriceFormat(price).replace("&nbsp;₽", "") }} Рублей</p>
    </div>

    <template v-for="service in services" :key="service.title">
      <div
        class="price-list__sub"
        v-if="service.price || service.text"
      >
        <p class="price-list__title">{{ service.title }}:</p>
        <p v-if="service.price">
          {{ usePriceFormat(service.price).replace("&nbsp;₽", "") }} Рублей
        </p>
        <p v-if="service.text">{{ service.text }}</p>
      </div>
    </template>

    <slot />
  </div>
</template>

<style scoped lang="scss">
.price-list {
  &__main {
    padding-bottom: 2rem;
    border-bottom: 2px solid #000;

    p {
      margin-bottom: 0;
      font-weight: 500;
      font-size: 2.2rem;
    }
  }

  &__sub {
    padding: 2rem 0;
    border-bottom: 1px solid #bfbfbf;

    p {
      margin-bottom: 0;
      font-weight: 300;
      font-size: 1.4rem;
    }

    &:last-child {
      border-bottom: 0;
    }
  }

  &__title {
    font-weight: 500 !important;
    margin-bottom: 0.5rem !important;
  }
}
</style>
