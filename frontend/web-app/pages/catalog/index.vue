<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';

const route = useRoute();
const router = useRouter();

interface Product {
  data: {
    _id: string;
    preview: string;
    preview_compress: string;
    title: string;
    discount: number;
    photos: string[];
    photos_compress: string[];
    status: {
      in_stock: boolean;
      is_sale: boolean;
      is_new: boolean;
      price: boolean;
    };
    price: number;
  }[];
  total_count: {
    count: number;
  }[];
};

interface Filter {
  _id: string,
  count: number
}

interface Filters {
  brands: Filter[];
  types: Filter[];
  sizes: Filter[];
  price: { min: number, max: number };
}

const priceOuterRange = ref({ min: 1000, max: 250000 });

const normalizeQuery = (value: LocationQueryValue | LocationQueryValue[]): string[] => {
  if (Array.isArray(value)) return value as string[];
  if (value === null || value === undefined) return [];
  return [ value ];
}

const typeFilters = ref<string[]>(normalizeQuery(route.query.type));
const brandFilters = ref<string[]>(normalizeQuery(route.query.brand));
const sizeFilters = ref<string[]>(normalizeQuery(route.query.sizes));

// can't use references defined directly, otherwise we would be fetching stuff two times
const fetchOptions = computed(() =>
  ({
    limit: 30,
    page: Number(route.query.page || '1'),
    q: String(route.query.q || ''),
    min_price: route.query.min_price !== undefined ? Number(route.query.min_price) : undefined,
    max_price: route.query.max_price !== undefined ? Number(route.query.max_price) : undefined,
    type: normalizeQuery(route.query.type),
    brand: normalizeQuery(route.query.brand),
    sizes: normalizeQuery(route.query.sizes)
  })
);

const { $api } = useNuxtApp();
const { data } = await useAsyncData(
  async () =>
    (await $api.v1.productsControllerGetProducts(unref(fetchOptions))).data,
  { watch: [fetchOptions] }
);
const { data: filters } = await useAsyncData(
  async () =>
    (await $api.v1.productsControllerGetFilters(unref(fetchOptions))).data,
  { watch: [fetchOptions] }
);

const unrefFilters = unref(filters);
if (unrefFilters)
  priceOuterRange.value = unrefFilters.price;
const priceRange = ref({
  min: !route.query.min_price || isNaN(+route.query.min_price) ?
    unref(priceOuterRange).min :
    +route.query.min_price,

  max: !route.query.max_price || isNaN(+route.query.max_price) ?
    unref(priceOuterRange).max :
    +route.query.max_price
});

watch([typeFilters, brandFilters, priceRange, sizeFilters], async (old, newV) => {
  const q: any = { page: 1 };
  cards.value = [];

  q.type = typeFilters.value;
  q.brand = brandFilters.value;
  q.sizes = sizeFilters.value;

  const { min, max } = unref(priceRange);
  q.min_price = min;
  q.max_price = max;

  await router.push({
    path: route.fullPath,
    query: q,
  });
});

const sizes = ref<Filter[]>([]);

const IT_SIZE_ARRAY = [ "XS", "S", "M", "L", "XL", "XXL", "XXXL" ];
const setFilters = (data: any) => {
  if (!data) return;

  priceOuterRange.value = data.price;

  sizes.value = [...data.sizes].sort((a, b) => {
    if (IT_SIZE_ARRAY.includes(a._id.trim()) && IT_SIZE_ARRAY.includes(b._id.trim()))
      return IT_SIZE_ARRAY.indexOf(a._id.trim()) - IT_SIZE_ARRAY.indexOf(b._id.trim())
    else
      return +a._id - +b._id;
  });
};

if (unrefFilters)
  setFilters(unrefFilters);
watch(filters, setFilters);

watch(data, () => {
  const response = unref(data);
  if (response)
    cards.value = [...cards.value, ...response.content];
});

const filterDialog = ref(false);

const cards = ref<
  {
    _id: string;
    preview: string;
    preview_compress: string;
    title: string;
    discount: number;
    photos: string[];
    photos_compress: string[];
    status: {
      in_stock: boolean;
      is_sale: boolean;
      is_new: boolean;
      is_hidden: boolean;
    };
    min_price: number;
  }[]
>(data.value ? data.value.content : []);
</script>

