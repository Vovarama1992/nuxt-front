<script setup lang="ts">
const route = useRoute();
const text = ref(route.query.text || "");

const { data, execute } = useFetch<{
  content: any[];
  props: {
    total_items: number;
    total_page: number;
  };
}>("http://localhost:8080/v1/search", {
  query: {
    text,
    page: computed(() => route.query.page),
    limit: 40,
  },
  immediate: false,
  watch: false,
});

const cards = ref([]);

watch(computed(() => route.query), async function (newV, old) {
  if (parseInt(String(old.page) || "1") < parseInt(String(newV.page) || "1")) {
    await execute();
    console.log(cards.value);
    console.log(data.value?.content);
    cards.value = [...(cards.value as []), ...(data.value?.content as [])];
  }
});

await execute();
cards.value = data.value?.content as [];
</script>

<template>
  <q-page>
    <div class="search__header">
      <p style="margin-bottom: 1rem; font-size: 1.2rem">Результаты поиска:</p>
      <p style="margin-bottom: 0; font-weight: 500">{{ route.query.text }}</p>
    </div>

    <div class="page-container page-padding search">
      <p
        style="
          font-size: 1.4rem;
          font-weight: 300;
          text-align: center;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        "
      >
        Найдено {{ data?.props.total_items }} результатов
      </p>

      <!-- <div class="search__categories">
          <ui-accardion style="border-top: 0; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
            <template #title>Sale</template>
          </ui-accardion>
        </div> -->

      <div class="search__items">
        <app-product-card
          v-for="card in cards"
          :key="card._id"
          :_id="card._id"
          :title="card.title"
          :discount="card.discount"
          :in-stock="card.status?.in_stock"
          :is-new="card.status?.is_new"
          :is-sale="card.status?.is_sale"
          :photos="card.photos_compress"
          :preview="card.preview_compress || card.preview"
          :price="card.price"
        />
      </div>

      <template
        v-if="
          parseInt(String(route.query.page) || '1') <
          parseInt(String(data?.props.total_page) || '1')
        "
      >
        <div
          style="
            width: min(1025px, 95%);
            margin: auto;
            margin-top: 3rem;
            margin-bottom: 3rem;
          "
        >
          <ui-btn
            dark
            block
            @click="
              navigateTo({
                path: route.fullPath,
                query: {
                  text: route.query.text,
                  page: parseInt((route.query.page as string) || '0') + 1,
                },
              })
            "
          >
            Смотреть еще
          </ui-btn>
        </div>
      </template>

      <template v-if="!cards.length">
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
  </q-page>
</template>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  padding-top: 0;
  background-color: rgba(241, 241, 241, 1);

  &__header {
    padding: 2.4rem 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    @media (max-width: 720px) {
      width: 100%;
      border-top: 0px solid rgba(0, 0, 0, 0.1);
    }
  }

  &__items {
    width: min(1025px, 95%);
    margin: auto;
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 0.5rem;
    row-gap: 1rem;

    @media (max-width: 970px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 800px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 460px) {
      grid-template-columns: repeat(2, 1fr);
    }
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
