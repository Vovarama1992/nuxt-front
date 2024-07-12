<script setup lang="ts">
const props = withDefaults(defineProps<{ images: string[] }>(), { images: [] });

const slide = ref(0);
</script>

<template>
  <div style="width: 100%">
    <div style="position: relative">
      <q-carousel
        style="border-radius: 20px"
        transition-prev="slide-right"
        transition-next="slide-left"
        ref="carousel"
        swipeable
        animated
        v-model="slide"
        infinite
      >
        <q-carousel-slide
          v-for="(img, i) in images"
          :key="img"
          :name="i"
          style="
            display: flex;
            justify-content: center;
            overflow: hidden;
            padding: 0;
          "
        >
          <q-img
            :src="'http://localhost:8080/' + img"
            fit="contain"
            style="width: 100%; position: relative"
          />
        </q-carousel-slide>
      </q-carousel>

      <q-btn
        style="
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(2px);
          background-color: rgba(0, 0, 0, 0.15);
          width: 62px;
          height: 62px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 15px;
          margin: auto;
        "
        @click="$refs.carousel?.previous()"
        round
        flat
      >
        <svg
          width="8"
          height="16"
          viewBox="0 0 8 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 15L1 8L7 1"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </q-btn>

      <q-btn
        style="
          backdrop-filter: blur(2px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          background-color: rgba(0, 0, 0, 0.15);
          width: 62px;
          height: 62px;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 15px;
          margin: auto;
        "
        @click="$refs.carousel?.next()"
        round
        flat
      >
        <svg
          width="8"
          height="16"
          viewBox="0 0 8 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 15L7 8L1 1"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </q-btn>
    </div>

    <div style="position: relative">
      <div
        style="
          left: -8px;
          width: 20px;
          top: 1px;
          z-index: 1;
          height: 90%;
          position: absolute;
          background: linear-gradient(
            90deg,
            rgba(241, 241, 241, 1) 0%,
            rgba(0, 212, 255, 0) 100%
          );
        "
      ></div>
      <div
        style="
          right: 8px;
          width: 20px;
          top: 15px;
          z-index: 1;
          height: 90%;
          border-radius: 20px;
          position: absolute;
          background: linear-gradient(
            90deg,
            rgba(0, 212, 255, 0) 0%,
            rgba(241, 241, 241, 1) 100%
          );
        "
      ></div>
      <div
        style="
          width: 100%;
          overflow-x: auto;
          padding: 20px 40px;
          display: grid;
          grid-auto-flow: column;
        "
        class="q-gutter-sm"
      >
        <q-img
          v-for="(img, i) in images"
          :key="img"
          :src="'http://localhost:8080/' + img"
          :ratio="16 / 9"
          :style="slide === i ? { opacity: 1 } : { opacity: 0.5 }"
          @click="() => (slide = i)"
          style="width: 106px; height: 79px; border-radius: 8px"
        />
      </div>
    </div>
  </div>
</template>
