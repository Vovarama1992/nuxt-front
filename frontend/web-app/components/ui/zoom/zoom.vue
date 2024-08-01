<script lang="ts" setup>
import PinchZoom from 'pinch-zoom-js';

const props = defineProps({
  src: {
    type: String
  },
  mobile: {
    type: Boolean,
    default: true
  }
});

const enableFeatureMouseZoom = false;
const { isMobile } = useDevice();

if (!props.src)
  throw new Error('image not defined');

const zoom = ref<HTMLDivElement>();
const image = ref<HTMLImageElement>();
const dialog = ref<HTMLDivElement>();

onMounted(() => {
  if (!isMobile) return;

  const unrefImage = unref(image);
  if (!unrefImage) return;

  const unrefZoom = unref(zoom);
  if (!unrefZoom) return;

  const boundingBox = unrefZoom.getBoundingClientRect();
  unrefZoom.style.width = boundingBox.width + 'px';
  unrefZoom.style.height = boundingBox.height + 'px';
  new PinchZoom(unrefImage, {
    draggableUnzoomed: false
  });
})

function onMouseEnter() {
  if (isMobile || !enableFeatureMouseZoom) return;

  const unrefImage = unref(image);
  if (!unrefImage) return;

  unrefImage.style.objectFit = 'none';
}

function onMouseLeave() {
  if (isMobile || !enableFeatureMouseZoom) return;

  const unrefImage = unref(image);
  if (!unrefImage) return;

  unrefImage.style.objectFit = '';
  unrefImage.style.objectPosition = '';
}

function onMouseMove(e: MouseEvent) {
  if (isMobile || !enableFeatureMouseZoom) return;

  const unrefImage = unref(image);
  if (!unrefImage) return;

  const target = e.target as HTMLDivElement;
  const { offsetX, offsetY } = e;

  const boundingBox = target.getBoundingClientRect();

  const xPercent = offsetX / boundingBox.width;
  const yPercent = offsetY / boundingBox.height;

  unrefImage.style.objectPosition = `${xPercent * 100}% ${yPercent * 100}%`;
}

const show = ref(false);

function click() {
  if (isMobile || enableFeatureMouseZoom) return;
  show.value = true;
}
</script>

<template>
  <div
    class="zoom"
    @click="click"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    ref="zoom"
  >
    <img :src="src" ref="image" draggable="false">
  </div>

  <q-dialog v-model="show">
    <div class="image-dialog" ref="dialog">
      <img :src="src">
    </div>
  </q-dialog>
</template>

<style lang="scss" scoped>
.zoom {
  position: relative;
  cursor: zoom-in;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.image-dialog {
  position: relative;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>