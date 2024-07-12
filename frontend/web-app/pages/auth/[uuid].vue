<script setup lang="ts">
import { verify } from "~/api/api";

const route = useRoute();
const { data } = await verify(route.path.split("/").at(-1) || "");
const accessToken = useCookie("access_token");

if (data.value?.access_token) {
  accessToken.value = data.value?.access_token;
}

await navigateTo("/profile");
</script>

<template>
  <div class="page-padding">
    <div class="container">
      <h1>Авторизация</h1>
      <h2>Этот процесс занимает немного времени</h2>

      <div style="display: flex; justify-content: center; align-items: center; margin-top: 10rem;">
        <q-spinner size="5rem" color="black" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: auto;
  max-width: 1025px;

  h1,
  h2 {
    margin: 0;
    font-size: 4rem;
    font-weight: 500;
    line-height: 4.686rem;
    text-align: center;
    margin-bottom: 2.6rem;
  }

  h2 {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.5rem;
    color: var(--text_secondary_color);
  }

  &__btns {
    gap: 1.2rem;
    display: flex;
    justify-content: center;
  }

  &__btn {width: 50%;}

  &__title {
    text-align: center;
    font-weight: 500;
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }

  &__text {
    text-align: center;
    font-weight: 400;
    font-size: 1.4rem;
    margin-bottom: 5.2rem;
  }

  @media (max-width: 720px) {
    h1 {
      font-size: 2.2rem;
    }

    h2,
    p {
      font-size: 1.2rem;
    }

    &__btns {flex-wrap: wrap;}
    &__btn {width: 100%;}
  }
}
</style>