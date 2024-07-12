<script setup lang="ts">
const props = defineProps<{
  value: string;
  title: string;
}>();
const checked = defineModel({default: () => []});

watch(checked, (newVal) => {
  if (newVal.length > 1) {
    checked.value = [newVal[newVal.length - 1]];
  }
});
</script>

<template>
  <q-item
    class="ui-checkbox-block"
    tag="label"
    :class="{
      'ui-checkbox-block_checked': checked[0] === value,
    }"
    v-ripple
  >
    <q-item-section avatar>
      <q-checkbox v-model="checked" :val="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.ui-checkbox-block {
  height: 7rem;
  border-radius: 1.6rem;
  transition: border-color .2s ease-out;
  border: 1px solid rgba(217, 217, 217, 1);

  &_checked {
    border-color: black;
  }
}
</style>

<style lang="scss">
.ui-checkbox-block {
  .q-checkbox__bg {
    border-radius: .6rem;
    transition: border-color .2s ease-out;
    border: 1.5px solid rgba(214, 214, 214, 1)!important;
  }

  &_checked {
    .q-checkbox__bg {
      border-color: black!important;
    }

    .q-checkbox__inner--truthy .q-checkbox__bg, .q-checkbox__inner--indet .q-checkbox__bg {
      background: transparent;
    }

    .q-checkbox__svg {
      color: black!important;
      width: 1.2rem!important;
      left: .3rem!important;
    }
  }
}
</style>