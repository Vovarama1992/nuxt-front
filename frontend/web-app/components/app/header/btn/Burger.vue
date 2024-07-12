<script setup lang="ts">
const header = useHeaderStore();
const favorites = useFavoritesStore();
const cart = useCartStore();
</script>


<template>
  <button
    type="button"
    class="header-btn"
    @click="
      () => {
        if (header.$state.currentMenuNema === 'menu') return header.hide();
        header.show('menu');
      }
    "
  >
    <svg v-if="header.$state.currentMenuNema !== 'menu'" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 2H16M2 7.5H16M2 13H16"
        stroke="black"
        stroke-width="2.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg v-else  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9999 1.00006L1 15M0.999941 1L14.9999 14.9999" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <q-badge
      floating
      v-if="(favorites.quantity || cart.quantity) && header.$state.currentMenuNema !== 'menu'"
      style="
        top: .2rem;
        right: .2rem;
        border: 2px solid white;
        height: 1.2rem;
        width: 1.2rem;
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
  position: relative;
  outline: none;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 0px solid transparent;
  background-color: transparent;

  svg {
    width: 1.4rem;
  }
}
</style>
