<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'profile'
});

const { $api } = useNuxtApp();
const { data: orders } = await $api.v1.orderControllerGetAll();

const count = ref(0);

for (const { status } of orders) {
  if (status == 'refund' || status =='refund_complete') {
    count.value += 1;
  }
}

const { isMobile } = useDevice();
</script>

<template>
  <template v-if="!isMobile">
    <app-container-info style="margin-bottom: 2rem;" prefix="заказов" :quantity="count">
      <span style="font-weight: 500; font-size: 2.5rem">Мои возвраты</span>
    </app-container-info>

    <template v-for="order in orders" :key="order._id">
      <app-card-order
        style="margin-bottom: 1.2rem;"
        v-for="order in orders"
        v-show="['refaund', 'completed_refaund'].includes(order.status)"
        :status="order.status"
        :trackNumbr="order.delivery_details?.tracking_code"
        :orderId="order._id"
        :previews="order.items.map((el) => el.product.preview)"
        :price="order.total_amount_promocode || order.total_amount"
        :count="order.items.length"
        :weight="order.items.reduce((acc, el) => acc += el.product.package.weight, 0) / 1000"
      />
    </template>
  </template>

  <template v-if="isMobile">
    <view-orders-mobile />
  </template>
</template>

<style scoped lang="scss">
.page {
  padding-bottom: 3rem;
  gap: 1.2rem;
  margin: auto;
  display: grid;
  width: min(1025px, 95%);
  grid-template-columns: auto 325px;

  &__container {
    border-radius: 2rem;
    padding: 2.3rem 1.8rem;
    padding-top: 3.3rem;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

.price {
  font-weight: 400;
  font-size: 2.5rem;
  margin-bottom: 0;

  &_limit {
    width: 13rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.info {
  margin-right: 2.8rem;

  &__title,
  &__value {
    font-weight: 400;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  &__value {
    font-weight: 300;
    color: #8c8c8c;
    margin-bottom: 0;
  }
}
</style>
