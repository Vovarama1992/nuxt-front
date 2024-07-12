<script setup lang="ts">
withDefaults(
  defineProps<{ title: string }>(),
  {  title: "товаров" }
);

const isShow = ref(true);
</script>

<template>
  <div class="accardion-devided">
    <div
      class="accardion-devided__header"
      @click="isShow = !isShow"
    >
      <span>{{ title }}</span>

      <svg
        :style="isShow ? 'rotate: 0deg' : 'rotate: 180deg'"
        style="
          height: 0.9rem;
          width: 1.7rem;
          margin-left: 2rem;
          transition: rotate 0.15s;
        "
        viewBox="0 0 19 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 10L9.5 1L1 10"
          stroke="#C2C2C2"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div class="accardion-devided__content" v-if="isShow">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.accardion-devided {
  &__header {
    display: flex;
    height: 8.8rem;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);

    span {
      font-weight: 400;
      font-size: 1.8rem;
      margin-left: 2.6rem;
    }
  }

  &__content {
    background-color: #fff;
  }
}
</style>
