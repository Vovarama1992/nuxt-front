<script setup lang="ts">
const text = ref("Кроссовки Adidas");
const timeout = ref<NodeJS.Timeout | null>(null);
const hasFocusStatus = ref(false);
const isFirstTime = ref(true);

const onFocused = () => {
  hasFocusStatus.value = true;

  if (isFirstTime.value) {
    text.value = "";
    isFirstTime.value = false;
  }
};

const { data, execute } = useFetch<{
  content: any[];
  props: {
    total_items: number;
    total_page: number;
  };
}>("http://localhost:8080/v1/search", {
  query: {
    text,
    page: 1,
    limit: 4,
  },
  immediate: false,
  watch: false,
});

watch(text, () => {
  if (timeout.value) clearTimeout(timeout.value);

  timeout.value = setTimeout(async function () {
    await execute();
  }, 500);
});

await execute();
</script>

<template>
    <div class="search">
      <div class="search__header page-padding">
        <div style="position: relative; width: 100%;">
          <svg
            style="
              top: 0px;
              bottom: 0;
              left: 1.2rem;
              z-index: 1;
              margin: auto;
              position: absolute;
            "
            width="2.1rem"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.9573 18.9573L23 23M21.8333 11.9502C21.8333 17.4455 17.3935 21.9004 11.9167 21.9004C6.43984 21.9004 2 17.4455 2 11.9502C2 6.45486 6.43984 2 11.9167 2C17.3935 2 21.8333 6.45486 21.8333 11.9502Z"
              stroke="black"
              stroke-width="2.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <ui-input
            class="text-field-2"
            style="width: 100%"
            v-model.trim="text"
            @focus="onFocused"
            @blur="hasFocusStatus = false"
            placeholder="Искать в каталоге"
          />
        </div>

        <div
          style="width: 8.8rem; min-width: 8.8rem"
          class="row justofy-center"
          v-if="hasFocusStatus"
        >
          <p
            @mousedown="
              navigateTo({
                path: '/search',
                query: {
                  text,
                  page: 1,
                  limit: 4,
                },
              })
            "
            style="
              width: 100%;
              margin-bottom: 0;
              font-size: 1.8rem;
              font-weight: 400;
              text-align: center;
              color: black;
            "
          >
            Найти
          </p>
        </div>
      </div>

      <div class="search__items">
        <app-product-card
          v-for="card in data?.content"
          :key="card._id"
          :_id="card._id"
          :title="card.title"
          :discount="card.discount"
          :in-stock="card.status.in_stock"
          :is-new="card.status.is_new"
          :is-sale="card.status.is_sale"
          :photos="card.photos_compress"
          :preview="card.preview_compress || card.preview"
          :price="card.price"
        />
      </div>

      <template v-if="data?.content.length">
        <p
          style="
            font-size: 1.4rem;
            font-weight: 300;
            text-align: center;
            margin-top: 2rem;
            margin-bottom: 2.5rem;
          "
        >
          Найдено {{ data?.props.total_items }} результатов
        </p>

        <div style="padding: 1.5rem 1.6rem; padding-top:0">
          <ui-btn
            block
            dark
            style="height: 7.2rem; font-size: 1.8rem"
            @click="
              navigateTo({
                path: '/search',
                query: {
                  text,
                  page: 1,
                  limit: 4,
                },
              })
            "
          >
            Показать результаты
          </ui-btn>
        </div>
      </template>

      <template v-else>
        <p
          style="
            color: rgba(184, 184, 184, 1);
            font-size: 2rem;
            font-weight: 400;
            line-height: 2.343rem;
            text-align: center;
          "
        >
          К сожалению,<br />мы ничего не нашли.
        </p>
      </template>
    </div>
</template>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgba(241, 241, 241, 1);

  &__header {
    height: 14rem;
    display: flex;
    padding: 1.6rem;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__items {
    padding: 2.2rem 1.6rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 0.3rem;
    row-gap: 1rem;
    background-color: rgba(241, 241, 241, 1);
  }
}
</style>

<style>
.text-field-2 input {
  padding-left: 4rem !important;
  font-size: 1.8rem;
  font-weight: 400;
}
</style>
