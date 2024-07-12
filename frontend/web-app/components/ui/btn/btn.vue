<script setup lang="ts">
withDefaults(
  defineProps<{
    block?: boolean;
    dark?: boolean;
  }>(),
  { block: false, dark: false}
);
</script>

<template>
  <q-btn
    class="ui-btn"
    :class="{
      'ui-btn_block': block,
      'ui-btn_dark': dark,
    }"
    flat
  >
    <slot />
  </q-btn>
</template>

<style scoped lang="scss">
.ui-btn {
  height: 7rem;
  color: black;
  font-weight: 400;
  font-size: 1.5rem;
  text-transform: none;
  border-radius: 1.6rem;
  background-color: white;
  border: 1px solid rgba(217, 217, 217, 1);

  &_block { width: 100%; }
  &_dark {
    color: white;
    border-color: block;
    background-color: black;
  }
}
</style>