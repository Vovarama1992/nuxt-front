<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'profile'
});

const balls = ref(0);
const history = ref([]);
const promocode = ref("LSJ77U");

try {
  const result = await $fetch<{
    _id: string;
    scores: {
      quantity: number;
      history: [];
    };
    promocode: string;
  }>("https://api.3hundred.ru/v1/profile/scores", {
    headers: {
      Authorization: "Bearer " + useCookie("access_token").value,
    },
  });

  balls.value = result.scores.quantity;
  history.value = result.scores.history;
  if (result.promocode) {
    promocode.value = result.promocode;
  }
} catch (err) {}

const { isMobile } = useDevice();
</script>

<template>
  <app-container-info v-if="!isMobile" :quantity="''" :prefix="''">
    <span style="font-weight: 500; font-size: 2rem;">Система баллов</span>
  </app-container-info>

  <app-subheader-mobile v-else title="Система баллов">

  </app-subheader-mobile>

  <div class="container" :class="{'row': !isMobile}" style="margin-top: 2rem">
    <div :class="{'coll': !isMobile}">
      <p class="ball__title" :style="{'text-align': isMobile ? 'center' : 'left'}">Ваш баланс</p>
      <p class="ball__score" :style="{'margin': isMobile ? 'auto' : ''}">{{ balls }} баллов</p>
      <p class="ball__obmen" :style="{'text-align': isMobile ? 'center' : 'left'}">1 балл = 1 Рубль</p>
      <p class="ball__subtitle" :style="{'text-align': isMobile ? 'center' : 'left'}">Как это работает?</p>
      <p class="ball__text" :style="{'text-align': isMobile ? 'center' : 'left'}">
        Все просто: баллы приходят в виде<br />
        кэшбека, до 15% с каждого заказа.<br />
        Используйте их при оформлении<br />
        заказа и экономьте на покупках!
      </p>
    </div>
    <div v-if="!isMobile" class="coll" style="width: 30rem; margin-left: 4rem;">
      <p class="ball__title">История зачислений</p>

      <div v-for="h in history" :key="h.date" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0, 0, 0, .1);">
        <div>
          <p style="font-size: 1.2rem; font-weight: 400; line-height: 1.8rem; margin-bottom: .7rem;">
            {{ h.message }}
          </p>
          <p
            style="
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.2rem;
              opacity: .5;
              border-bottom: 0;
            "
          >
            {{ h.date }}
          </p>
        </div>

        <p class="ball__score">+{{ h.quantity }}</p>
      </div>
    </div>
  </div>

  <div v-if="isMobile" class="container" style="margin-top: 2rem;">
    <div class="" style="">
      <p class="ball__title" style="text-align: center;">История зачислений</p>

      <div style="text-align: center;font-family: Geologica;
font-size: 1.5rem;
font-weight: 400;
line-height: 22.5px;
color: rgba(150, 150, 150, 1);
">
        Зачислений еще нет 
      </div>
    </div>
  </div>

  <div class="container" v-if="!isMobile"  style="margin-top: 2rem;">
    <p class="ball__title">
      <span class="ball__score" style="display: inline">Экономьте</span> с
      друзьями!
    </p>

    <p class="ball__subtitle">
      Оформив заказ по вашему промокоду, ваш друг получит удвоенный<br />кэшбек
      в виде баллов, а вы — 500 баллов на счет!
    </p>

    <div class="row q-gutter-lg" style="margin-top: 1.8rem">
      <input
        type="text"
        class="col"
        style="
          height: 7.1rem;
          border-radius: 7.1rem;
          background-color: #f1f1f1;
          text-align: center;
          color: #969696;
          font-weight: 500;
          font-weight: 1.5rem;
          border: 0;
          outline: none;
        "
        v-model="promocode"
      />
      <q-btn
        flat
        class="col"
        style="
          height: 7.1rem;
          border: 1px solid #d6d6d6;
          border-radius: 0.8rem;
          background-color: white;
          color: black;
          font-weight: 500;
          text-transform: none;
        "
      >
        Скопировать промокод
        <svg
          style="margin-left: 2rem"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8236 9.33333L15.0753 6.08168C16.2725 4.88443 16.3125 2.98336 15.1646 1.83544C14.0167 0.687536 12.1155 0.727518 10.9183 1.92474L7.66666 5.1764M9.33334 11.8014L6.0903 15.0357C4.89627 16.2265 3.05737 16.3808 1.85533 15.1245C0.65334 13.8682 0.750362 12.0918 1.94439 10.901L5.18742 7.66667M5.99999 11L11 6"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </q-btn>
    </div>
  </div>
  <div class="container" v-if="isMobile"  style="margin-top: 2rem; margin-bottom: 2rem;">
    <p class="ball__title" style="text-align: center; margin: auto; margin-bottom: 4rem;">
      <span class="ball__score" style="display: inline; text-align: center; margin: auto;">Экономьте</span> с
      друзьями!
    </p>

    <p class="ball__subtitle" style="text-align: center;">
      Оформив заказ по вашему промокоду, ваш друг получит удвоенный<br />кэшбек
      в виде баллов, а вы — 500 баллов на счет!
    </p>

    <div class="q-gutter-lg" style="margin-top: 1.8rem">
      <input
        type="text"
        class="col"
        disabled
        style="
          width: 93%;
          height: 7.1rem;
          border-radius: 7.1rem;
          background-color: #f1f1f1;
          text-align: center;
          color: #969696;
          font-weight: 500;
          font-weight: 1.5rem;
          border: 0;
          outline: none;
        "
        v-model="promocode"
      />
      <q-btn
        flat
        class="col"
        style="
          width: 93%;
          height: 7.1rem;
          border: 1px solid #d6d6d6;
          border-radius: 0.8rem;
          background-color: white;
          color: black;
          font-weight: 500;
          text-transform: none;
        "
      >
        Скопировать промокод
        <svg
          style="margin-left: 2rem"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8236 9.33333L15.0753 6.08168C16.2725 4.88443 16.3125 2.98336 15.1646 1.83544C14.0167 0.687536 12.1155 0.727518 10.9183 1.92474L7.66666 5.1764M9.33334 11.8014L6.0903 15.0357C4.89627 16.2265 3.05737 16.3808 1.85533 15.1245C0.65334 13.8682 0.750362 12.0918 1.94439 10.901L5.18742 7.66667M5.99999 11L11 6"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ball {
  &__title {
    font-size: 2.5rem !important;
    font-weight: 400;
    line-height: 2.929rem;
    margin-bottom: 2.6rem;
  }

  &__score {
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 2.929rem;
    background: linear-gradient(90.12deg, #30c899 0.09%, #209b67 99.88%);
    display: table;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    margin-bottom: 1.4rem;
  }

  &__obmen {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.8rem;
    opacity: 0.5;
    margin-bottom: 2.3rem;
  }

  &__subtitle {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 2.25rem;
    margin-bottom: 0.8rem;
  }

  &__text {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 2.25rem;
    color: rgba(150, 150, 150, 1);
  }
}

.page {
  padding-bottom: 3rem;
  gap: 1.2rem;
  margin: auto;
  display: grid;
  width: min(1025px, 95%);
  grid-template-columns: auto 325px;

  &__container {
    border-radius: 2rem;
    padding: 2.3rem 1.8rem;
    padding-top: 3.3rem;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    gap: 2.5rem;
  }
}
</style>
