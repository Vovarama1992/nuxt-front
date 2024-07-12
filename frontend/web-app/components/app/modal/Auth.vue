<template>
  <div class="page-container page-padding" style="display: flex; justify-content: center; align-items: center; height: 100%;">
    <div
    >
      <p
        style="
          font-weight: 400;
          font-size: 2rem;
          line-height: 117%;
          text-align: center;
          margin-bottom: 5.2rem;
        "
      >
        Вход в аккаунт<br />или регистрация
      </p>

      <q-btn
        flat
        style="
          background-color: #2f80ed;
          border-radius: 0.8rem;
          height: 8.2rem;
          color: #fff;
          font-size: 1.8rem;
          text-transform: none;
          width: 100%;
        "
        @click="
          () =>
            navigateTo('https://t.me/Threehundredru_bot?start=login', {
              external: true,
            })
        "
      >
        Использовать Telegram
      </q-btn>
    </div>
  </div>
</template>
