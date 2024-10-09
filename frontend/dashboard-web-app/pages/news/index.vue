<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
const { $api } = useNuxtApp();
const LIMIT = 40;

const convertToNumber = (arg: any) => {
  const number = Number(arg);
  return isNaN(number) ? 1 : number;
};

const page = ref(convertToNumber(route.query.page));

const { data, pending } = await useAsyncData(
  async () =>
    (await $api.v1.newsControllerGetAll({ limit: LIMIT, page: convertToNumber(unref(page)) })).data,
  { watch: [ page ] }
);

const columns = [
  { label: 'Заголовок', field: 'title', sortable: false },
  { label: 'Подзаголовок', field: 'subtitle', sortable: false },
]

watch(page, (page) =>
  router.push({ path: route.path, query: { page } })
);
</script>

<template>
  <div>
    <PaginateTable
      :pending="pending"
      :page="page"
      :limit="LIMIT"
      :total-pages="data?.total_pages || 1"
      :total-items="data?.total_items || 1"
      :columns="columns"
      :rows="data?.content || []"
      @request="(e) => page = e.pagination.page"
      @click="(row) => navigateTo('/news/' + row._id)"
    />
  </div>
</template>