<template>
  <div class="a" style="margin-top: 12rem; position: relative">
    <a href="https://www.cdek.ru/ru/tracking/" target="_blank">
      <q-btn
        style="
          width: 28rem;
          height: 7rem;
          text-transform: none;
          color: #009834;
          font-size: 1.5rem;
          position: absolute;
          left: 8rem;
          bottom: 9rem;
          background-color: #fff;
          border-radius: 1.6rem;
        "
        flat
      >
        Отследить посылку
        <svg
          style="margin-left: 1.2rem"
          width=".9rem"
          viewBox="0 0 9 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M1.5 1L7.5 7L1.5 13"
            stroke="#009834"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </q-btn>
    </a>
    <img src="~/public/cdek-baner.png" style="width: 100%" alt="" />
  </div>

  <div class="b" style="padding: 0 1.1rem; margin-top: 5rem; position: relative">
    <a href="https://www.cdek.ru/ru/tracking/" target="_blank">
      <q-btn
        style="
          width: 29.5rem;
          height: 7.2rem;
          text-transform: none;
          color: #009834;
          font-size: 1.8rem;
          position: absolute;
          left: 0rem;
          right: 0;
          margin: auto;
          bottom: 2.8rem;
          background-color: #fff;
          border-radius: 1.6rem;
        "
        flat
      >
        Отследить посылку
      </q-btn>
    </a>
    <img src="~/public/cdek-green.png" style="max-width: 100%" alt="" />
  </div>
</template>

<style scoped lang="scss">
.a { display: block; }
.b { display: none; }

@media (max-width: 720px) {
  .a { display: none!important; }
  .b { display: block; }
}
</style>
