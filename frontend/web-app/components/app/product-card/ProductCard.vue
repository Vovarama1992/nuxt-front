<script setup lang="ts">
const props = defineProps<{
  _id: string;
  title: string;
  inStock: boolean;
  isSale: boolean;
  isNew: boolean;
  discount: number;
  price: number;
  preview: string;
  photos: string[];
}>();
const { isMobile } = useDevice();
const favorites = useFavoritesStore();

const { format } = new Intl.NumberFormat("ru", {
  currency: "RUB",
});
const discountSum = ref((props.price / 100) * props.discount);
const slide = ref(0);
</script>

<template>
  <div class="product-card">
    <div class="product-card__preview" @mouseleave="slide = 0">
      <div
        class="product-card__labels product-card__labels_header"
        style="z-index: 10"
      >
        <div class="col self-center row" style="flex-wrap: nowrap; z-index: 10">
          <div
            v-if="discount"
            style="margin-right: 0.3rem"
            class="label-discount"
          >
            -{{ discount }}%
          </div>

          <div v-if="inStock" class="label-in-stock">
            <svg
              style="width: 0.8rem; height: 1rem"
              viewBox="0 0 8 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.28048 1.25414C4.30251 1.03076 4.08105 0.90891 3.96735 1.08185L1.04156 5.53201C0.945025 5.67884 1.0274 5.90177 1.1782 5.90177H3.79852C3.9055 5.90177 3.98828 6.02063 3.97501 6.15518L3.71952 8.74586C3.69749 8.96924 3.91895 9.09109 4.03265 8.91815L6.95843 4.46799C7.05497 4.32116 6.9726 4.09822 6.8218 4.09822H4.20148C4.0945 4.09822 4.01172 3.97937 4.02499 3.84482L4.28048 1.25414Z"
                fill="white"
                stroke="white"
                stroke-width="0.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div v-if="isNew" class="label-in-stock label-new">
            <svg
              width="1rem"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33578 2.62024C3.24728 2.79723 3.20303 2.88573 3.14392 2.96241C3.09147 3.03046 3.03046 3.09147 2.96241 3.14392C2.88573 3.20303 2.79723 3.24728 2.62024 3.33578L1.6261 3.83285C0.704885 4.29346 0.244278 4.52376 0.09647 4.83541C-0.0321567 5.10661 -0.0321567 5.42125 0.09647 5.69246C0.244278 6.00411 0.704884 6.23441 1.6261 6.69502L2.62024 7.19209C2.79723 7.28058 2.88573 7.32483 2.96241 7.38394C3.03046 7.4364 3.09147 7.4974 3.14392 7.56545C3.20303 7.64214 3.24728 7.73063 3.33578 7.90763L3.83285 8.90177C4.29346 9.82298 4.52376 10.2836 4.83541 10.4314C5.10661 10.56 5.42125 10.56 5.69246 10.4314C6.00411 10.2836 6.23441 9.82298 6.69502 8.90177L7.19209 7.90763C7.28058 7.73063 7.32483 7.64214 7.38394 7.56545C7.4364 7.4974 7.4974 7.4364 7.56545 7.38394C7.64214 7.32483 7.73063 7.28058 7.90763 7.19209L8.90177 6.69502C9.82298 6.23441 10.2836 6.00411 10.4314 5.69246C10.56 5.42125 10.56 5.10661 10.4314 4.83541C10.2836 4.52376 9.82298 4.29346 8.90177 3.83285L7.90763 3.33578C7.73063 3.24728 7.64214 3.20303 7.56545 3.14392C7.4974 3.09147 7.4364 3.03046 7.38394 2.96241C7.32483 2.88573 7.28058 2.79723 7.19209 2.62024L6.69502 1.6261C6.23441 0.704885 6.00411 0.244278 5.69246 0.09647C5.42125 -0.0321567 5.10661 -0.0321567 4.83541 0.09647C4.52376 0.244278 4.29346 0.704884 3.83285 1.6261L3.33578 2.62024Z"
                fill="white"
              />
            </svg>
          </div>

          <div v-if="isSale" class="label-in-stock label-sale">
            <svg
              width="1rem "
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.75239 7.60119C8.14463 9.00993 6.70728 10 5.03092 10C2.8047 10 1 8.25391 1 6.1C1 3.94609 1.84673 3.06538 3.17049 1C5.65106 2.04997 5.65106 5.2 5.65106 5.2C5.65106 5.2 6.46577 3.681 8.13162 2.95C8.66577 4.47093 9.38596 6.13262 8.75239 7.60119Z"
                fill="white"
                stroke="white"
                stroke-width="0.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <client-only>
          <svg
            style="
              width: 1.9rem;
              height: 1.66rem;
              position: relative;
              z-index: 10;
              top: 0.4rem;
              right: 0.2rem;
            "
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="
              favorites.find(_id) !== -1
                ? favorites.del(_id)
                : favorites.add(_id)
            "
          >
            <path
              :style="
                favorites.find(_id) !== -1
                  ? 'fill: #FF264D; stroke: #FF264D;'
                  : ''
              "
              d="M4.36963 0.740234C2.24867 0.740234 0.529297 2.54558 0.529297 4.77258C0.529297 9.22939 7.80571 14.3229 7.80571 14.3229C7.80571 14.3229 15.0821 9.22939 15.0821 4.77258C15.0821 2.01361 13.3628 0.740234 11.2418 0.740234C9.73798 0.740234 8.43604 1.64782 7.80571 2.96978C7.17538 1.64782 5.87345 0.740234 4.36963 0.740234Z"
              stroke="#DCDFE4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </client-only>
      </div>

      <div style="position: relative">
        <q-carousel
          style="height: 15.5rem"
          transition-prev="slide-right"
          transition-next="slide-left"
          ref="carousel"
          swipeable
          animated
          v-model="slide"
          infinite
        >
          <template v-for="(img, i) in [preview, ...photos]" :key="img">
            <q-carousel-slide style="padding: 0" :name="i">
              <q-img
                @click="navigateTo(`/products/${_id}`)"
                style="max-width: 100%; height: 100%; border-radius: 1rem"
                :src="`http://localhost:8080/${img}`"
                fit="cover"
              />
            </q-carousel-slide>
          </template>
        </q-carousel>

        <div
          class="bar"
          v-if="!isMobile"
          @click="navigateTo(`/products/${_id}`)"
        >
          <template v-for="(img, i) in [preview, ...photos]" :key="img">
            <div class="bar__hover" @mouseover="slide = i"></div>
          </template>

          <div
            style="
              position: absolute;
              margin: auto;
              left: 0;
              right: 0;
              display: flex;
              bottom: 0.5rem;
            "
          >
            <div class="bar__container">
              <template v-for="(img, i) in [preview, ...photos]" :key="img">
                <div
                  class="bar__bull"
                  :class="{ bar__bull_active: slide === i }"
                  v-if="i < 5"
                ></div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <p class="product-card__title" @click="navigateTo(`/products/${_id}`)">
        {{ title }}
      </p>
    </div>

    <div @click="navigateTo(`/products/${_id}`)">
      <div class="product-card__labels" style="align-items: start">
        <div class="col self-center row" style="flex-direction: column">
          <p style="font-weight: 500; font-size: 1.5rem; margin-bottom: 0">
            {{ format(price - discountSum) }}₽
          </p>
          <p
            v-if="discount"
            style="
              font-weight: 400;
              font-size: 1.2rem;
              margin-bottom: 0;
              color: #7f7f7f;
              text-decoration: line-through;
              opacity: 0.5;
              margin-top: -0.4rem;
            "
          >
            {{ format(price) }}₽
          </p>
        </div>

        <svg
          width="2.5rem"
          height="2.5rem"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.47266 1.63672C2.51568 2.01916 3.94273 2.31714 4.58504 3.2974C5.03308 3.98117 5.03308 4.88941 5.03308 6.7059V10.1223C5.03308 13.8147 5.1092 15.0333 6.15202 16.1803C7.19485 17.3274 8.87325 17.3274 12.2301 17.3274H18.6128C21.9594 17.3274 22.6854 16.5724 23.3281 13.32C23.6086 11.901 23.8926 10.5 24.0356 9.08594C24.3067 6.40613 22.8152 5.55312 20.4386 5.55312H5.03308M20.3015 22.3485C20.3015 23.3883 19.4585 24.2313 18.4186 24.2313C17.3787 24.2313 16.5357 23.3883 16.5357 22.3485C16.5357 21.3086 17.3787 20.4656 18.4186 20.4656C19.4585 20.4656 20.3015 21.3086 20.3015 22.3485ZM10.2595 22.3485C10.2595 23.3883 9.41646 24.2313 8.37657 24.2313C7.33668 24.2313 6.49368 23.3883 6.49368 22.3485C6.49368 21.3086 7.33668 20.4656 8.37657 20.4656C9.41646 20.4656 10.2595 21.3086 10.2595 22.3485Z"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  display: flex;
  padding: 2.5rem 1.6rem;
  padding-top: 1.6rem;
  border-radius: 2rem;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid rgba(230, 230, 230, 1);
  position: relative;
  justify-content: space-between;
  box-shadow: none;
  transition: box-shadow 0.15s ease-in;

  &:hover {
    box-shadow: 0 4px 5px -2px rgba(0, 0, 0, 0.15),
      0 7px 10px 1px rgba(0, 0, 0, 0.1), 0 2px 16px 1px rgba(0, 0, 0, 0.08);
  }

  &:hover .bar {
    display: flex;
  }

  @media screen and (max-width: 500px) {
    &:hover {
      box-shadow: none;
    }

    &:hover .bar {
      display: none;
    }
  }

  &__preview {
  }

  &__labels {
    display: flex;
    align-items: start;
    justify-content: space-between;

    &_header {
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      padding: 2.5rem 1.6rem;
      padding-top: 1.6rem;
      position: absolute;
    }
  }

  &__title {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 117%;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
}

