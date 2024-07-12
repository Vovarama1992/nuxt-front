<script setup lang="ts">
type Cards = {
  _id: string;
  preview: string;
  preview_compress: null;
  title: string;
  discount: 30;
  photos: string[];
  photos_compress: string[];
  status: {
    in_stock: boolean;
    is_sale: boolean;
    is_new: boolean;
  };
  price: 1;
}[];
const cards = inject<Cards[]>("cards");
</script>

<template>
  <app-subheader-mobile title="Избранное">
    <q-btn @click="cards?.reverse()" flat>
      <svg
        style="width: 2.5rem; height: 1.7rem"
        viewBox="0 0 29 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.46875 19V2M7.46875 2L12.9375 7.40909M7.46875 2L2 7.40909M21.5312 2V19M21.5312 19L27 13.5909M21.5312 19L16.0625 13.5909"
          stroke="#BEBEBE"
          stroke-width="2.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </q-btn>
  </app-subheader-mobile>

  <ui-accardion-devided
    :quantity="cards?.length"
    style="margin: 1.6rem 0"
    static
  >
    <div
      style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.3rem;
        row-gap: 0.8rem;
        padding: 0 0.8rem;
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
  </ui-accardion-devided>
</template>
