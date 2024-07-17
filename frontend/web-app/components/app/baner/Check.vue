<!-- TODO: tl;dr fix everything here, <br />s are bad, styling using style attributes is bad, one letter class names are bad -->
<template>
  <div
    class="banner a"
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 11rem;
    "
  >
    <div>
      <div>
        <p class="ad-title" style="margin-left: 0">Проверяем товар</p>
        <p class="ad-title" style="margin-left: 0">на каждом этапе</p>
      </div>

      <p class="ad-text">
        Мы ежедневно контролируем качество<br />товара от склада до доставки,
        что<br />помогает нам поддерживать высокие<br />стандарты и получать
        положительные<br />отзывы от покупателей.
      </p>
    </div>
    <div style="position: relative">
      <img
        src="~/public/box1.png"
        style="
          position: absolute;
          width: 25.175rem;
          height: 33.1rem;
          left: -47rem;
          top: -20rem;
        "
      />
      <img
        src="~/public/box2.png"
        style="
          position: absolute;
          width: 25.175rem;
          height: 33.1rem;
          left: -25rem;
          top: -16rem;
        "
      />
    </div>
  </div>

  <div class="b" style="margin-top: 6rem">
    <div
      style="
        font-weight: 500;
        font-size: 2.8rem;
        text-align: center;
        line-height: 120%;
        display: flex;
        align-items: center;
        flex-direction: column;
        color: #303030;
      "
    >
      Проверяем товар<br />на каждом этапе
    </div>

    <p
      style="
        font-weight: 300;
        font-size: 1.5rem;
        line-height: 143%;
        text-align: center;
        margin-top: 2rem;
        color: #303030;
      "
    >
      Мы ежедневно контролируем качество<br />
      товара от склада до доставки, что<br />
      помогает нам поддерживать высокие<br />
      стандарты и получать положительные<br />
      отзывы от покупателей.
    </p>

    <div style="text-align: center; margin-top: 3rem">
      <img
        src="~/public/box3.png"
        style="max-width: 30.5rem; position: relative; left: -0.1rem"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.a { display: block; }
.b { display: none; }

.ad-title {
  font-weight: 500;
  font-size: 5rem;
  line-height: 7.678rem;
  margin-bottom: 0;
  color: rgba(48, 48, 48, 1);
  margin-left: 2rem;
}

.ad-text {
  font-weight: 300;
  font-size: 2.3rem;
  line-height: 3.287rem;
  margin-bottom: 0;
  margin-top: 3.6rem;
  color: rgba(48, 48, 48, 1);
}

.ad-title-glav {
  display: flex;
  align-items: center;
  border-radius: 1.6rem;
  background: rgba(48, 48, 48, 1);
  width: 51.3rem;
  height: 7.4rem;
  margin-top: 1.4rem;

  P {
    color: white;
    line-height: 100%;
    margin-bottom: 1rem;
  }

  svg {
    margin-left: 2.2rem;
  }
}

.tra {
  &:hover {
    scale: 1.1;
  }
}

@media (max-width: 720px) {
  .a { display: none!important; }
  .b { display: block; }
}
</style>
