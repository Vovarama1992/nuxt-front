<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const route = useRoute();
const id = route.path.split("/").at(-1) as string;
</script>

<template>
  <q-page>
    <div class="page-padding">
      <div class="container">
        <h1>Заказ оформлен!</h1>
        <h2>Идентификатор заказа:<br />{{ id }}</h2>
        <p class="container__title">Важно!</p>
        <p class="container__text">
          После оформления заказа,<br />
          перейдите в нашего
          <a href="https://t.me/Threehundredru_bot" target="_blank">telegram бота (3HUNDRED.RU),</a>
          <br />
          свяжитесь с менеджером и оплатите заказ
        </p>

        <div class="container__btns">
          <ui-btn class="container__btn" @click="navigateTo('/profile/orders')"> Перейти в заказы </ui-btn>
          <ui-btn class="container__btn" @click="navigateTo('/')"> Вернуться на главную </ui-btn>
        </div>
      </div>
    </div>
  </q-page>
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
