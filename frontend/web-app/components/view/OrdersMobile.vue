<script setup lang="ts">
const { $api } = useNuxtApp();
const { data: orders } = await $api.v1.orderControllerGetAll();
</script>

<template>
  <app-subheader-mobile title="Мои заказы" />
  <q-page class="page-padding">
    <app-card-order
      style="margin-bottom: 1.2rem;"
      v-for="order in orders"
      :key="order._id"
      :status="order.status"
      :trackNumbr="(order.delivery_details as any).trak_number"
      :orderId="order._id"
      :previews="order.items.map((el) => el.product.preview)"
      :price="order.total_amount_promocode || order.total_amount"
      :count="order.items.length"
      :weight="order.items.reduce((acc, el) => acc += el.product.package.weight, 0) / 1000"
    />
  </q-page>
</template>
