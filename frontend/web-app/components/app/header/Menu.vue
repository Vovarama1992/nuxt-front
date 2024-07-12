<script setup lang="ts">
const header = useHeaderStore();
const a = computed(() => header.$state.showMenu);

const components = {
  search: defineAsyncComponent(() => import('@/components/app/modal/Search.vue')),
  auth: defineAsyncComponent(() => import('@/components/app/modal/Auth.vue')),
  menu: defineAsyncComponent(() => import('@/components/app/modal/Menu.vue')),
  none: "",
}

watch(a, () => {
  if (header.$state.showMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});
</script>

<template>
  <Transition name="fade">
    <div class="header-menu" v-show="header.$state.showMenu">
      <div v-if="header.$state.showMenu" class="header-menu__bg"></div>

      <Transition name="slide">
        <div v-if="header.$state.showMenu" class="header-menu__body">
          <KeepAlive>
            <Suspense>
            <template #default>
              <component :is="components[header.$state.currentMenuNema]" />
            </template>

            <template #fallback>
              <div style="display: flex; height: 100%; justify-content: center; align-items: center;">
                <q-spinner color="black" size="5em" />
              </div>
            </template>
          </Suspense>
          </KeepAlive>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.header-menu {
  left: 0;
  top: 15.2rem;
  width: 100%;
  position: fixed;
  z-index: 99;
  height: calc(100vh - 15.2rem);
  
  @media (max-width: 720px) {
    top: 8.4rem;
    height: calc(100vh - 8.4rem);
  }

  &__bg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.25);
  }

  &__body {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    background-color: white;
    border-top: 1px solid var(--auxiliary_line_color);
    
    @media (max-width: 720px) {
      border-color: transparent;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter-from,
.slide-leave-to /* .slide-leave-active в версиях <2.1.8 */ {
  transform: translateY(-100%);
}
</style>
