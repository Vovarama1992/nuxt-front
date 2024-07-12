<script setup lang="ts">
import { getProducts } from "~/api/api";

const $q = useQuasar();
const columns = [
  {
    name: "id",
    label: "id",
    field: "_id",
  },
  {
    name: "title",
    label: "Название",
    field: "title",
  },
  {
    name: "brand",
    label: "brand",
    field: "brand",
  },
  {
    name: "date",
    label: "Дата создания",
    field: "created_at",
  },
  {
    name: "status",
    label: "Статус",
    field: "status",
  },
  {
    name: "type",
    label: "Тип",
    field: "type",
  },
];

let products: any;

const pagination = ref({ rowsPerPage: 600 });

const onRowClick = async (
  event: MouseEvent,
  row: Record<string, unknown>,
  index: number
) => {
  await navigateTo("/products/" + row._id);
};

const send = async () => {
  const { data, error } = await getProducts(1, 600);

  if (error.value) {
    $q.notify({
      type: error.value ? "negative" : "positive",
      message: error.value ? "Не удалось создать заказ" : "товар создан",
    });
  }

  products = computed(() => {
    return data.value || [];
  });
};

await send();
</script>

<template>
  <q-page style="width: 100%; margin: auto">
    <q-table
      style="height: calc(100vh - 50px)"
      flat
      bordered
      title="Товар"
      :rows="products"
      :columns="columns"
      row-key="index"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      @row-click="onRowClick"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-sm">
          <q-btn color="primary" icon="sort" />
          <q-btn
            color="primary"
            icon="add"
            @click="navigateTo('/products/add')"
          />
        </div>
      </template>
    </q-table>
  </q-page>
</template>
