<script setup lang="ts">
const balls = ref(0);

try {
  const result = await $fetch<{
    _id: string;
    scores: {
      quantity: number;
    };
  }>('http://localhost:8080/v1/profile/scores', {
    headers: {
      Authorization: 'Bearer ' + useCookie('access_token').value,
    },
  });

  balls.value = result.scores.quantity;
} catch (err) {}
</script>

<template>
  <div class="ball-card">
    <div class="ball-card__header">
      <span class="ball-card__title">Ваш баланс</span>
      <span class="ball-card__subtitle">1 балл = 1 Рубль</span>
    </div>

    <div class="ball-card__score">
      <svg style="width: 2rem; height: 2.3rem; margin-right: 1rem;" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1C5.47715 1 1 2.64755 1 4.67991C1 9.99558 21 9.99558 21 4.67991C21 2.64755 16.5228 1 11 1Z" fill="white"/>
        <path d="M21 12.1806C21 18.1435 1 18.1435 1 12.1806H21Z" fill="white"/>
        <path d="M1 4.83333V20.378C1 25.2073 21 25.2073 21 20.378V4.83333" fill="white"/>
        <path d="M21 12.1806C21 18.1435 1 18.1435 1 12.1806M1 4.83333V20.378C1 25.2073 21 25.2073 21 20.378V4.83333M1 4.67991C1 2.64755 5.47715 1 11 1C16.5228 1 21 2.64755 21 4.67991C21 9.99558 1 9.99558 1 4.67991Z" stroke="#32C79D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      {{ balls }} баллов
    </div>

    <q-btn flat class="ball-card__btn" @click="navigateTo('/profile/balls')">
      Подробнее про баллы
      <svg style="width: .6rem; height: 1.2rem; margin-left: 1rem;" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13L7 7L1 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </q-btn>
  </div>
</template>

<style scoped lang="scss">
.ball-card {
  width: 100%;
  height: 18.2rem;
  border-radius: 2.8rem;
  padding: 2.7rem 2.7rem;
  border: 1px solid #e5e5e5;
  background: radial-gradient(
      90.93% 90.93% at 50.17% 90.93%,
      rgba(66, 232, 152, .5) 0%,
      rgba(79, 226, 247, .5) 100%
    ), linear-gradient(90deg, #10b74f 0%, #257f6f 100%);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title,
  &__subtitle {
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 117%;
    color: #fff;
  }

  &__subtitle {
    opacity: 0.56;
    font-size: 1.2rem;
  }

  &__score {
    margin-top: 1.9rem;
    display: flex;
    align-items: center;
    color: #fff;
    font-weight: 400;
    font-size: 2.5rem;
    line-height: 117%;
  }

  &__btn {
    width: 100%;
    height: 4.9rem;
    margin-top: 1.8rem;
    background-color: rgba(255, 255, 255, .34);
    color: #fff;
    text-transform: none;
    font-weight: 500;
    font-size: 1.2rem;
    border-radius: 1.1rem;
  }
}
</style>
