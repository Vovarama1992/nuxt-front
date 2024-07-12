<script setup lang="ts">
const sliders = ref([
  {
    title: "Оригинальные товары с быстрой доставкой",
    to: "/catalog",
    img: "/1_D.jpg",
  },
  {
    title: "Кроссовки",
    to: "/catalog?type=Кроссовки&name=Кроссовки",
    img: "/2_D.jpg",
  },
  {
    title: "Бесплатная доставка при первом заказе",
    to: "/catalog",
    img: "/3_D.jpg",
  },
  {
    title: "Лето",
    to: "/catalog?name=Лучшее на лето",
    img: "/4_D.jpg",
  },
  {
    title: "Stone Island",
    to: "/catalog?brand=Stone Island&name=Лучшее от Stone Island",
    img: "/5_D.jpg",
  },
  {
    title: "Тапочки: лучшее",
    to: "/catalog?type=Тапки&name=Тапочки: лучшее",
    img: "/6_D.jpg",
  },
]);
const carousel = ref(null);
const slide = ref(0);
</script>

<template>
  <div class="slider-main">
    <q-carousel
      style="
        width: 100%;
        height: 100%;
        padding: 0;
        background-color: transparent;
      "
      transition-prev="fade"
      transition-next="fade"
      ref="carousel"
      :transition-duration="1000"
      swipeable
      animated
      v-model="slide"
      infinite
      :autoplay="10000"
    >
      <q-carousel-slide
        style="overflow: hidden; padding: 0; background-color: transparent"
        v-for="(sld, i) in sliders"
        :key="sld.title"
        :name="i"
      >
        <img :src="sld.img" style="width: 100%; height: 100%; object-fit: cover;" />
      </q-carousel-slide>
    </q-carousel>

    <div class="slider-main__shadow"></div>

    <div class="slider-main__container">
      <span
        style="
          font-weight: 500;
          font-size: 5rem;
          line-height: 117%;
          color: #fff;
          width: 59rem;
        "
        >{{ sliders[slide].title }}</span
      >
      <div>
        <q-btn flat round style="margin-left: 6.9rem" @click="$refs.carousel?.previous()">
          <svg
            style="rotate: 180deg"
            width="4.3rem"
            height="4.3rem"
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_371_5698)">
              <g filter="url(#filter0_b_371_5698)">
                <circle
                  cx="21.5"
                  cy="21.5"
                  r="21.5"
                  fill="white"
                  fill-opacity="0.95"
                />
              </g>
              <path
                d="M19 29.6923L26.755 21.8462L19 14"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_b_371_5698"
                x="-167.1"
                y="-167.1"
                width="377.2"
                height="377.2"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="83.55" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_371_5698"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_371_5698"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_371_5698">
                <rect width="43" height="43" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </q-btn>

        <q-btn flat round style="margin-left: 1.6rem" @click="$refs.carousel?.next()">
          <svg
            width="4.3rem"
            height="4.3rem"
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_371_5698)">
              <g filter="url(#filter0_b_371_5698)">
                <circle
                  cx="21.5"
                  cy="21.5"
                  r="21.5"
                  fill="white"
                  fill-opacity="0.95"
                />
              </g>
              <path
                d="M19 29.6923L26.755 21.8462L19 14"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_b_371_5698"
                x="-167.1"
                y="-167.1"
                width="377.2"
                height="377.2"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="83.55" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_371_5698"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_371_5698"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_371_5698">
                <rect width="43" height="43" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </q-btn>

        <ui-btn
          @click="navigateTo(sliders[slide].to)"
          style="
            width: 23.4rem;
            height: 7rem;
            border-radius: 10rem;
            font-size: 1.5rem;
            background-color: #fff;
            margin-left: 3.7rem;
          "
        >
          Открыть каталог
          <svg
            style="margin-left: 1rem"
            width=".9rem"
            height="1.4rem"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.24"
              d="M1.5 1L7.5 7L1.5 13"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </ui-btn>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider-main {
  height: 62.6rem;
  position: relative;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.35) 100%
  );

  &__shadow {
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
    height: 100%;
    background: linear-gradient(
      360deg,
      rgba(0, 0, 0, 0) 20%,
      rgba(0, 0, 0, 0.35) 80%
    );
    transform: rotate(180deg);
  }

  &__container {
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 7.2rem;
    width: 100%;
    height: 12.6rem;
    position: absolute;
  }
}
</style>
