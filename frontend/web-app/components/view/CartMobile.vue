<script setup lang="ts">
const cart = useCartStore();

const totalPrice = ref(0);

</script>

<template>
  <app-subheader-mobile title="Корзина">
  </app-subheader-mobile>

  <ui-accardion-devided
    :quantity="cart.quantity"
    style="margin: 1.4rem 0"
  >
    <app-product-card-storke-mobile
      v-for="size in cart.$state.cart"
      :key="size.title"
      :size-id="size.size_id"
      style="padding: 0; border: 0; min-height: 10.6rem"
      :_id="size.product_id"
      :discount="size.discount || 0"
      :preview="size.preview"
      :price="size.price"
      :size-grid="size.size_grid"
      :size-value="size.size_title"
      :title="size.title"
    />
  </ui-accardion-devided>

  <div class="container">
    <app-price-list />
  </div>

  <app-haunting>
    <div @click="navigateTo('/payment')">
      <p
        style="
          color: #fff;
          font-size: 1.8rem;
          font-weight: 400;
          margin-bottom: 0.2rem;
        "
      >
        Перейти к оформлению
      </p>
      <p
        style="
          color: #8e8e8e;
          font-weight: 300;
          font-size: 1.4rem;
          margin-bottom: 0;
        "
      >
        {{ cart.$state.cart.reduce((acc, el) => acc += el.quantity, 0) }} товаров, {{ usePriceFormat(cart.$state.cart.reduce((acc, el) => acc += el.price * el.quantity, 0)) }}
      </p>
    </div>
  </app-haunting>
</template>
