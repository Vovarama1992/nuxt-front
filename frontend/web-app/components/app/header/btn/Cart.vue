<script setup lang="ts">
  const cart = useCartStore();
</script>

<template>
  <button type="button" class="header-btn" @click="navigateTo('/cart')">
    <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1C1.78476 1.28774 2.85846 1.51194 3.34173 2.24948C3.67883 2.76395 3.67883 3.4473 3.67883 4.814V7.38444C3.67883 10.1626 3.7361 11.0794 4.52071 11.9425C5.30533 12.8056 6.56814 12.8056 9.09377 12.8056H13.8961C16.4141 12.8056 16.9603 12.2375 17.4439 9.79038C17.6549 8.72272 17.8686 7.66865 17.9762 6.60473C18.1801 4.58846 17.0579 3.94667 15.2698 3.94667H3.67883M15.1667 16.5833C15.1667 17.3657 14.5324 18 13.75 18C12.9676 18 12.3333 17.3657 12.3333 16.5833C12.3333 15.8009 12.9676 15.1667 13.75 15.1667C14.5324 15.1667 15.1667 15.8009 15.1667 16.5833ZM7.61106 16.5833C7.61106 17.3657 6.9768 18 6.1944 18C5.41199 18 4.77773 17.3657 4.77773 16.5833C4.77773 15.8009 5.41199 15.1667 6.1944 15.1667C6.9768 15.1667 7.61106 15.8009 7.61106 16.5833Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <q-badge
      floating
      v-if="cart.quantity"
      style="
        top: .2rem;
        right: .5rem;
        border: 2px solid white;
        height: 1.5rem;
        width: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2rem;
        font-size: 8px;
        font-weight: 700;
        line-height: 9.37px;
        text-align: center;
        color: white;
        background-color: black;
        padding: 0;
      "
    >
      {{ cart.quantity }}
    </q-badge>
  </button>
</template>

<style scoped lang="scss">
.header-btn {
  position: relative;
  width: 3.2rem;
  padding: 0;
  height: 3.2rem;
  outline: none;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: flex-start;
  border: 0px solid transparent;
  background-color: transparent;

  &:hover svg {
    fill: rgba(255, 0, 221, 0.4);
  }

  svg {
    width: 1.7rem;
  }
}
</style>