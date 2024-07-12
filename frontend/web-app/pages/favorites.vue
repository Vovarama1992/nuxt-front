<script setup lang="ts">
type Cards = {
  _id: string,
  preview: string,
  preview_compress: null,
  title: string,
  discount: 30,
  photos: string[],
  photos_compress: string[],
  status: {
      "in_stock": boolean,
      "is_sale": boolean,
      "is_new": boolean
  },
  price: 1,
}[]

const { isMobile } = useDevice();
const favorites = useFavoritesStore();
const cards = ref<Cards>([]);
provide('cards', cards);

onMounted(async () => {
  if (process.client) {
    const result = await $fetch<Cards>("http://localhost:8080/v1/products/group", {
      method: "post",
      body: {
        products_id: favorites.$state.favorites,
      },
    });

    cards.value = result;
  }
});
</script>

<template>
  <q-page v-if="!isMobile">
    <app-subheader>Избранное</app-subheader>

    <div class="page-container page-padding">
      <app-container-info
        style="margin-bottom: 2.2rem"
        :quantity="favorites.quantity"
      />

      <div
        style="
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          row-gap: 13px;
          column-gap: 17px;
        "
      >
        <app-product-card
          v-for="card in cards"
          :key="card._id"
          :_id="card._id"
          :title="card.title"
          :discount="card.discount"
          :in-stock="card.status.in_stock"
          :is-new="card.status.is_new"
          :is-sale="card.status.is_sale"
          :photos="card.photos"
          :preview="card.preview"
          :price="card.price"
        />
      </div>
    </div>
  </q-page>

  <view-favorites-mobile v-if="isMobile" />
</template>
