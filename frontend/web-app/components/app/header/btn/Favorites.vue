<script setup lang="ts">
const favorites = useFavoritesStore();
</script>

<template>
  <button type="button" class="header-btn" @click="navigateTo('/favorites')">
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.22222 1C2.89035 1 1 2.99373 1 5.45312C1 10.375 9 16 9 16C9 16 17 10.375 17 5.45312C17 2.40625 15.1096 1 12.7778 1C11.1244 1 9.69301 2.00229 9 3.46221C8.30699 2.00229 6.87558 1 5.22222 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <q-badge
      floating
      v-if="favorites.quantity"
      style="
        top: .2rem;
        right: .0rem;
        border: 2px solid white;
        height: 1.5rem;
        width: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2rem;
        font-size: 8px;
        font-weight: 700;
        line-height: 9.37px;
        text-align: center;
        color: white;
        background-color: rgba(255, 38, 77, 1);
        padding: 0;
      "
    >
    </q-badge>
  </button>
</template>

<style scoped lang="scss">
.header-btn {
  width: 3.2rem;
  padding: 0;
  height: 3.2rem;
  outline: none;
  display: flex;
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 0px solid transparent;
  background-color: transparent;

  &:hover svg {
    fill: rgba(255, 0, 0, 0.4);
  }

  svg {
    width: 1.6rem;
  }
}
</style>