<script setup lang="ts">
const text = ref("Кроссовки Adidas");
const timeout = ref<NodeJS.Timeout | null>(null);
const hasFocusStatus = ref(false);
const isFirstTime = ref(true);
const route = useRoute();

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
    limit: 5,
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

const { isMobile } = useDevice();
</script>

<template>
  <div class="page-container page-padding" v-if="!isMobile">
    <div class="modal-search-desktop__modal">
      <div style="width: 100%">
        <div class="modal-search-desktop__modal__header">
          <div style="position: relative; width: 100%">
            <svg
              style="
                top: 0px;
                bottom: 0;
                left: 2rem;
                z-index: 1;
                margin: auto;
                position: absolute;
              "
              width="1.2rem"
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
              class="text-field-3"
              style="width: 100%"
              v-model.trim="text"
              @focus="onFocused"
              placeholder="Искать в каталоге"
            />
          </div>

          <div
            style="width: 8.8rem; min-width: 8.8rem"
            class="row justofy-center"
          >
            <p
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
              style="
                width: 100%;
                margin-bottom: 0;
                font-size: 1.2rem;
                font-weight: 400;
                text-align: center;
                cursor: pointer;
              "
              class="lik"
            >
              Найти
            </p>
          </div>
        </div>

        <p
          style="
            font-size: 2.5rem;
            font-weight: 400;
            margin-top: 3.5rem;
            margin-bottom: 2.5rem;
          "
        >
          Результаты поиска
        </p>

        <div class="modal-search-desktop__items">
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
        <p
          v-if="!(data?.content.length)"
          style="
            margin-bottom: 10rem;
            margin-top: 1rem;
            font-size: 2rem;
            font-weight: 400;
            line-height: 2.343rem;
            color: rgba(184, 184, 184, 1);
          "
        >
          К сожалению, мы ничего не нашли.
        </p>

        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 2rem;
          "
        >
          <p
            style="
              opacity: 0.5;
              font-size: 12px;
              font-weight: 400;
              margin-bottom: 0 !important;
            "
          >
            Найдено {{ data?.props.total_items }} результатов
          </p>
          <ui-btn block dark style="width: 36rem"
            @click="navigateTo({
                  path: '/search',
                  query: {
                    text,
                    page: 1,
                    limit: 4,
                  },
                })"
            >Показать все результаты
          </ui-btn>
        </div>
      </div>
    </div>
  </div>

  <app-modal-search-mobile v-if="isMobile" />
</template>

<style scoped lang="scss">
.lik:hover {
  text-decoration: underline;
}
.modal-search-desktop {
  &__bg {
    position: fixed;
    width: 100%;
    height: calc(100% - 15.2rem);
    top: 15.2rem;
    left: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 30;
  }

  &__modal {
    &__header {
      display: flex;
      align-items: center;
      background-color: white;
    }
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1.9rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.silde-enter-active,
.silde-leave-active {
  transition: translate 0.3s ease;
}

.silde-enter-from,
.silde-leave-to {
  translate: 0 -100vh;
}
</style>

<style lang="scss">
.text-field-3 {
  height: 4.1rem !important;

  input {
    font-size: 1.2rem !important;
    padding-left: 4rem !important;
  }

  .text-field__clean-btn {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: -1rem;
    cursor: pointer;
  }
}
</style>
