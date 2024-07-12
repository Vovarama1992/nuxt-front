<script setup lang="ts">
const count = defineModel({ default: 0 });
</script>

<template>
  <div class="ui-counter">
    <ui-btn class="ui-counter__btn">
      <span>-</span>
    </ui-btn>

    <span class="ui-counter__count">{{ count }}</span>

    <ui-btn class="ui-counter__btn">
      <span>+</span>
    </ui-btn>
  </div>
</template>

<style scoped lang="scss">
.ui-counter {
  display: flex;
  align-items: center;

  &__btn {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #F3F3F3;

    span {
      font-weight: 300;
      font-size: 1.5rem;
      color: rgba(0, 0, 0, .25);
    }
  }

  &__count {
    text-align: center;
    width: 2.7rem;
    font-weight: 300;
    font-size: 1.5rem;
  }
}
</style>