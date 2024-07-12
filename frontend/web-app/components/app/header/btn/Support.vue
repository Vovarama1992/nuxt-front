<template>
  <NuxtLink to="/news/66804a200c936172eb4a68b1" style="color: black">
    <div class="header-btn-support" >
      <span>
        {{ 'Поддержка' }}
      </span>
  
      <svg viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.15" d="M13.7212 0.123596C13.7212 0.123596 15.1088 -0.482403 14.9932 0.98931C14.9546 1.59532 14.6077 3.71632 14.3379 6.01048L13.4128 12.8064C13.4128 12.8064 13.3357 13.8019 12.6419 13.9751C11.9481 14.1482 10.9074 13.3691 10.7147 13.1959C10.5605 13.0661 7.82387 11.1182 6.8602 10.1659C6.59041 9.90621 6.28204 9.38677 6.89874 8.78075L10.9459 4.45219C11.4085 3.93276 11.871 2.72076 9.94378 4.19248L4.54754 8.30461C4.54754 8.30461 3.93082 8.73749 2.7745 8.34792L0.269078 7.48221C0.269078 7.48221 -0.655996 6.83293 0.92434 6.18361C4.77883 4.14916 9.51983 2.07144 13.7212 0.123596Z" fill="black"/>
      </svg>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.header-btn-support {
  display: flex;
  cursor: pointer;
  justify-content: center;

  &:hover span {
    text-decoration: underline;
  }

  svg {
    width: 1.5rem;
    margin-left: .8rem;
  }

  span {
    font-weight: 400;
    font-size: 1.2rem;
  }

  @media (max-width: 720px) {
    flex-direction: row-reverse;

    span {
      font-size: 1.5rem;
    }

    svg {
      width: 1.6rem;
      margin-left: 0;
      margin-right: 1.2rem;
    }
  }
}
</style>