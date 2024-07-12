<script setup lang="ts">
const links = [
  { to: "/catalog", text: "Каталог" },
  { to: "/news/6681affb0c936172eb4a68b4", text: "Доставка" },
  { to: "/news/6681afa30c936172eb4a68b3", text: "Отзывы" },
  { to: "/news", text: "Новости" },
  { to: "/news/6681b07d0c936172eb4a68b5", text: "Индивидуальный заказ" },
];
</script>

<template>
  <div class="slide-menu">
    <div class="slide-menu__line slide-menu__line_padding">
      <app-header-btn-preview />
      
      <div class="slide-menu__line">
        <app-header-btn-cart />
        <app-header-btn-favorites />
      </div>
    </div>

    <q-separator />
    <div class="slide-menu__links slide-menu__line_padding">
      <div v-for="link in links" :key="link.text">
        <NuxtLink :to="link.to">
          {{ link.text }}
        </NuxtLink>
      </div>
    </div>
    <q-separator />
    <div class="slide-menu__line slide-menu__line_padding">
      <app-header-btn-location />
    </div>
    <q-separator />
    <div class="slide-menu__line slide-menu__line_padding">
      <app-header-btn-support />
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide-menu {
  &__line {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &_padding {
      padding: 1.6rem 2rem;
    }
  }

  &__links {
    gap: 1.6rem;
    display: flex;
    flex-direction: column;
    a {
      font-size: 1.5rem;
      color: black;
    }
  }
}
</style>