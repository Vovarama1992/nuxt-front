<script setup lang="ts">
const props = defineProps([ 'filters', 'priceOuterRange' ]);

const { isMobile } = useDevice();

const typeFilters = defineModel("types", { default: () => [] });
const brandFilters = defineModel("brands", { default: () => [] });
const priceRange = defineModel("price", { default: () => ({ min: 0, max: 250000 }) });
const sizeFilters = defineModel("sizes", { default: () => [] });
</script>

<template>
  <app-modal title="Фильтр" v-if="isMobile">
    <div class="filters__content">
      <slot></slot>

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

  <div v-else>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.filters__content {
  padding: 2.2rem 1.6rem;

  .filter-block__title {
    font-size: 2rem ;
  }

  .filter-block__input {
    width: 100%;
    height: 7.2rem;
    padding: 0 1.8rem;

    input {
      font-size: 1.4rem;
    }

    svg {
      width: 1.4rem;
    }
  }

  .filter-block__filter {
    margin-top: 1.9rem;

    .q-checkbox__label span {
      font-size: 1.5rem;
    }
  }

  .filter-block__show {
    font-size: 1.5rem;
  }
}
</style>