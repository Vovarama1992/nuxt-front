<script setup lang="ts">
const router = useRouter();
const leftDrawerOpen = ref(true);
const linksData = [
  {
    icon: "sell",
    label: "Товар",
    header: "Меню",
    caption: "Упрвление карточками товара",
    to: "/products",
  },
  {
    icon: "paid",
    label: "Заказы",
    caption: "Упрвление заказами",
    to: "/orders",
  },
  {
    icon: "chat",
    label: "Чаты",
    caption: "Диалоги с покупателями",
    to: "/products",
  },
  {
    icon: "campaign",
    label: "Центр увеломленй",
    caption: "Рассылка пользователям ресурса",
    to: "/products",
  },
  {
    icon: "discount",
    label: "Промокоды",
    caption: "Работа с промокодами",
    to: "/products",
  },
];
</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="menu"
        @click="leftDrawerOpen = !leftDrawerOpen"
      />
      <q-toolbar-title>Панель администратора (3hundred)</q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
    <q-list>
      <template v-for="link in linksData" :key="link.label">
        <q-item-label header v-if="link.header">{{ link.header }}</q-item-label>
        <q-item clickable @click="router.push(link.to)">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.label }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
</template>
