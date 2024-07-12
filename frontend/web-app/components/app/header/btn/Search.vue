<script setup lang="ts">
const header = useHeaderStore();
</script>

<template>
  <button
    type="button"
    class="header-btn"
    @click="() => {
      if (header.$state.currentMenuNema === 'search') return header.hide();
      header.show('search');
    }"
  >
    <svg v-if="header.$state.currentMenuNema !== 'search'" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.3049 12.3049L15 15M14.2222 7.63347C14.2222 11.297 11.2623 14.2669 7.61111 14.2669C3.9599 14.2669 1 11.297 1 7.63347C1 3.9699 3.9599 1 7.61111 1C11.2623 1 14.2222 3.9699 14.2222 7.63347Z"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg v-else  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9999 1.00006L1 15M0.999941 1L14.9999 14.9999" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

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
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 0px solid transparent;
  background-color: transparent;

  &:hover svg {
    fill: rgba(0, 200, 255, 0.4);
  }

  svg {
    width: 1.4rem;
  }
}
</style>
