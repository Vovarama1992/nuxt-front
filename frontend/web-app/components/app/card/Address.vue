<script setup lang="ts">
defineProps<{ city: string; address: string }>();
const { isMobile } = useDevice();
</script>

<template>
  <div class="address-card" :class="{ 'address-card_mobile': isMobile }">
    <div
      style="display: flex; justify-content: center; align-items: center"
      v-if="!isMobile"
    >
      <svg
        width="1.6rem"
        height="1.8rem"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 19V13.5C6.5 12.3954 7.39543 11.5 8.5 11.5H9.5C10.6046 11.5 11.5 12.3954 11.5 13.5V19M17 16.8101V8.00783C17 7.34256 16.7054 6.71336 16.1993 6.29777L10.3327 1.47989C9.55355 0.840038 8.44645 0.840038 7.66732 1.47989L1.80065 6.29777C1.29459 6.71336 1 7.34256 1 8.00783V16.8101C1 18.0195 1.95513 19 3.13333 19H14.8667C16.0449 19 17 18.0195 17 16.8101Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div>
      <div :style="isMobile ? `display: flex; justify-content: center; align-items: center; margin-bottom: 1.9rem` : ''">
        <svg
          v-if="isMobile"
          style="margin-right: 1rem"
          width="1.6rem"
          height="1.8rem"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 19V13.5C6.5 12.3954 7.39543 11.5 8.5 11.5H9.5C10.6046 11.5 11.5 12.3954 11.5 13.5V19M17 16.8101V8.00783C17 7.34256 16.7054 6.71336 16.1993 6.29777L10.3327 1.47989C9.55355 0.840038 8.44645 0.840038 7.66732 1.47989L1.80065 6.29777C1.29459 6.71336 1 7.34256 1 8.00783V16.8101C1 18.0195 1.95513 19 3.13333 19H14.8667C16.0449 19 17 18.0195 17 16.8101Z"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="address-card__city" :style="isMobile ? 'margin: 0; font-size: 1.4rem' : ''">{{ city }}</p>
      </div>
      <p class="address-card__address" :style="isMobile ? 'font-weight: 400; font-size: 1.4rem; text-align: center' : ''">{{ address }}</p>
    </div>

    <div style="display: flex; justify-content: center; align-items: center" :style="isMobile ? 'margin-top: 3.9rem;' : ''">
      <div
        class="row justify-center"
        style="font-size: 1.2rem; cursor: pointer"
        @click="$emit('delete')"
      >
        Удалить
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.8rem;
            height: 1.8rem;
            background-color: #000;
            border-radius: 50%;
            margin-left: 1rem;
          "
        >
          <svg
            width=".8rem"
            height=".8rem"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1.00002L1.00003 7M1 1L6.99997 6.99998"
              stroke="#F4F4F4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.address-card {
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 3rem 0;
  display: grid;
  grid-template-columns: 6.2rem auto 13.1rem;

  &_mobile {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__city {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 117%;
    margin-bottom: 1.5rem;
  }

  &__address {
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 171%;
    color: #8c8c8c;
    margin-bottom: 0;
  }
}
</style>
