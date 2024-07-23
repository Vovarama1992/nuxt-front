<script setup lang="ts">
const header = useHeaderStore();
const { isMobile } = useDevice();
const headerElement = ref<HTMLElement | null>(null);

const links = [
  { to: "/catalog", text: "Каталог" },
  { to: "/news/6681affb0c936172eb4a68b4", text: "Доставка" },
  { to: "/news/6681afa30c936172eb4a68b3", text: "Отзывы" },
  { to: "/news", text: "Новости" },
  { to: "/news/6681b07d0c936172eb4a68b5", text: "Индивидуальный заказ" },
];
</script>

<template>
  <div class="header-space">
    <app-header-menu />
    <header
      class="header"
      :class="{
        header_active: header.$state.showMenu || header.$state.loading,
      }"
    >
      <div class="header__container page-container header__group">
        <div class="header__container header__container_nest">
          <div style="display: flex; justify-content: flex-start">
            <app-header-btn-location />
          </div>

          <div class="header__links">
            <NuxtLink v-for="link in links" :to="link.to" :key="link.text">
              {{ link.text }}
            </NuxtLink>
          </div>

          <div style="display: flex; justify-content: flex-end">
            <app-header-btn-support />
          </div>
        </div>

        <q-separator />

        <div class="header__container header__container_nest">
          <div style="display: flex; align-items: center; gap: 1.8rem">
            <app-header-btn-cart class="header__desktop" />
            <app-header-btn-favorites class="header__desktop" />
            <app-header-btn-burger class="header__mobile" />
          </div>

          <div style="display: flex; justify-content: center">
            <NuxtLink to="/" class="header__logo">
              <svg
                class="logo"
                viewBox="0 0 187 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.0990149 16.0001H8.79799L8.76428 16.4997C8.76428 18.0112 9.45941 18.767 10.8483 18.767C11.5975 18.767 12.2259 18.5108 12.7336 17.9999C13.2405 17.489 13.494 16.8662 13.494 16.1331C13.494 14.9329 12.7336 14.3328 11.212 14.3328L10.5506 14.3993L11.3447 9.43303L11.9394 9.49955C12.5131 9.49955 13.0144 9.29433 13.4448 8.88248C13.8746 8.47204 14.0894 7.99932 14.0894 7.46575C14.0894 6.59958 13.6702 6.16649 12.8326 6.16649C11.7962 6.16649 11.113 6.78923 10.7823 8.03329H2.34801C2.72296 6.67742 3.13091 5.63292 3.57186 4.8998C5.53438 1.63327 8.90751 0 13.6927 0C16.4711 0 18.659 0.554804 20.2578 1.66582C21.8566 2.77825 22.6557 4.28839 22.6557 6.19905C22.6557 7.35536 22.3137 8.41684 21.6305 9.38349C20.9466 10.3501 19.9987 11.1003 18.7861 11.6324C20.9466 12.367 22.0272 13.9111 22.0272 16.2661C22.0272 17.9334 21.4318 19.5001 20.2417 20.9664C18.0804 23.6555 14.6848 25 10.0541 25C6.70276 25 4.17781 24.3107 2.48071 22.9336C1.79681 22.3548 1.21262 21.5495 0.727433 20.5163C0.242244 19.4831 0 18.4882 0 17.5328L0.0990149 16.0001Z"
                  fill="black"
                />
                <path
                  d="M22.5889 24.533L26.3925 0.499602H35.0248L33.7356 8.59941H38.7293L40.0199 0.499602H48.6184L44.8479 24.533H36.2493L37.5722 16.0666H32.5448L31.2219 24.533H22.5889Z"
                  fill="black"
                />
                <path
                  d="M72.6643 0.499602L70.3486 15.066C70.1506 16.4657 69.8192 17.6659 69.3558 18.6665C68.4964 20.689 67.0513 22.2501 65.0235 23.3498C62.9943 24.4494 60.614 25 57.8798 25C54.7917 25 52.4325 24.3617 50.8021 23.0823C49.1703 21.8056 48.3544 19.9332 48.3544 17.4663C48.3544 16.7332 48.4204 15.9335 48.5524 15.066L50.8344 0.499602H59.3024L57.1847 14.0328L56.9867 15.7326C56.9867 16.3327 57.1847 16.7884 57.5821 17.0998C57.9781 17.4111 58.4752 17.5668 59.0707 17.5668C59.6001 17.5668 60.1 17.4111 60.5747 17.0998C61.0493 16.7884 61.3737 16.4558 61.5507 16.0991C61.6391 15.8557 61.7276 15.5387 61.8161 15.1495C61.9032 14.7617 61.9804 14.388 62.0464 14.0328L64.1641 0.499602H72.6643Z"
                  fill="black"
                />
                <path
                  d="M70.9118 24.533L74.7146 0.499602H83.2149L87.9109 10.9333L88.3083 11.9664L89.2337 15.1664L89.0034 11.5333C89.0034 10.9559 89.0245 10.6106 89.0694 10.5002L90.624 0.499595H99.0245L95.2863 24.5329H86.5557L82.024 14.3993L81.6603 13.4992C81.5058 13.0548 81.3514 12.5439 81.1969 11.9664C81.0424 11.389 80.9104 10.8554 80.8009 10.3657C80.9329 11.4329 80.9989 12.3556 80.9989 13.1326V13.9323C80.9989 14.2451 80.9764 14.5324 80.9329 14.7999L79.412 24.533H70.9118Z"
                  fill="black"
                />
                <path
                  d="M97.3703 24.533L101.173 0.499602H110.071C114.017 0.499602 117.043 1.37143 119.15 3.11651C121.255 4.86158 122.308 7.36668 122.308 10.6332C122.308 14.589 120.979 17.8937 118.322 20.5503C115.666 23.2054 112.363 24.533 108.417 24.533H97.3703ZM108.582 7.99932L107.094 17.3333H107.887C109.628 17.3333 111.024 16.8167 112.072 15.7835C113.118 14.7489 113.642 13.3888 113.642 11.6989C113.642 9.23347 112.287 7.99932 109.574 7.99932H108.582Z"
                  fill="black"
                />
                <path
                  d="M121.944 24.533L125.747 0.499602H136.927C139.329 0.499602 141.276 1.13932 142.764 2.41593C144.252 3.69396 144.996 5.35552 144.996 7.39923C144.996 9.15563 144.561 10.728 143.69 12.1164C142.819 13.5049 141.436 14.5111 139.539 15.1325L144.268 24.5329H134.379L132.229 17.9334L131.536 15.533V17.0332C131.536 17.9659 131.491 18.6 131.404 18.9326L130.51 24.5329L121.944 24.533ZM133.288 7.00012L132.627 11.2333H133.784C134.556 11.2333 135.206 10.9998 135.736 10.5327C136.22 10.0444 136.463 9.42171 136.463 8.66593C136.463 8.17765 136.275 7.77712 135.902 7.46576C135.525 7.1558 135.052 7.00012 134.479 7.00012H133.288Z"
                  fill="black"
                />
                <path
                  d="M144.236 24.533L148.039 0.499602H163.915L162.923 7.00011H155.546L155.183 9.26602H161.864L160.872 15.567H154.224L153.86 17.7989H161.369L160.342 24.533H144.236Z"
                  fill="black"
                />
                <path
                  d="M162.062 24.533L165.865 0.499602H174.763C178.709 0.499602 181.735 1.37143 183.842 3.11651C185.947 4.86158 187 7.36668 187 10.6332C187 14.589 185.672 17.8937 183.015 20.5503C180.358 23.2054 177.055 24.533 173.109 24.533H162.062ZM173.274 7.99932L171.786 17.3333H172.579C174.321 17.3333 175.716 16.8167 176.764 15.7835C177.81 14.7489 178.334 13.3888 178.334 11.6989C178.334 9.23347 176.979 7.99932 174.266 7.99932H173.274Z"
                  fill="black"
                />
              </svg>
            </NuxtLink>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              gap: 1.8rem;
              justify-self: flex-end;
            "
          >
            <app-header-btn-search />
            <app-header-btn-preview class="header__desktop" v-if="!isMobile" />
          </div>
        </div>
      </div>

      <q-linear-progress
        v-if="header.$state.loading"
        indeterminate color="black"
        size="2px"
      />
    </header>
  </div>
