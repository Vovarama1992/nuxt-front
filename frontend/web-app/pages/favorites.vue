<script setup lang="ts">
type Cards = {
  _id: string,
  preview: string,
  preview_compress: string,
  title: string,
  discount: number,
  photos: string[],
  photos_compress: string[],
  status: {
    in_stock: boolean,
    is_sale: boolean,
    is_new: boolean
  },
  min_price: number,
}[]

const { isMobile } = useDevice();
const favorites = useFavoritesStore();
const cards = ref<Cards>([]);
provide('cards', cards);

const { $api } = useNuxtApp();

onMounted(async () => {
  if (import.meta.client) {
    const { data } = await $api.v1.productsControllerGetProductsGroup({
      product_id: favorites.$state.favorites
    });

    cards.value = data;
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
          :price="card.min_price"
        />
      </div>
    </div>
  </q-page>

  <view-favorites-mobile v-if="isMobile" />
</template>
