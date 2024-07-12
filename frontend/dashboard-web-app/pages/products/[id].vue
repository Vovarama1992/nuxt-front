<script setup lang="ts">
const q = useQuasar();
const route = useRoute();

const productId = route.path.split("/").at(-1) as string;
const showFieldDialog = ref(false);
const changeText = ref('');
const changeTextNumber = ref(0);
const currentSelect = ref('');

const isHidden = ref(true);
const inStock = ref(false);
const isNew = ref(false);
const isSale = ref(false);

const title = ref("");
const type = ref("");
const brand = ref("");
const sizeGrid = ref("");

const width = ref(0);
const height = ref(0);
const length = ref(0);
const weight = ref(0);

const discount = ref(0);
const createdAt = ref<Date>();

const sizes = ref<{
  _id: string;
  title: string;
  price: number;
  quantity: number;
}>([]as any);

try {
  const product: any = await $fetch(
    `https://api.3hundred.ru/v1/dashboard/products/${productId}`,
    {
      headers: {
        Authorization: "Bearer " + useCookie("access_token").value,
      },
    }
  );

  brand.value = product.brand;
  type.value = product.type;
  title.value = product.title;
  sizeGrid.value = product.size_grid;

  width.value = product.package.width;
  height.value = product.package.height;
  length.value = product.package.length;
  weight.value = product.package.weight;

  isHidden.value = product.status.is_hidden;
  inStock.value = product.status.in_stock;
  isNew.value = product.status.is_new;
  isSale.value = product.status.is_sale;

  discount.value = product.discount;
  createdAt.value = product.created_at;

  sizes.value = product.sizes;
} catch (err) {
  q.notify("Не удалось получить товар");
}
</script>

<template>
  <q-page padding class="product-add__page">
    <p class="text-h4 q-pb-lg">Карточка товара</p>

    <div style="display: flex; flex-direction: column; margin-bottom: 4rem">
      <span style="font-weight: 500" class="text-subtitle1"> Титулы </span>

      <q-toggle
        style="margin: 0"
        color="negative"
        v-model="isHidden"
        class="q-mb-sm"
        label="Открыть / закрыть карточку"
      />
      <q-toggle
        style="margin: 0"
        color="primary"
        v-model="inStock"
        class="q-mb-sm"
        label="Експресс доставка"
      />
      <q-toggle
        style="margin: 0"
        color="primary"
        v-model="isSale"
        class="q-mb-sm"
        label="Товар популярен"
      />
      <q-toggle
        style="margin: 0"
        color="primary"
        v-model="isNew"
        class="q-mb-sm"
        label="Товар новый"
      />

      <q-separator />
    </div>

    <div style="display: flex; flex-direction: column; margin-bottom: 4rem">
      <span
        style="font-weight: 500; margin-bottom: 1rem"
        class="text-subtitle1"
      >
        Основная информация</span
      >
      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Название: <b>{{ title || "Не заполнено" }}</b>
        </p>
        <q-btn
          rounded
          flat
          style="text-transform: none; color: #444; margin-left: 2rem"
          @click="() => {
            showFieldDialog = !showFieldDialog;
            changeText = title;
            currentSelect = 'title';
          }"
          >Изменить</q-btn
        >
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Бренд: <b>{{ brand || "Не заполнено" }}</b>
        </p>
        <q-btn
          rounded
          flat
          style="text-transform: none; color: #444; margin-left: 2rem"
          @click="() => {
            showFieldDialog = !showFieldDialog;
            changeText = brand;
            currentSelect = 'brand';
          }"
          >Изменить</q-btn
        >
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Тип: <b>{{ type || "Не заполнено" }}</b>
        </p>
        <q-btn
          rounded
          flat
          style="text-transform: none; color: #444; margin-left: 2rem"
          @click="() => {
            showFieldDialog = !showFieldDialog;
            changeText = type;
            currentSelect = 'type';
          }"
          >Изменить</q-btn
        >
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Размерная сетка: <b>{{ sizeGrid || "Не заполнено" }}</b>
        </p>
        <q-btn
          rounded
          flat
          style="text-transform: none; color: #444; margin-left: 2rem"
          @click="() => {
            showFieldDialog = !showFieldDialog;
            changeText = sizeGrid;
            currentSelect = 'sizeGrid';
          }"
          >Изменить</q-btn
        >
      </div>

      <q-separator />
    </div>

    <div style="display: flex; flex-direction: column; margin-bottom: 4rem">
      <span style="font-weight: 500; margin-bottom: 1rem" class="text-subtitle1"
        >Габариты и вес товара в упаковке</span
      >
      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Ширина (см): <b>{{ width }}</b>
        </p>
        <q-btn
          rounded
          flat
          style="text-transform: none; color: #444; margin-left: 2rem"
          @click="() => {
            showFieldDialog = !showFieldDialog;
            changeTextNumber = width;
            currentSelect = 'width';
          }"
          >Изменить</q-btn
        >
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Высота (см): <b>{{ height }}</b>
        </p>
        <q-btn
          rounded
          flat
          style="text-transform: none; color: #444; margin-left: 2rem"
          @click="() => {
            showFieldDialog = !showFieldDialog;
            changeTextNumber = height;
            currentSelect = 'height';
          }"
          >Изменить</q-btn
        >
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Длина (см): <b>{{ length }}</b>
        </p>
        <q-btn
          rounded
          flat
          style="text-transform: none; color: #444; margin-left: 2rem"
          @click="() => {
            showFieldDialog = !showFieldDialog;
            changeTextNumber = length;
            currentSelect = 'length';
          }"
          >Изменить</q-btn
        >
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Все (г): <b>{{ weight }}</b>
        </p>
        <q-btn
          rounded
          flat
          style="text-transform: none; color: #444; margin-left: 2rem"
          @click="() => {
            showFieldDialog = !showFieldDialog;
            changeTextNumber = weight;
            currentSelect = 'weight';
          }"
          >Изменить</q-btn
        >
      </div>

      <q-separator />
    </div>

    <div style="display: flex; flex-direction: column; margin-bottom: 4rem">
      <span style="font-weight: 500; margin-bottom: 1rem" class="text-subtitle1">Размеры</span>

      <template
        v-for="size in sizes"
        :key="size._id"
      >
        <div
        >
        <span style="width: 10rem; display: inline-block;">Размер: {{ size.title }}</span>
        <span style="width: 10rem; display: inline-block;">Цена: {{ size.price }}</span>
        <span style="width: 10rem; display: inline-block;">Количество: {{ size.quantity }}</span>
        <q-btn
        rounded
        flat
        style="text-transform: none; color: #444; margin-left: 2rem"
        @click="() => {
          showFieldDialog = !showFieldDialog;
          changeTextNumber = weight;
          currentSelect = 'weight';
        }"
        >Изменить</q-btn>
        </div>
        <q-separator  style="max-width: 500px; margin: 1rem 0;"/>
      </template>

      <q-btn color="primary" rounded flat style="max-width: 250px; border: 1px solid rgba(1,1,1,.1); text-transform: none; margin-bottom: 1rem">
        Добавить размер
      </q-btn>
      <q-separator />
    </div>
  </q-page>

  <q-dialog v-model="showFieldDialog">
    <q-card style="width: 100%;">
      <q-card-section style="width: 100%;">
        <q-input v-model="changeText" />
        <q-btn style="margin-top: 1rem;">
          Изменить
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.product-add {
  &__page {
    width: min(840px, 100%);
    margin: auto;
  }

  &__input {
    margin-bottom: 20px;
  }
}
</style>