</template>

<style scoped lang="scss">
.logo {
  overflow: visible;
}

.header {
  --headerHeight: 15.2rem;
  --bgContainerColor: var(--bg_container_color, white);

  top: 0;
  left: 0;
  width: 100%;
  position: absolute;
  height: var(--headerHeight, 15.2rem);
  background-color: var(--bgContainerColor);
  z-index: 100;

  &_active {
    position: fixed;
  }

  &__container {
    margin: auto;
    height: 100%;
    display: grid;
    grid-template-rows: 6.2rem 1px 8.9rem;

    &_nest {
      width: 100%;
      align-items: center;
      grid-template-rows: 1fr;
      grid-template-columns: 15% auto 15%;
    }
  }

  &__links {
    gap: 3.2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      color: black;
      font-weight: 400;
      font-size: 1.2rem;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__logo {
    width: 18.7rem;
    text-decoration: none;

    svg {
      display: block;
    }
  }

  &__group {
    z-index: 1;
    position: relative;
  }

  &__mobile {
    display: none;
    opacity: 0;
  }

  &-space {
    position: relative;
    height: var(--headerHeight, 15.2rem);
    box-shadow: 0px 4px 40.7px 0px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 720px) {
    --headerHeight: 8.4rem;

    border-bottom: 1px solid var(--auxiliary_line_color);

    &__group {
      grid-template-rows: 1fr;

      div:nth-child(1),
      hr:nth-child(2) {
        display: none;
      }
    }

    &-space {
      box-shadow: none;
      height: 8.4rem;
    }
    &__logo {
      width: 12.1rem;
    }
    &__mobile {
      display: block;
      opacity: 1;
    }
    &__desktop {
      display: none;
    }
  }
}
</style>
