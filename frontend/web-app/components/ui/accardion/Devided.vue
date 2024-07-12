<script setup lang="ts">
withDefaults(
  defineProps<{ quantity?: number; prefix?: string; static?: boolean }>(),
  { quantity: 0, prefix: "товаров", static: false }
);

const isShow = ref(true);
</script>

<template>
  <div class="accardion-devided">
    <div
      class="accardion-devided__header"
      @click="!static ? (isShow = !isShow) : false"
    >
      <div class="col self-center">
        <span>{{ quantity }} {{ prefix }}</span>

        <svg
          v-if="!static"
          :style="isShow ? 'rotate: 0deg' : 'rotate: 180deg'"
          style="
            height: 0.9rem;
            width: 1.7rem;
            margin-left: 1rem;
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

      <div></div>

      <slot name="control" />
    </div>

    <div class="accardion-devided__content" v-if="isShow">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.accardion-devided {
  &__header {
    display: flex;
    height: 8.9rem;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);

    span {
      font-weight: 500;
      font-size: 2.2rem;
      margin-left: 2.6rem;
    }
  }

  &__content {
    margin-top: 1.8rem;
  }
}
</style>
