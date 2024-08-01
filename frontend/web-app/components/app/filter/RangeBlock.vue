<script lang="ts" setup>
const MAX = 1000000;

const props = defineProps({
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  title: {
    type: String
  }
});

if (!props.min || !props.max || !props.title)
  throw new Error('no min, max or title provided to RangeBlock component');

const range = defineModel({
  default: (): { min: number, max: number } =>
    ({ min: -Infinity, max: Infinity })
});

const unrefRange = unref(range);
const internalRange = ref({
  min: isFinite(unrefRange.min) ? unrefRange.min : props.min,
  max: isFinite(unrefRange.max) ? unrefRange.max : props.max,
});

function onChange() {
  range.value = unref(internalRange);
}
</script>

<template>
  <div class="range-block">
    <div class="range-block__title">{{ title }}</div>
    <div class="range-block__container">
      <q-range
        :min="min"
        :max="max"
        :inner-min="min"
        :inner-max="max"
        thumb-color="black"
        v-model="internalRange"
        @change="onChange"
      ></q-range>
    </div>
    <div class="range-block__tooltip">
      <span class="from">
        от {{ usePriceFormat(internalRange.min) }}
      </span>

      <span class="to">
        до {{ usePriceFormat(isFinite(internalRange.max) ? internalRange.max : MAX) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.range-block {
  margin-bottom: 3.2rem;

  &__title {
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    margin-left: 0.8rem;
  }

  &__container {
    padding: 0.9rem 1.8rem;
    background: rgba(235, 235, 235, 1);
    border-radius: 8px;
  }

  &__tooltip {
    margin-top: 2.4rem;
    padding: 0 0.8rem;
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    color: rgba(92, 92, 92, 1);

    .to {
      margin-left: auto;
    }
  }
}

:deep(.q-slider) {
  display: flex;
}

:deep(.q-slider__inner), :deep(.q-slider__selection) {
  background: rgba(203, 203, 203, 1);
  border-radius: 4px;
}
</style>