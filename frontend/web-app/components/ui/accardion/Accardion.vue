<script setup lang="ts">
const show = ref(false);
</script>

<template>
  <div class="accardion">
    <div class="accardion__header" @click="show = !show">
      <slot name="title" />

      <svg
        style="width: 1.2rem; height: 2.4rem; transition: rotate .15s;"
        :style="show ? 'rotate: 90deg' : 'rotate: 0deg'"
        viewBox="0 0 14 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 25L13 13L1 1"
          stroke="#C2C2C2"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div class="accardion__content" v-if="show">
      <q-separator class="accardion__separator"></q-separator>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accardion {
  border-top: 1px solid #e5e5e5;
  background-color: white;
  padding: 0 3.6rem;
  
  &__header {
    font-size: 2rem;
    font-weight: 500;
    height: 8.9rem;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
  }

  &__separator {
    background-color: rgba(225, 225, 225, 1);
    margin-bottom: 5.7rem;
  }

  &__content {
    padding-bottom: 4rem;
  }
}
</style>
