<script setup lang="ts">
defineProps<{ title: string }>();
const { isMobile } = useDevice();
const show = ref(false);
</script>

<template>
  <div class="accardion-plus">
    <div
      class="accardion-plus__header"
      :style="
        show
          ? `border-bottom: 0!important; border-radius: ${isMobile ? '1.2rem 1.2rem 0 0' :  '2.2rem 2.2rem 0 0'}`
          : ''
      "
      @click="show = !show"
    >
      <span :class="{ 'text-mobile': isMobile }">{{ title }}</span>

      <svg
        style="transition: rotate 0.2s; width: 3rem; position: absolute; margin: auto; top: 0; bottom: 0; right: 3rem;"
        :style="show ? 'rotate: 45deg' : ''"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M17.1348 1.44378L17.1348 32.5563M1.62396 17.0001L32.6455 17.0001"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div class="accardion-plus__content" v-if="show">
      <q-separator style="margin-bottom: 2rem" />
      <p><slot /></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accardion-plus {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 8.5rem;
    position: relative;
    background-color: #fff;
    border-radius: 2.2rem;
    padding: 0 3rem;
    cursor: pointer;
    border: 1px solid #e1e1e1;

    @media screen and (max-width: 500px) {
      border-radius: 1.2rem;
      padding: 0 3.4rem;
      height: 8rem;

      svg {
        width: 2.6rem!important;
      }
    }

    span {
      line-height: 117%;
      font-weight: 400;
      font-size: 2rem;
    }
  }

  &__content {
    padding: 3rem;
    padding-top: 0;
    padding-bottom: 2rem;
    background-color: #fff;
    border-radius: 0 0 2.2rem 2.2rem;
    border: 1px solid #e1e1e1;
    border-top: 0;

    @media screen and (max-width: 500px) {
      border-radius: 0 0 1.2rem 1.2rem;
      padding: 2rem 3.4rem;
      padding-top: 0;
    }

    p {
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 200%;

      @media screen and (max-width: 500px) {
        font-size: 1.4rem;
        line-height: 214%;
      }
    }
  }
}

.text-mobile {
  font-size: 1.8rem !important;
  max-width: 90%;
}
</style>
