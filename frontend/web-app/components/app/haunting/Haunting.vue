<script setup lang="ts">
const button = ref(null);
const container = ref(null);

const step = 20;
const step2 = 15;

const windowSize = useWindowSize()
const btnSize = useElementSize(button);
const cotainerBounding = useElementBounding(container);

const isStopped = computed(() => {
  const startElement = cotainerBounding.y.value + step + (btnSize.height.value + step2) - windowSize.height.value;

  if (startElement <= 0) return true;
  return false;
});
// const isStopped = computed(() => y.value <= height.value);
</script>

<template>
  <div class="haunting" ref="container" :style="{ height: `${btnSize.height.value + 30}px` }">
    <q-btn
      flat
      :class="{ haunting__btn_stopped: isStopped}"
      class="haunting__btn haunting__btn_fixed"
      ref="button"
    >
      <slot />
    </q-btn>
  </div>
</template>

<style scoped lang="scss">
.haunting {
  position: relative;

  &__btn {
    width: 35.6rem;
    height: 8.9rem;
    text-transform: none;
    border-radius: 0.8rem;
    background-color: #000;
    transition: bottom .1s;

    &_fixed {
      left: 0;
      right: 0;
      margin: auto;
      bottom: 2rem;
      position: fixed;
    }

    &_stopped {
      bottom: 1.1rem;
      position: absolute;
    }
  }
}
</style>
