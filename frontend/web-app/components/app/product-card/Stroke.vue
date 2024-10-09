<script setup lang="ts">
const props = defineProps<{
  _id: string;
  sizeId?: string;
  title: string;
  sizeValue: string;
  sizeGrid: string;
  discount: number;
  price: number;
  preview: string;
  small?: boolean;
}>();
const cart = useCartStore();
const discountSum = ref((props.price / 100) * props.discount);
</script>

<template>
  <div class="product-card-stroke">
    <div class="product-card-stroke__preview">
      <img :src="useCDN(preview)" />
    </div>

    <div class="product-card-stroke__control">
      <div class="product-card-stroke__text">
        <p class="product-card-stroke__title" style="max-width: 200px">
          {{ title }}
        </p>

        <div
          style="margin-left: 1rem"
          :style="
            small
              ? 'display: flex; justify-content: start; flex-direction: column;'
              : ''
          "
        >
          <p
            class="product-card-stroke__price"
            :style="small ? 'font-size: 1.4rem' : ''"
          >
            {{
              discount
                ? usePriceFormat(price - discountSum)
                : usePriceFormat(price)
            }}
          </p>
          <p
            class="product-card-stroke__discount"
            v-if="discount"
            :style="small ? 'font-size: 1.2rem; margin-top: .5rem;' : ''"
          >
            {{ usePriceFormat(price) }}
          </p>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between">
        <div>
          <p class="product-card-stroke__size">
            {{ sizeValue }} {{ sizeGrid }}
          </p>
          <div class="col self-center">
            <svg
              style="width: 1.5rem; height: 1.4rem"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="() => {}"
            >
              <path
                v-if="
                  true
                "
                d="M4.95833 1C2.77221 1 1 2.86082 1 5.15625C1 9.75 8.5 15 8.5 15C8.5 15 16 9.75 16 5.15625C16 2.3125 14.2278 1 12.0417 1C10.4916 1 9.1497 1.93547 8.5 3.29806C7.8503 1.93547 6.50836 1 4.95833 1Z"
                fill="white"
                stroke="#BEBEBE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                v-else
                d="M4.95833 1C2.77221 1 1 2.86082 1 5.15625C1 9.75 8.5 15 8.5 15C8.5 15 16 9.75 16 5.15625C16 2.3125 14.2278 1 12.0417 1C10.4916 1 9.1497 1.93547 8.5 3.29806C7.8503 1.93547 6.50836 1 4.95833 1Z"
                fill="#FF264D"
                stroke="#FF264D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              style="width: 1.3rem; height: 1.5rem; margin-left: 1rem"
              viewBox="0 0 15 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="cart.delAll(_id, sizeId as string)"
            >
              <path
                d="M13.2469 5.35539C13.2854 4.94297 12.9822 4.57743 12.5698 4.53894C12.1574 4.50045 11.7919 4.80358 11.7534 5.216L13.2469 5.35539ZM11.6577 14.3116L12.4045 14.3813L12.4045 14.3813L11.6577 14.3116ZM3.34253 14.3116L2.59577 14.3813L2.59577 14.3813L3.34253 14.3116ZM3.24687 5.216C3.20837 4.80358 2.84284 4.50045 2.43042 4.53894C2.01799 4.57743 1.71487 4.94297 1.75336 5.35539L3.24687 5.216ZM8.06258 11.7813C8.06258 12.1955 8.39836 12.5313 8.81258 12.5313C9.22679 12.5313 9.56258 12.1955 9.56258 11.7813H8.06258ZM9.56258 7.09376C9.56258 6.67955 9.22679 6.34376 8.81258 6.34376C8.39836 6.34376 8.06258 6.67955 8.06258 7.09376H9.56258ZM5.43752 11.7813C5.43752 12.1955 5.7733 12.5313 6.18752 12.5313C6.60173 12.5313 6.93752 12.1955 6.93752 11.7813H5.43752ZM6.93752 7.09376C6.93752 6.67955 6.60173 6.34376 6.18752 6.34376C5.7733 6.34376 5.43752 6.67955 5.43752 7.09376H6.93752ZM1 2.39286C0.585786 2.39286 0.25 2.72865 0.25 3.14286C0.25 3.55707 0.585786 3.89286 1 3.89286V2.39286ZM5.3343 1.71012L4.60392 1.5397L4.60392 1.5397L5.3343 1.71012ZM14 3.89286C14.4142 3.89286 14.75 3.55707 14.75 3.14286C14.75 2.72865 14.4142 2.39286 14 2.39286V3.89286ZM9.6657 1.71012L10.3961 1.5397L10.3961 1.5397L9.6657 1.71012ZM11.7534 5.216L10.9109 14.2419L12.4045 14.3813L13.2469 5.35539L11.7534 5.216ZM9.91638 15.25H5.08384V16.75H9.91638V15.25ZM4.08928 14.2419L3.24687 5.216L1.75336 5.35539L2.59577 14.3813L4.08928 14.2419ZM5.08384 15.25C4.61335 15.25 4.14673 14.8575 4.08928 14.2419L2.59577 14.3813C2.71724 15.6827 3.7562 16.75 5.08384 16.75V15.25ZM10.9109 14.2419C10.8535 14.8575 10.3869 15.25 9.91638 15.25V16.75C11.244 16.75 12.283 15.6827 12.4045 14.3813L10.9109 14.2419ZM9.56258 11.7813V7.09376H8.06258V11.7813H9.56258ZM6.93752 11.7813V7.09376H5.43752V11.7813H6.93752ZM1 3.89286H5V2.39286H1V3.89286ZM5.73038 3.31328L6.06469 1.88055L4.60392 1.5397L4.26962 2.97244L5.73038 3.31328ZM6.18318 1.75H8.81682V0.25H6.18318V1.75ZM5 3.89286H10V2.39286H5V3.89286ZM10 3.89286H14V2.39286H10V3.89286ZM8.93531 1.88055L9.26962 3.31328L10.7304 2.97244L10.3961 1.5397L8.93531 1.88055ZM8.81682 1.75C8.83731 1.75 8.90952 1.76999 8.93531 1.88055L10.3961 1.5397C10.2271 0.815572 9.59935 0.25 8.81682 0.25V1.75ZM6.06469 1.88055C6.09048 1.76999 6.16269 1.75 6.18318 1.75V0.25C5.40065 0.25 4.77289 0.815571 4.60392 1.5397L6.06469 1.88055Z"
                fill="#BEBEBE"
              />
            </svg>
          </div>
        </div>

        <ClientOnly>
          <div class="counter">
            <q-btn
              flat
              round
              class="counter__btn"
              @click="cart.del(_id, sizeId as string)"
            >
              <span style="position: relative; top: -0.6rem">_</span>
            </q-btn>
            <p>{{ cart.quantityById(_id, sizeId as string) }}</p>
            <q-btn
              flat
              round
              class="counter__btn"
              :disabled="cart.maxedOut(_id, sizeId as string)"
              @click="cart.add({product_id: _id, size_id: sizeId as string})"
              >+</q-btn
            >
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card-stroke {
  display: grid;
  min-height: 15.4rem;
  padding: 2.3rem 2.6rem;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  grid-template-columns: 8rem auto;

  &:last-child {
    border-bottom: 1px solid #e5e5e5;
  }

  &__preview {
    width: 100%;
    display: flex;
    height: 10.6rem;
    align-items: center;
    border-radius: 0.8rem;
    justify-content: center;
    background-color: #f3f3f3;

    img {
      width: 110%;
      object-fit: contain;
      object-position: 50% 50%;
      mix-blend-mode: multiply;
    }
  }

  &__control {
    margin-left: 1.9rem;
    margin-top: .6rem;
  }

  &__text {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 171%;
  }

  &__size {
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 171%;
    opacity: 0.5;
  }

  &__price,
  &__discount {
    font-weight: 400;
    font-size: 2rem;
    margin-bottom: 0;
    line-height: 117%;
    text-align: right;
  }

  &__discount {
    margin-top: 1rem;
    color: #a7a4a4;
    font-size: 1.2rem;
    text-decoration: line-through;
  }
}

.counter {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  p {
    margin: 0 0.5rem;
    text-align: center;
    width: 2rem;
  }

  &__btn {
    color: rgba($color: #000000, $alpha: 0.4);
    background-color: #f9f9f9;
    width: 4.4rem;
    height: 4.4rem;
  }
}
</style>
