<script setup lang="ts">
const route = useRoute();
const cart = useCartStore();
const favorites = useFavoritesStore();
const productId = route.path.split("/").at(-1) as string;

const { data, pending, error, refresh } = await useFetch<any>(
  `http://localhost:8080/v1/products/${productId}`
);

const currentSize = ref(
  data.value?.sizes.sort((a: any, b: any) => a.price - b.price)[0] || {}
);

const discountSum = ref((currentSize.value.price / 100) * data.value.discount);

const cards = await useFetch<any>(
  `http://localhost:8080/v1/products/page/1?brand=${data.value.brand}&type=${data.value.type}`
);
const {isMobile} = useDevice();
</script>

<template>
  <q-page v-if="!isMobile">
    <div class="page-container page-padding">
      <div class="grid">
        <app-carousel-product :images="[data.preview, ...data.photos]" />

        <div>
          <div class="page__container block" style="width: 344px;">
            <q-btn
              round
              flat
              style="position: absolute; top: 1rem; right: 1rem"
              @click="favorites.find(productId) === -1 ? favorites.add(productId) : favorites.del(productId)"
            >
              <client-only>
                <svg
                  v-if="favorites.find(productId) === -1"
                  style="width: 1.6rem; height: 1.5rem"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.69444 1C2.65406 1 1 2.7279 1 4.85938C1 9.125 8 14 8 14C8 14 15 9.125 15 4.85938C15 2.21875 13.3459 1 11.3056 1C9.85886 1 8.60639 1.86865 8 3.13391C7.39361 1.86865 6.14114 1 4.69444 1Z"
                    stroke="#D4D4D4"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>

                <svg
                  v-else
                  style="width: 1.6rem; height: 1.5rem"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.69444 1C2.65406 1 1 2.7279 1 4.85938C1 9.125 8 14 8 14C8 14 15 9.125 15 4.85938C15 2.21875 13.3459 1 11.3056 1C9.85886 1 8.60639 1.86865 8 3.13391C7.39361 1.86865 6.14114 1 4.69444 1Z"
                    stroke="#FF4646"
                    fill="#FF4646"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
              </client-only>
            </q-btn>
            <h2 class="brand">{{ data.brand }}</h2>
            <h1 class="name">{{ data.title }}</h1>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
              "
            >
              <span class="price">{{
                usePriceFormat(currentSize.price - discountSum)
              }}</span>
              <span v-if="data.discount" class="discount">{{
                usePriceFormat(currentSize.price)
              }}</span>
            </div>

            <div class="sizes">
              <p class="sizes__title">Размерная сетка EU</p>

              <div
                style="
                  display: flex;
                  flex-wrap: wrap;
                  flex-shrink: 0;
                  gap: 0.3rem;
                "
              >
                <q-btn
                  flat
                  class="sizes__size"
                  style="max-width: calc(20% - .3rem);min-width: calc(20% - .3rem)"
                  v-for="size in data?.sizes.sort((a: any, b: any) => a.title - b.title)"
                  :key="size._id"
                  :style="size.quantity === 0 ? 'background-color: #e5e5e5':''"
                  :class="{
                    sizes__size_select: currentSize._id === size._id,
                  }"
                  @click="
                    () => {
                      currentSize = size;
                    }
                  "
                >
                  {{ size.title }}
                </q-btn>
              </div>

              <client-only>
                <ui-btn
                  dark
                  block
                  style="margin-top: 2.3rem"
                  v-if="!cart.quantityById(productId, currentSize._id)"
                  @click="() => {
                    if (cart.quantityById(productId, currentSize._id) >= currentSize.quantity) return;

                    cart.add({
                      price: currentSize.price,
                      product_id: productId,
                      size_grid: data.size_grid,
                      size_id: currentSize._id,
                      size_title: currentSize.title,
                      preview: data.preview,
                      title: data.title,
                    })
                  }"
                >
                  Добавить в корзину
                </ui-btn>

                <div v-else class="plus-btn" style="margin-top: 2.3rem">
                  <q-btn
                    class="plus-btn__btn"
                    flat
                    @click="() => cart.del(productId, currentSize._id)"
                    >
                    <span
                      style="position: relative; top: -0.1rem"
                    >
                      -
                    </span
                    ></q-btn
                  >
                  <span class="plus-btn__text">
                    {{ cart.quantityById(productId, currentSize._id) }} шт. в корзине
                  </span>
                  <q-btn
                    class="plus-btn__btn"
                    flat
                    @click="() => {
                    if (cart.quantityById(productId, currentSize._id) >= currentSize.quantity) return;

                    cart.add({
                      price: currentSize.price,
                      product_id: productId,
                      size_grid: data.size_grid,
                      size_id: currentSize._id,
                      size_title: currentSize.title,
                      preview: data.preview,
                      title: data.title,
                    })
                  }"
                  >
                    +
                  </q-btn
                  >
                </div>
              </client-only>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 6.3rem">
        <span style="font-weight: 400; font-size: 2rem">Похожие товары</span>

        <div
          style="
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            column-gap: 0.8rem;
            row-gap: 1.3rem;
            margin-top: 3rem;
          "
        >
          <app-product-card
            v-if="cards.data.value[0].data"
            v-for="card in cards.data.value[0].data.slice(0, 10)"
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
        <div style="display: flex; gap: .8rem; margin-top: 2.4rem;">
          <ui-btn
            block
            style="
              width: 100%;
              height: 7rem;
              border-radius: 1.6rem;
              background-color: #fff;
              font-size: 1.5rem;
            "
            @click="navigateTo('/catalog?type='+data.type)"
          >
            <svg style="width: .8rem; margin-right: 2rem;" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.24" d="M7 1L1 7L7 13" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Перейти в {{ data.type }}
          </ui-btn>
          <ui-btn
            block
            style="
              width: 100%;
              height: 7rem;
              border-radius: 1.6rem;
              background-color: #fff;
              font-size: 1.5rem;
            "
            @click="navigateTo('/catalog?brand='+data.brand)"
          >
          Больше от {{ data.brand }}
          <svg style="width: .8rem; margin-left: 2rem; rotate: 180deg;" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.24" d="M7 1L1 7L7 13" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </ui-btn>
        </div>
      </div>
    </div>
  </q-page>

  <view-product-mobile v-if="isMobile"/>
