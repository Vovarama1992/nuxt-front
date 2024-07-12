<template>
  <div class="header-btn-location">
    <svg viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.15">
        <path d="M6.98525 15.8406C6.69473 16.0531 6.30527 16.0531 6.01475 15.8406C1.82986 12.7798 -2.6125 6.48631 1.87781 1.93892C3.10369 0.697449 4.76634 0 6.5 0C8.23366 0 9.89631 0.697449 11.1222 1.93892C15.6125 6.48632 11.1701 12.7798 6.98525 15.8406Z" fill="black"/>
        <path d="M6.5 8.47059C7.52567 8.47059 8.35714 7.62783 8.35714 6.58824C8.35714 5.54864 7.52567 4.70588 6.5 4.70588C5.47433 4.70588 4.64286 5.54864 4.64286 6.58824C4.64286 7.62783 5.47433 8.47059 6.5 8.47059Z" fill="white"/>
        <path d="M6.98525 15.8406C6.69473 16.0531 6.30527 16.0531 6.01475 15.8406C1.82986 12.7798 -2.6125 6.48631 1.87781 1.93892C3.10369 0.697449 4.76634 0 6.5 0C8.23366 0 9.89631 0.697449 11.1222 1.93892C15.6125 6.48632 11.1701 12.7798 6.98525 15.8406Z" stroke="white"/>
        <path d="M6.5 8.47059C7.52567 8.47059 8.35714 7.62783 8.35714 6.58824C8.35714 5.54864 7.52567 4.70588 6.5 4.70588C5.47433 4.70588 4.64286 5.54864 4.64286 6.58824C4.64286 7.62783 5.47433 8.47059 6.5 8.47059Z" stroke="white"/>
      </g>
    </svg>

    <span>
      {{ 'Москва' }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.header-btn-location {
  display: flex;
  cursor: pointer;
  justify-content: center;

  &:hover span {
    text-decoration: underline;
  }

  svg {
    width: 1.3rem;
  }

  span {
    margin-left: .8rem;
    font-weight: 400;
    font-size: 1.2rem;
  }

  @media (max-width: 720px) {
    span {
      font-size: 1.5rem;
      margin-left: 1.2rem;
    }

    svg {
      width: 1.4rem;
    }
  }
}
</style>