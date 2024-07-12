<script setup lang="ts">
useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
});

const app = useNuxtApp();
const cart = useCartStore();
const favorites = useFavoritesStore();
const header = useHeaderStore();
const route = useRoute();

app.hook("page:start", () => {
  header.hide();
  header.$state.loading = true;
});

app.hook("page:finish", () => {
  header.$state.loading = false;
});

onMounted(() => {
  if (process.client) {
    cart.laod();
    favorites.laod();
  }
});

const layout = computed(() => {
  if (route.path.split("/").includes("profile")) {
    return "profile";
    }
  return "default";
});
</script>

<template>
  <NuxtLayout :name="layout">
    <div>
      <NuxtPage class="page-control" />
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&display=swap");

:root {
  --bg_container_color: #fff;
  --bg_container_color_2: #f1f1f1;
  --auxiliary_line_color: rgba(0, 0, 0, 0.1);
  --text_secondary_color: rgba(0, 0, 0, 0.5);
}

.page-control {
  transition: opacity 0.2s;
}

.loading-page {
  opacity: 0.5;
}

* {
  font-family: "Geologica", Courier, monospace;
}

html,
body {
  background-color: var(--bg_container_color_2);
}

html {
  font-size: 10px;

  @media (max-width: 640px) {
    font-size: calc(2 / 125 * 100vw);
  }

  @media (max-width: 430px) {
    font-size: calc(2 / 85 * 100vw);
  }

  @media (max-width: 375px) {
    font-size: calc(2 / 75 * 100vw);
  }
}

.page {
  &-container {
    margin: auto;
    width: min(1025px, 100%);

    @media (max-width: 1024px) {
      padding: 0 1.6rem;
    }
  }

  &-padding {
    padding-block: 3rem;
  }
}

a {
  text-decoration: none;
  color: rgba(57, 142, 241, 1);

  &:hover {
    text-decoration: underline;
  }
}

.container {
  border-radius: 2rem;
  padding: 2.6rem 2.4rem;
  border: 1px solid rgba(229, 229, 229, 1);
  background-color: var(--bg_container_color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

html {
  @media (max-width: 720px) {
    .page-padding {
      padding-block: 2.2rem;
    }

    .container {
      border-radius: 0;
      padding: 3.4rem 1.1rem;
      border-left-color: transparent;
      border-right-color: transparent;
    }
  }
}
</style>