</template>

<style scoped lang="scss">
.grid {
  gap: 1.8rem;
  display: flex;
}

.page {
  padding-top: 2.1rem;
  padding-bottom: 3rem;
  margin: auto;
  width: min(1025px, 95%);

  &__container {
    border-radius: 2rem;
    padding: 2.3rem 1.8rem;
    background-color: #fff;
    border: 1px solid #e5e5e5;
  }
}

.block {
  text-align: center;
  position: relative;
}

.brand,
.price {
  font-weight: 500;
  font-size: 2rem;
  line-height: 117%;
  margin: 0;
  margin-bottom: 0.8rem;
}

.name {
  line-height: 117%;
  font-weight: 300;
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 1.2rem;
}

.price {
  margin-bottom: 0.2rem;
}

.discount {
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 117%;
  text-decoration: line-through;
  color: #7f7f7f;
  opacity: 0.5;
}

.sizes {
  margin-top: 2.5rem;

  &__title {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 117%;
    text-align: center;
    color: #7f7f7f;
  }

  &__size {
    height: 3.3rem;
    border-radius: 0.8rem;
    border: 1px solid #d6d6d6;
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 117%;
    transition: background-color 0.15s, border-color 0.15s;

    &_select {
      color: #fff;
      border-color: #000;
      background-color: #000;
    }
  }
}

.plus-btn {
  width: 100%;
  height: 6.1rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(120, 120, 120, 1);

  &__btn {
    width: 7rem;
    height: 100%;
    font-weight: 200;
    font-size: 3.6rem;
    padding: 0;
    color: rgba(255, 255, 255, 0.5);
  }

  &__text {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 117%;
    color: #fff;
  }
}
</style>
