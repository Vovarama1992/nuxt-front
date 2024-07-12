<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "text" | "password";
    placeholder?: string;
  }>(),
  { type: "text", placeholder: "" }
);

const text = defineModel({ default: "" });
</script>

<template>
  <div class="ui-input">
    <div class="ui-input__container"></div>

    <input
      :type="type"
      v-model="text"
      @focus="$emit('focus', true)"
      @blur="$emit('blur', true)"
      :placeholder="placeholder"
    />

    <div class="ui-input__container">
      <q-btn
        flat
        size="7px"
        round
        style="background-color: rgba(184, 184, 184, 1); margin-right: 2.2rem"
      >
        <svg
          style="width: 0.8rem"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.99998 1.00002L1 7M0.999975 1L6.99995 6.99998"
            stroke="#F4F4F4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-input {
  width: 100%;
  display: flex;
  height: 5.6rem;
  border-radius: 0.8rem;
  background-color: #f4f4f4;

  input {
    border: 0;
    width: 100%;
    height: 100%;
    outline: none;
    font-weight: 400;
    font-size: 1.2rem;
    background: transparent;
  }

  &__container {
    display: flex;
    align-items: center;
    margin-right: 2.2rem;

    &:last-child {
      margin-right: 0;
      margin-left: 1rem;
    }
  }

  @media (max-width: 720px) {
    height: 7rem;
  }
}
</style>
