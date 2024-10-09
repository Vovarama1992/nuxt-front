<script setup lang="ts">
const props = withDefaults(defineProps<{ images: string[] }>(), { images: [] });

const slide = ref(0);
</script>

<template>
  <div class="carousel--container">
    <div class="carousel">
      <q-carousel
        style="border-radius: 20px"
        transition-prev="slide-right"
        transition-next="slide-left"
        ref="carousel"
        swipeable
        animated
        v-model="slide"
        infinite
        class="images"
      >
        <q-carousel-slide
          v-for="(img, i) in images"
          :key="img"
          :name="i"
          class="slide"
        >
          <ui-zoom :src="useCDN(img)"></ui-zoom>
        </q-carousel-slide>
      </q-carousel>

      <q-btn
        class="button left"
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
        class="button right"
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

    <div class="gutter--container">
      <div class="q-gutter-sm gutter">
        <q-img
          v-for="(img, i) in images"
          :key="img"
          :src="useCDN(img)"
          :ratio="16 / 9"
          :style="slide === i ? { opacity: 1 } : { opacity: 0.5 }"
          @click="() => (slide = i)"
          class="image"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel--container {
  min-width: 0;
  flex-grow: 1;
}

.carousel {
  position: relative;

  .images {
    border-radius: 2rem;

    .slide {
      display: flex;
      justify-content: center;
      overflow: hidden;
      padding: 0;

      .image { width: 100%; position: relative; }
    }
  }

  .button {
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.15);
    width: 62px;
    height: 62px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;

    &.left {
      left: 15px;
    }

    &.right {
      right: 15px;
    }
  }
}

.gutter--container {
  position: relative;
  display: flex;
  overflow-x: auto;
  margin: 2rem 4rem;

  .gutter {
    display: inline-grid;
    grid-auto-flow: column;
    margin: 0rem auto 0;

    .image {
      width: 108px;
      height: 79px;
      border-radius: 8px;
    }
  }
}
</style>