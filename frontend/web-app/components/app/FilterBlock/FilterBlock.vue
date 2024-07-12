<script setup lang="ts">
const props = defineProps<{
  title: string;
  filters: string[];
  onElement: boolean;
}>();

const localFilters = ref([...props.filters]);
const endElem = ref(5);
const search = ref('');
const checked = defineModel({default: (): string[] => []});

watch(search, () => {
  localFilters.value = props.filters.filter(item => item.includes(search.value));
});
</script>

<template>
  <div class="filter-block">
    <p class="filter-block__title">{{ title }}</p>

    <div class="filter-block__input">
      <input type="text" placeholder="Поиск" v-model="search">

      <svg width="1rem" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 8.89545L7.43318 6.32818C7.88478 5.65903 8.12573 4.87001 8.125 4.06273C8.125 1.82273 6.30318 0 4.06273 0C1.82273 0 0 1.82273 0 4.06273C0 6.30318 1.82273 8.12545 4.06273 8.12545C4.87004 8.12641 5.65913 7.88544 6.32818 7.43364L8.89455 10L10 8.89545ZM4.06273 6.875C3.31697 6.87428 2.60196 6.57771 2.07463 6.05037C1.54729 5.52304 1.25072 4.80803 1.25 4.06227C1.25084 3.31655 1.54745 2.60161 2.07476 2.0743C2.60207 1.547 3.317 1.25039 4.06273 1.24955C4.80845 1.25039 5.52339 1.547 6.0507 2.0743C6.578 2.60161 6.87461 3.31655 6.87545 4.06227C6.87461 4.808 6.578 5.52293 6.0507 6.05024C5.52339 6.57755 4.80845 6.87416 4.06273 6.875Z" fill="#7F7F7F"/>
      </svg>
    </div>

    <div class="filter-block__filters">
      <div
        class="filter-block__filter"
        v-for="filter in localFilters.slice(0, endElem)"
        :key="filter"
      >
        <q-checkbox class="custom-checkbox" v-model="checked" :val="filter">
          <span style="white-space: nowrap;">{{ filter }}</span>
        </q-checkbox>
      </div>
    </div>

    <p
      v-if="localFilters.length - endElem > 0"
      class="filter-block__show"
      @click="endElem = localFilters.length"
    >
      eще {{ localFilters.length - endElem }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.filter-block {
  margin-bottom: 2.7rem;

  &__title {
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    margin-left: 1rem;
  }

  &__input {
    width: 12.6rem;
    height: 2.8rem;
    border-radius: .8rem;
    background-color: #E2E2E2;
    display: flex;
    align-items: center;
    padding: 0 1.2rem;
    margin-bottom: 1.8rem;

    input {
      width: 100%;
      padding-right: 1rem;
      border: 0;
      font-size: 1.2rem;
      font-weight: 400;
      outline: none;
      background: transparent;
    }
  }

  &__show {
    margin-left: 1rem;
    margin-top: 1.2rem;
    font-size: 1.2rem;
    cursor: pointer;
    color: rgba(92, 92, 92, 1);

  }

  &__filter {
    display: flex;
    margin-top: .8rem;
    cursor: pointer;

    &:hover span {
      color: black;
    }

    span {
      margin-left: .8rem;
      font-size: 1.2rem;
      font-weight: 400;
      color: rgba(92, 92, 92, 1);
    }
  }

  &__checkbox {
    margin-left: 1rem;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: .4rem;
    background: rgba(235, 235, 235, 1);

    &__select {
      background: black;
    }
  }
}
</style>

<style>
.custom-checkbox .q-checkbox__inner--truthy, .custom-checkbox .q-checkbox__inner--indet {
  color: black!important;
}

.custom-checkbox .q-checkbox__inner {
    margin-left: 1rem;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: .4rem;
    font-size: 1rem;
    background: rgba(235, 235, 235, 1);
}

.custom-checkbox .q-checkbox__svg {
  width: 1.1rem!important;
  height: 1.1rem!important;
  left: .3rem;
  top: .2rem;
}

.custom-checkbox .q-checkbox__bg {
  border: 0!important;
  width: 100%!important;
  top: 0!important;
  left: 0!important;
  height: 100%!important;
  border-radius: .5rem!important;
}
</style>