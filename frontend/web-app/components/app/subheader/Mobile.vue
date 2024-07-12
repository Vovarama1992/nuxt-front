<script setup lang="ts">
withDefaults(
  defineProps<{title?: string}>(),
  { title: '' },
);

const router = useRouter();
const { isMobile } = useDevice();
</script>

<template>
  <div :class="isMobile ? '' : 'subheader__container'">
    <div class="subheader" :class="isMobile ? '' : 'subheader__desktop'">
      <q-btn flat @click="router.back()" v-if="isMobile">
        <svg style="width: 1.2rem; height: 2.4rem; position: relative; left: -.55rem;" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 25L1 13L13 1" stroke="#C2C2C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </q-btn>

      <div style="display: flex; justify-content: center; align-items: center;">
        <span class="subheader__title" :class="isMobile ? '' : 'subheader__title_desktop'">{{ title }}</span>
      </div>

      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.subheader {
  width: 100%;
  display: grid;
  height: 8.4rem;
  padding: 0 1rem;
  background-color: #fff;
  grid-template-columns: 1fr 4fr 1fr;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  box-shadow: 0 4px 59px 5px rgba(0, 0, 0, 0.09);

  &__title {
    font-size: 2rem;
    font-weight: 600;

    &_desktop {
      font-size: 40px;
    }
  }

  &__desktop {
    box-shadow: none;
    margin: auto;
    height: 147px;
    grid-template-columns: auto 1fr;
    width: min(1025px, 95%);
    border-bottom: 0;
  }

  &__container {
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
}
</style>