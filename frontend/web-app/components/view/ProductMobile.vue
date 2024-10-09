<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const show = ref(false);
const favorites = useFavoritesStore();
const productId = route.path.split("/").at(-1) as string;

const { $api } = useNuxtApp();
const { data } = await $api.v1.productsControllerGetProduct(productId);

const currentSize = ref<any>(data.sizes[0] || {});
const discountSum = ref((currentSize.value.price / 100) * data.discount);

const { data: cards } = await $api.v1.productsControllerGetProducts({
  page: 1,
  limit: 10,
  brand: [data.brand],
  type: [data.type]
});

const IT_SIZE_ARRAY = [ 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL' ];
const sortedSizeArray = computed(() => {
  const unrefData = unref(data);
  let sorter = (a: any, b: any) => a.title - b.title;

  if (unrefData?.size_grid === 'IT') {
    sorter = (a: any, b: any) =>
      (IT_SIZE_ARRAY.indexOf(a.title.trim()) - IT_SIZE_ARRAY.indexOf(b.title.trim()));
  }

  return [...unrefData?.sizes].sort(sorter);
});

const toggleFavorite = () => {
  if (favorites.find(productId) === -1) {
    return favorites.add(productId);
  }

  favorites.del(productId);
};
</script>

<template>
  <div>
    <div class="top-bar">
      <q-btn round flat class="bar-button back" @click="router.back()">
        <svg
          width="9"
          height="17"
          viewBox="0 0 10 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 16.6923L8.75501 8.84615L1 1"
            stroke="#D4D4D4"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </q-btn>

      <q-btn
        round
        flat
        class="bar-button favorite"
        @click="toggleFavorite"
      >
        <client-only>
          <svg
            v-if="favorites.find(productId) !== -1"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.69469 1C2.6543 1 1.00024 2.7279 1.00024 4.85938C1.00024 9.125 8.00024 14 8.00024 14C8.00024 14 15.0002 9.125 15.0002 4.85938C15.0002 2.21875 13.3462 1 11.3058 1C9.85911 1 8.60663 1.86865 8.00024 3.13391C7.39386 1.86865 6.14138 1 4.69469 1Z"
              stroke="#FF4646"
              fill="#FF4646"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            v-else
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.69469 1C2.6543 1 1.00024 2.7279 1.00024 4.85938C1.00024 9.125 8.00024 14 8.00024 14C8.00024 14 15.0002 9.125 15.0002 4.85938C15.0002 2.21875 13.3462 1 11.3058 1C9.85911 1 8.60663 1.86865 8.00024 3.13391C7.39386 1.86865 6.14138 1 4.69469 1Z"
              stroke="#D4D4D4"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        </client-only>
      </q-btn>
    </div>

    <app-carousel-product-mobile
      style="box-shadow: 0 4px 70px 0 rgba(0, 0, 0, 0.15)"
      :images="[useCDN(data.preview), ...data.photos.map((el) => useCDN(el))]"
    />

    <div class="product-info">
      <h2 class="brand">
        {{ data?.brand }}
      </h2>
      <h1 class="title">
        {{ data?.title }}
      </h1>

      <div class="price">
        <p class="main" >
          {{ usePriceFormat(currentSize.price - discountSum) }}
        </p>
        <p v-if="data.discount" class="discount">
          {{ usePriceFormat(currentSize.price) }}
        </p>
      </div>

      <div v-if="data.status.in_stock" class="in-stock">
        Экспресс-доставка
        <svg
          class="icon"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.74795 1.57181C9.80669 1.06921 9.21614 0.795046 8.91294 1.18416L1.11084 11.197C0.853401 11.5274 1.07308 12.029 1.47521 12.029H8.46272C8.74801 12.029 8.96874 12.2964 8.93336 12.5992L8.25205 18.4282C8.19331 18.9308 8.78386 19.205 9.08706 18.8158L16.8892 8.80299C17.1466 8.4726 16.9269 7.971 16.5248 7.971H9.53728C9.25199 7.971 9.03126 7.70359 9.06664 7.40084L9.74795 1.57181Z"
            fill="white"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="size-table">
        <p class="text">
          Таблица размеров {{ data?.size_grid }}
        </p>

        <div class="sizes">
          <div class="sizes__inner">
            <q-btn
              flat
              class="sizes__size"
              v-for="size in sortedSizeArray"
              :key="size._id"
              :class="{
                selected: currentSize._id === size._id,
                'not-in-stock': size.quantity === 0
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
        </div>
      </div>

      <!-- <div style="margin-top: 2.7rem">
        <p
          style="
            font-weight: 400;
            font-size: 1.8rem;
            line-height: 117%;
            text-align: center;
          "
        >
          Способ доставки
        </p>

        <div
          style="
            position: relative;
            border-radius: 1.6rem;
            border: 1px solid #d9d9d9;
            width: 100%;
            height: 9.5rem;
            background-color: #fff;
            color: black;
            text-transform: none;
            margin-top: 0px;
            padding: 0;
            cursor: pointer;
          "
          v-ripple
        >
          <div class="row justify-betweeen" style="height: 9.5rem">
            <div class="col-3 self-center">
              <svg
                style="margin-left: 3rem; width: 2.8rem; height: 2.9rem"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 28L25.7454 21.6874C26.2011 21.4424 26.429 21.32 26.5953 21.1396C26.7424 20.9801 26.8542 20.7886 26.9226 20.5789C27 20.3417 27 20.075 27 19.5416C27 16.9779 27 11.6026 27 7.79909M14 28L2.25464 21.6874C1.79889 21.4424 1.57101 21.32 1.40467 21.1396C1.25756 20.9801 1.14582 20.7886 1.07738 20.5789C1 20.3417 1 20.0738 1 19.538V7.79909M14 28C14 28 14 19.7148 14 14.4061M27 7.79909C21.9232 10.3793 19.0768 11.8259 14 14.4061M27 7.79909C24.4616 6.43481 23.0384 5.66991 20.5 4.30563M1 7.79909L12.9435 1.37998C13.3305 1.17202 13.5239 1.06804 13.7273 1.02715C13.9075 0.990948 14.0925 0.990948 14.2727 1.02715C14.4761 1.06804 14.6691 1.17177 15.0551 1.37923C16.4067 2.10569 18.7801 3.38124 20.5 4.30563M1 7.79909C1 7.79909 4.96159 9.81249 7.5 11.1026M14 14.4061C11.4616 13.116 10.0384 12.3927 7.5 11.1026M7.5 11.1026C12.5768 8.44821 15.4232 6.96001 20.5 4.30563M7.5 11.1026C7.5 12.3927 7.5 13.116 7.5 14.4061"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div class="col self-center" style="margin-left: -0.5rem">
              <p
                style="
                  font-size: 1.8rem;
                  font-weight: 400;
                  margin-bottom: 0.3rem;
                "
              >
                Способ • Стоимость
              </p>
              <p
                style="
                  font-size: 1.5rem;
                  font-weight: 300;
                  margin: 0;
                  color: #7f7f7f;
                "
              >
                Сроки доставки
              </p>
            </div>

            <div class="col-2 self-center">
              <svg
                style="margin-left: 1rem; width: 1.7rem; height: 0.9rem"
                viewBox="0 0 15 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0.999999L7.5 7L14 1"
                  stroke="#A8A8A8"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div> -->

      <app-haunting-product
        :product-id="productId"
        :current-size="currentSize"
        :data="data"
      />

      <div style="margin-top: 2rem">
        <p
          style="
            font-weight: 400;
            font-size: 1.8rem;
            text-align: center;
          "
          @click="show = !show"
        >
          Похожие товары
          <svg
            :style="show ? 'rotate: -180deg' : ''"
            style="width: 1.7rem; margin-left: 1rem; transition: rotate 0.2s"
            viewBox="0 0 19 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 1L9.5 10L1 1"
              stroke="#C2C2C2"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </p>

        <div
          v-if="show"
          style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.3rem;
            row-gap: 0.8rem;
          "
        >
          <app-product-card
            v-if="!!cards.total_items"
            v-for="card in cards.content.slice(0, 10)"
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-bar {
  background-color: #fff;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  position: relative;

  .bar-button {
    margin: 0 1.5rem;

    &.favorite svg {
      width: 2.3rem;
      height: 2.1rem
    }

    &.back svg {
      rotate: 180deg;
      position: relative;
      left: -1px;
      width: 0.9rem;
      height: 1.7rem;
    }
  }
}

.product-info {
  width: min(95%, 1025px);
  margin: auto;
  margin-bottom: 2.7rem;

  .brand {
    font-weight: 500;
    font-size: 2rem;
    line-height: 117%;
    text-align: center;
    margin: 0;
    margin-top: 2.5rem;
  }

  .title {
    font-weight: 300;
    font-size: 1.5rem;
    line-height: 117%;
    text-align: center;
    color: #7f7f7f;
    margin: 0;
    margin-top: 0.9rem;
  }

  .price {
    display: flex;
    align-items: center;
    justify-content: center;

    .main {
      font-weight: 400;
      font-size: 2.5rem;
      line-height: 117%;
      text-align: center;
      margin: 0;
      margin-top: 1.2rem;
    }

    .discount {
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 117%;
      text-align: center;
      margin: 0;
      margin-top: 1.2rem;
      color: #7f7f7f;
      margin-left: 1rem;
      opacity: 0.5;
      text-decoration: line-through;
    }
  }

  .in-stock {
    border-radius: 5rem;
    width: 23.3rem;
    height: 5.1rem;
    text-transform: none;
    background: radial-gradient(
      444.82% 306.47% at 44.52% -45.1%,
      rgb(166, 77, 255) 0%,
      rgb(42, 0, 208) 100%
    );
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    margin-top: 2.5rem;

    .icon {
      margin-left: 1rem;
      width: 1.8rem;
      height: 2rem;
    }
  }

  .size-table {
    margin-top: 2.7rem;

    .text {
      text-align: center;
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 117%;
      margin-bottom: 0;
      color: #7f7f7f;
    }

    .sizes {
      margin-top: 2rem;

      &__inner {
        display: flex;
        flex-wrap: wrap;
        flex-shrink: 0;
        /* grid-template-columns: repeat(4, 1fr); */
        gap: 0.3rem;
      }

      &__size {
        width: 100%;
        height: 4.5rem;
        border-radius: 0.8rem;
        border: 1px solid #d6d6d6;
        font-weight: 400;
        font-size: 1.8rem;
        line-height: 117%;
        color: #7f7f7f;
        background-color: white;
        transition: background-color 0.15s, border-color 0.15s;
        max-width: calc(20% - .3rem);

        &.selected {
          color: #fff;
          border-color: #000;
          background-color: #000;
        }

        &.not-in-stock {
          background-color: #e5e5e5;
        }
      }
    }
  }
}
</style>
