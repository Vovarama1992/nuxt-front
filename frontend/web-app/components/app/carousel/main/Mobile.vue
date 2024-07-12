<script setup lang="ts">
import m1 from "public/1_М.jpg";
import m2 from "public/2_М.jpg";
import m3 from "public/3 (М).jpg";
import m4 from "public/4_М.jpg";
import m5 from "public/5_М.jpg";
import m6 from "public/6_М.jpg";

const sliders = ref([
  {
    title: "Оригинальные товары с быстрой доставкой",
    to: "/catalog",
    img: m1,
  },
  {
    title: "Кроссовки",
    to: "/catalog?type=Кроссовки&name=Кроссовки",
    img: m2,
  },
  {
    title: "Бесплатная доставка при первом заказе",
    to: "/catalog",
    img: m3,
  },
  {
    title: "Лето",
    to: "/catalog?name=Лучшее на лето",
    img: m4,
  },
  {
    title: "Stone Island",
    to: "/catalog?brand=Stone Island&name=Лучшее от Stone Island",
    img: m5,
  },
  {
    title: "Тапочки: лучшее",
    to: "/catalog?type=Тапки&name=Тапочки: лучшее",
    img: m6,
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
      transition-prev="slide-right"
      transition-next="slide-left"
      ref="carousel"
      swipeable
      animated
      v-model="slide"
      infinite
      autoplay
    >
      <q-carousel-slide
        style="overflow: hidden; padding: 0; background-color: transparent"
        v-for="(sld, i) in sliders"
        :key="sld.title"
        :name="i"
      >
        <img
          :src="sld.img"
          style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% 50%;
          "
        />
      </q-carousel-slide>
    </q-carousel>

    <div class="slider-main__shadow"></div>

    <div class="slider-main__container">
      <div style="display: flex; gap: 0.5rem; margin-bottom: 3rem;">
        <div
          style="
            width: 0.64rem;
            height: 0.64rem;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
          "
          v-for="(el, i) in sliders" :key="el.title"
          :style="slide === i ? 'background-color: #fff' : ''"
        ></div>
      </div>
      <div style="margin-bottom: 3rem; text-align: center; padding: 0 2rem;">
        <span
          style="
            display: inline;
            font-size: 2.2rem;
            font-weight: 500;
            line-height: 2.577rem;
            color: white;
            max-width: 90%;
            text-align: center;
          "
          >{{ sliders[slide].title }}</span
        >
      </div>
      <div>
        <ui-btn
          @click="navigateTo(sliders[slide].to)"
          style="
            width: 24.1rem;
            height: 6rem;
            border-radius: 10rem;
            font-size: 1.5rem;
            background-color: #fff;
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
  height: 48.3rem;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 3.8rem;
    width: 100%;
    height: 12.6rem;
    position: absolute;
  }
}
</style>
