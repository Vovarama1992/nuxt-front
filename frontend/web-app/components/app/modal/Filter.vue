<script setup lang="ts">
type Vars = { group: string; variables: { _id: string; title: string }[] }[];
const vars = ref<Vars>([]);
const typeFilters = defineModel("types", { default: () => [] });
const brandFilters = defineModel("brands", { default: () => [] });

try {
  const result = await $fetch<Vars>("https://api.3hundred.ru/v1/products/vars");
  vars.value = result;
} catch (err) {}
</script>

<template>
  <app-modal title="Фильтр">
    <div class="filters__content">
      <app-filter-block
        :title="'Тип'"
        v-model="typeFilters"
        :filters="
          vars
            .find((el) => el.group === 'type')
            ?.variables.map((el) => el.title) || []
        "
      />
      <app-filter-block
        title="Бренд"
        v-model="brandFilters"
        :filters="
          vars
            .find((el) => el.group === 'brand')
            ?.variables.map((el) => el.title) || []
        "
      />

      <q-btn
        flat
        v-close-popup
        style="
          width: calc(100% - 2rem);
          height: 7.2rem;
          margin: 2.7rem 1rem;
          text-transform: none;
          background-color: #000;
          color: #fff;
          border-radius: 0.8rem;
          font-weight: 400;
          font-size: 1.8rem;
        "
      >
        Применить
      </q-btn>
    </div>
  </app-modal>
</template>

<style lang="scss">
.filters__content {
  padding: 2.2rem 1.6rem;
  .filter-block__title {
    font-size: 2rem !important;
  }

  .filter-block__input {
    width: 100% !important;
    height: 7.2rem !important;
    padding: 0 1.8rem !important;

    input {
      font-size: 1.4rem !important;
    }

    svg {
      width: 1.4rem;
    }
  }

  .filter-block__filter {
    margin-top: 1.9rem;
    .q-checkbox__label {
      span {
        font-size: 1.5rem !important;
      }
    }
  }

  .filter-block__show {
    font-size: 1.5rem !important;
  }
}
</style>