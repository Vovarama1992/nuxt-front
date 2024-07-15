<script setup lang="ts">
const route = useRoute();
const currentPage = ref(parseInt(String(route.query.page || 1)))
const { data, execute } = await useFetch<{
  content: [];
  props: {
    total_items: number;
    total_page: number;
  };
}>("https://api.3hundred.ru/v1/search/news", {
  query: {
    limit: 5,
    page: currentPage,
  },
  server: false,
  immediate: false,
  watch: false,
});
const news = ref<any[][]>([]);
await execute();

if (data.value?.content) {
  news.value.push(data.value?.content);
}

async function nextPage() {
  currentPage.value += 1;
  await navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      page: currentPage.value,
    }
  });
  await execute();

  if (data.value?.content) {
    news.value.push(data.value?.content);
  }
}

const { isMobile } = useDevice();
</script>

<template>
  <q-page v-if="!isMobile">
    <app-subheader>
      Новости
    </app-subheader>

    <div class="page-container page-padding">
      <div style="padding: 1.8rem 1.1rem; display: flex; flex-direction: column; gap: .9rem">
        <template v-for="page in news" :key="page">
          <div
            style="
              display: flex;
              flex-shrink: 0;
              flex-wrap: wrap;
              row-gap: 0.9rem;
              column-gap: 0.5rem;
            "
          >
            <template v-for="(n, i) in page" :key="n._id">
              <app-card-news
                :_id="n._id"
                :title="n.title"
                :preview="n.preview"
                :style="i > 0 ? 'width: calc(50% - .25rem)':''"
                :class="{
                  'mobile-small-news2': i > 0,
                  'mobile-big-news2': i === 0,
                }"
                :created-at="new Date(n.created_at)"
              />
            </template>
          </div>
        </template>
      </div>

      <div style="padding: 1.8rem 1.1rem; padding-top: 0;" v-if="currentPage < data?.props.total_page">
        <ui-btn dark style="font-size: 1.8rem; width: 50%; border-radius: .8rem; height: 7.2rem;" @click="nextPage">
          Больше материала
          <svg style="margin-left: 1rem;" width="1.7rem" height="1.4rem" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.37948 0.999999L8.50028 8.12081L15.6211 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </ui-btn>
      </div>
    </div>
  </q-page>

  <view-news-mobile v-if="isMobile" />
</template>

<style lang="scss">
.mobile-small-news2 {
  cursor: pointer;
  transition: box-shadow 0.15s ease-in;

  &:hover {
    box-shadow: 0 4px 5px -2px rgba(0, 0, 0, 0.15), 0 7px 10px 1px rgba(0, 0, 0, 0.1), 0 2px 16px 1px rgba(0, 0, 0, 0.08);
  }

  img {
    height: 22rem!important;
  }

  .news-card__caption {
    padding: 2.6rem 1.9rem!important;
    padding-bottom: 2.2rem!important;
  }

  .news-card__title, .news-card__subtitle {
    font-size: 2.2rem!important;
    font-weight: 400!important;
    line-height: 2.5477rem!important;
    text-align: left!important;
  }
  
  .news-card__subtitle {
    font-size: 1.2rem!important;
    line-height: 1.406rem!important;
    font-weight: 300!important;
  }
}

.mobile-big-news2 {
  cursor: pointer;
  transition: box-shadow 0.15s ease-in;

  &:hover {
    box-shadow: 0 4px 5px -2px rgba(0, 0, 0, 0.15), 0 7px 10px 1px rgba(0, 0, 0, 0.1), 0 2px 16px 1px rgba(0, 0, 0, 0.08);
  }

  img {
    object-position: top!important;
  }

  .news-card__caption {
    display: flex!important;
    align-items: center!important;
    justify-content: space-between!important;
  }

  .news-card__title {
    margin-bottom: 0!important;
  }
}
</style>