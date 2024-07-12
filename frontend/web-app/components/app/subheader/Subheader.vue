<template>
  <div class="subheader">
    <div class="page-container">
      <div class="subheader__btn-back">
        <svg style="width: 1.2rem; height: 2.4rem; position: relative; left: 1rem;" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 25L1 13L13 1" stroke="#C2C2C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h1><slot name="default" /></h1>

      <div class="subheader__btns">
        <slot name="control"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.subheader {
  width: 100%;
  height: 11.4rem;
  background-color: white;
  border-top: 1px solid var(--auxiliary_line_color);
  border-bottom: 1px solid var(--auxiliary_line_color);

  &__btn-back {
    width: 3.4rem;
    display: none;
  }

  .page-container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    margin: 0;
    font-size: 4rem;
    font-weight: 500;
  }

  @media (max-width: 720px) {
    border-top: 0;
    height: 8.4rem;
    &__btn-back { display: block; }

    h1 {
      font-size: 2rem;
      font-weight: 600;
    }
  }
}
</style>