<template>
  <q-page>
    <app-subheader class="a">
      {{ route.query.name?.toString() || "Каталог" }}
    </app-subheader>

    <div
      class="b"
      style="
        background-color: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding-top: 2rem;
      "
    >
      <p
        style="
          font-size: 3rem;
          font-weight: 500;
          line-height: 3.514rem;
          margin-bottom: 2rem;
          text-align: center;
        "
      >
        {{ route.query.name?.toString() || "Каталог" }}
      </p>

      <div style="display: flex; padding: 16px; padding-top: 0; gap: 0.9rem">
        <q-btn
          flat
          @click="filterDialog = !filterDialog"
          style="
            text-transform: none;
            width: 100%;
            height: 5.8rem;
            border: 1px solid #d6d6d6;
            border-radius: 0.8rem;
            font-weight: 400;
            font-size: 1.2rem;
          "
        >
          Фильтр
          <svg
            style="width: 1.6rem; height: 1.4rem; margin-left: 1rem"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 7L8 10L1 7M15 10L8 13L1 10M15 4L8 7L1 4L8 1L15 4Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </q-btn>
      </div>
    </div>

    <div class="page-container page-padding page">
      <div class="filters">
        <p
          style="
            font-size: 2.5rem;
            font-weight: 500;
            line-height: 2.929rem;
            text-align: left;
          "
        >
          Фильтр
        </p>

        <app-modal-filter v-model="filterDialog">
          <app-filter-range-block
            title="Цена"
            v-model="priceRange"
            :min="priceOuterRange.min"
            :max="priceOuterRange.max"
          />

          <app-filter-block
            title="Тип"
            v-model="typeFilters"
            :filters="filters?.types || []"
          />

          <app-filter-block
            title="Бренд"
            v-model="brandFilters"
            :filters="filters?.brands || []"
          />

          <app-filter-block
            v-if="typeFilters.length !== 0"
            title="Размер"
            v-model="sizeFilters"
            :filters="sizes"
          />
        </app-modal-filter>
      </div>

      <div class="full-flex">
        <div
          class="ceneter"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2.3rem;
          "
        >
          <span
            >Найдено
            {{
              data
                ? usePriceFormat(data.total_items || 0).split(
                    ","
                  )[0]
                : 0
            }}
            предмета</span
          >

          <!-- <ui-btn-small-light style="background: #e2e2e2; opacity: 0.44">
            Сортировка
            <svg
              style="width: 2.4rem; margin-left: 1rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7H18"
                stroke="#4F4F4F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 11H14"
                stroke="#4F4F4F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 15H10"
                stroke="#4F4F4F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </ui-btn-small-light> -->
        </div>

        <div class="catalog-place" v-if="data">
          <template v-if="data">
            <app-product-card
              v-for="card in cards"
              :key="card._id"
              :_id="card._id"
              :title="card.title"
              :discount="card.discount"
              :in-stock="card.status.in_stock"
              :is-new="card.status.is_new"
              :is-sale="card.status.is_sale"
              :photos="card.photos_compress || card.photos"
              :preview="card.preview_compress || card.preview"
              :price="card.min_price"
            />
          </template>
        </div>

        <template v-else>
          <div class="loader">
            <q-spinner color="black" size="5em" />
          </div>
        </template>

        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1.6rem;
          "
        >
          <ui-btn
            dark
            block
            class="btn-next"
            style="max-width: 22.4rem"
            @click="
              () =>
                router.push({
                  path: route.fullPath,
                  query: {
                    ...route.query,
                    page: parseInt(route.query.page?.toString() || '1') + 1,
                  },
                })
            "
            v-if="
              parseInt(route.query.page?.toString() || '1') <
              Math.ceil((data ? data.total_items || 0 : 0) / 40)
            "
          >
            Показать еще
            <svg
              style="width: 1.5rem; margin-left: 1.5rem"
              viewBox="0 0 17 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.17147 1.05859L8.29228 8.1794L15.4131 1.05859"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </ui-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.filters {
  width: 18.2rem;
  position: relative;
}

.full-flex {
  flex: 1;
}

.loader {
  width: 100%;
  height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page {
  gap: 4.3rem;
  display: flex;
}

.option {
  margin-top: 2.2rem;

  &__title {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.406rem;
    text-align: left;
  }
}

.catalog-place {
  display: grid;
  column-gap: 1.1rem;
  row-gap: 1.6rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

@media (max-width: 960px) {
  .catalog-place {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.b {
  display: none;
}

@media (max-width: 720px) {
  .ceneter {
    justify-content: center!important;
  }

  .a {
    display: none;
  }
  .b {
    display: block;
  }
  .catalog-place {
    grid-template-columns: 1fr 1fr;
  }
  .btn-next {
    max-width: 100% !important;
  }
}

@media (max-width: 530px) {
  .catalog-place {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .filters {
    display: none;
  }
}

@media (max-width: 430px) {
  .catalog-place {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
