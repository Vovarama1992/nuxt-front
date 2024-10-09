<script setup lang="ts">
const cart = useCartStore();
const { isMobile } = useDevice();
</script>

<template>
  <q-page v-if="!isMobile">
    <app-subheader>Корзина</app-subheader>
    <div class="page-container page-padding page">
      <div style="width: 100%">
        <app-container-info
          style="margin-top: 2.2rem; margin-bottom: 1.2rem"
          :quantity="cart.quantity"
        >
          <!-- <ui-checkbox title="Выбрать все" /> -->
        </app-container-info>

        <div
          v-if="cart.quantity"
          class="container"
          style="display: flex; flex-direction: column; gap: 3rem"
        >
          <!-- <ClientOnly > -->
          <app-product-card-stroke
            v-for="item in cart.$state.cart"
            :key="item.title"
            :size-id="item.size_id"
            style="padding: 0; border: 0; min-height: 10.6rem"
            :_id="item.product_id"
            :discount="item.discount || 0"
            :preview="item.preview"
            :price="item.price"
            :size-grid="item.size_grid"
            :size-value="item.size_title"
            :title="item.title"
          />
          <!-- </ClientOnly> -->
        </div>

        <div
          class="container"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 2rem;
          "
          v-else
        >
          <p
            style="
              font-size: 2rem;
              font-weight: 400;
              line-height: 2.343rem;
              text-align: center;
              color: rgba(184, 184, 184, 1);
              margin: 0;
            "
          >
            Ваша корзина пуста
          </p>
        </div>
      </div>

      <div style="max-width: 325px; min-width: 325px; margin-top: 2.2rem">
        <div class="container">
          <app-price-list />
          <ui-btn block dark @click="navigateTo('/payment')">
            Перейти к оформлению</ui-btn
          >
        </div>
      </div>
    </div>
  </q-page>

  <view-cart-mobile v-if="isMobile" />
</template>

<style scoped lang="scss">
.page {
  gap: 1.2rem;
  display: flex;
}
</style>