.label-discount {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 0 0.9rem;
  height: 2.7rem;
  border-radius: 35px;
  font-weight: 400;
  font-size: 1rem;
  border: 1px solid #d4d4d4;

  @media screen and (max-width: 500px) {
    height: 2.2rem;
  }
}

.label-in-stock {
  display: flex;
  width: 3.2rem;
  height: 2.7rem;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    444.82% 306.47% at 44.52% -45.1%,
    rgb(166, 77, 255) 0%,
    rgb(42, 0, 208) 100%
  );

  @media screen and (max-width: 500px) {
    height: 2.2rem;
  }
}

.label-new {
  background: radial-gradient(
    444.82% 306.47% at 44.52% -45.1%,
    rgb(94, 163, 244) 0%,
    rgb(0, 105, 229) 100%
  );
}

.label-sale {
  background: radial-gradient(
    444.82% 306.47% at 44.52% -45.1%,
    rgb(255, 113, 155) 0%,
    rgb(211, 13, 73) 100%
  );
}

.bar {
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: none;
  position: absolute;
  flex-wrap: nowrap;

  &__hover {
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  &__container {
    margin: auto;
    gap: 0.4rem;
    display: flex;
    height: 1.9rem;
    padding: 0 1rem;
    border-radius: 3rem;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.5);
  }

  &__bull {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.35);

    &_active {
      background-color: rgb(0, 0, 0);
    }
  }
}
</style>
