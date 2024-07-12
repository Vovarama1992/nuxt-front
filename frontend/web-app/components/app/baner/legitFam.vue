<template>
  <div class="a" style="margin-top: 12rem; position: relative">
    <p
      style="
        top: 7.2rem;
        left: 8rem;
        position: absolute;
        font-size: 4.2rem;
        font-weight: 500;
        line-height: 5.641rem;
        color: white;
      "
    >
      И не боимся<br />
      честных проверок<br />
      от сервиса Legit Fam<br />
    </p>

    <p
      style="
        position: absolute;
        top: 30rem;
        left: 8rem;
        font-size: 2.3rem;
        font-weight: 300;
        line-height: 3.287rem;
        color: white;
      "
    >
      Проверяйте оригинальность<br />вещей в приложении сервиса.
    </p>

    <div style="position: absolute; left: 8rem; bottom: 7.2rem; display: flex">
      <a
        href="https://play.google.com/store/apps/details?id=agency.galt.legitfam"
        target="_blank"
      >
        <img
          src="~/public/google-play.png"
          style="width: 20rem; cursor: pointer; transition: all 0.2s"
          class="tra"
          alt=""
        />
      </a>
      <a
        href="https://apps.apple.com/ru/app/legit-fam/id6446854120"
        target="_blank"
      >
        <img
          src="~/public/app-store.png"
          style="
            width: 20rem;
            margin-left: 2rem;
            cursor: pointer;
            transition: all 0.2s;
          "
          class="tra"
          alt=""
        />
      </a>
    </div>
    <img src="~/public/card.png" alt="Legit Fam Banner" style="width: 100%" />
  </div>

  <div
    class="b"
    style="
      padding: 0 1.1rem;
      margin-top: 5rem;
      position: relative;
      overflow: hidden;
    "
  >
    <img src="~/public/legit-fam.png" style="max-width: 100%" alt="" />

    <div
      style="
        position: absolute;
        width: calc(100% - 2rem);
        bottom: 2.6rem;
        display: flex;
        align-items: center;
        flex-direction: column;
      "
    >
      <a
        href="https://play.google.com/store/apps/details?id=agency.galt.legitfam"
        target="_blank"
      >
        <img
          src="~/public/google-play.png"
          style="width: 20rem; cursor: pointer; transition: all 0.2s"
          class="tra"
          alt=""
        />
      </a>
      <a
        href="https://apps.apple.com/ru/app/legit-fam/id6446854120"
        target="_blank"
      >
        <img
          src="~/public/app-store.png"
          style="
            width: 20rem;
            margin-top: 1.5rem;
            cursor: pointer;
            transition: all 0.2s;
          "
          class="tra"
          alt=""
        />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a { display: block; }
.b { display: none; }

.tra {
  transition: scale 0.1s;
  &:active {
    scale: 0.95;
  }
}

@media (max-width: 720px) {
  .a { display: none; }
  .b { display: block; }
}
</style>
