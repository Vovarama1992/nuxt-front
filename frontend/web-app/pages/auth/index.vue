<template>
  <div class="page-padding">
    <div class="container">
      <app-modal-auth />
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