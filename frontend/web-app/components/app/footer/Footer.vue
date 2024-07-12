<script setup lang="ts">
type tableElement = {
  title: string;
  content: {
    title: string;
    to: string;
    external?: boolean;
  }[];
}[];

const tableElements = ref<tableElement>([
  {
    title: "Каталог",
    content: [
      {
        title: "Доставка",
        to: "/news/6681affb0c936172eb4a68b4",
      },
      {
        title: "Отзывы",
        to: "/news/6681afa30c936172eb4a68b3",
      },
      {
        title: "Возврат и обмен",
        to: "/",
      },
      {
        title: "Помощь",
        to: "/news/66804a200c936172eb4a68b1",
      },
      {
        title: "Гарантии для клиента",
        to: "/",
      },
      {
        title: "Оплата",
        to: "/news/6681af2f0c936172eb4a68b2",
      },
      {
        title: "Выбор размера",
        to: "/",
      },
    ],
  },
  {
    title: "Магазин",
    content: [
      {
        title: "О нас",
        to: "/",
      },
      {
        title: "Оригинальность",
        to: "/",
      },
      {
        title: "Сотрудничество",
        to: "/",
      },
    ],
  },
  { title: "Бренды", content: [] },
  {
    title: "Контакты",
    content: [{ title: "+7 (911) 597-79-74", to: "tel:79115977974" }],
  },
  {
    title: "Написать",
    content: [
      {
        title: "300hundredshop@gmail.com",
        to: "mailto:300hundredshop@gmail.com",
      },
    ],
  },
  {
    title: "Адрес",
    content: [
      {
        title: "Москва, Белореченская улица, 28",
        to: "https://yandex.ru/maps/213/moscow/house/belorechenskaya_ulitsa_28k1/Z04YcQFpSkwAQFtvfXp3cnRrbA==/?ll=37.769396%2C55.663888&z=16",
        external: true,
      },
    ],
  },
]);

try {
  const vars: any = await $fetch("http://localhost:8080/v1/products/vars");
  const brands = vars.find((el: any) => el.group === "brand");
  const listBrands = tableElements.value.find((el) => el.title === "Бренды");
  
  if (listBrands) {
    listBrands.content = brands.variables.map((el: any) => ({
      title: el.title,
      to: `/catalog?brand=${el.title}`,
    }));
  }
} catch (err) {}

const { isMobile } = useDevice();
</script>

<template>
  <footer class="footer" v-if="!isMobile">
    <div class="page-container">
      <template v-for="(arr, j) in [[0, 3], [3]]" :key="arr">
        <div class="footer__table">
          <div class="footer__social">
            <a href="/">
              <svg style="width: 1.8rem;" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 0C11.4453 0 11.7504 0.00899995 12.7098 0.0539999C13.6683 0.099 14.3208 0.2493 14.895 0.4725C15.489 0.7011 15.9894 1.0107 16.4898 1.5102C16.9474 1.96011 17.3016 2.50433 17.5275 3.105C17.7498 3.6783 17.901 4.3317 17.946 5.2902C17.9883 6.2496 18 6.5547 18 9C18 11.4453 17.991 11.7504 17.946 12.7098C17.901 13.6683 17.7498 14.3208 17.5275 14.895C17.3022 15.496 16.948 16.0404 16.4898 16.4898C16.0398 16.9473 15.4956 17.3014 14.895 17.5275C14.3217 17.7498 13.6683 17.901 12.7098 17.946C11.7504 17.9883 11.4453 18 9 18C6.5547 18 6.2496 17.991 5.2902 17.946C4.3317 17.901 3.6792 17.7498 3.105 17.5275C2.50409 17.302 1.95977 16.9479 1.5102 16.4898C1.05247 16.04 0.698338 15.4957 0.4725 14.895C0.2493 14.3217 0.099 13.6683 0.0539999 12.7098C0.0116999 11.7504 0 11.4453 0 9C0 6.5547 0.00899995 6.2496 0.0539999 5.2902C0.099 4.3308 0.2493 3.6792 0.4725 3.105C0.697713 2.50396 1.05192 1.95959 1.5102 1.5102C1.9599 1.05231 2.50419 0.698156 3.105 0.4725C3.6792 0.2493 4.3308 0.099 5.2902 0.0539999C6.2496 0.0116999 6.5547 0 9 0ZM9 4.5C7.80653 4.5 6.66193 4.97411 5.81802 5.81802C4.97411 6.66193 4.5 7.80653 4.5 9C4.5 10.1935 4.97411 11.3381 5.81802 12.182C6.66193 13.0259 7.80653 13.5 9 13.5C10.1935 13.5 11.3381 13.0259 12.182 12.182C13.0259 11.3381 13.5 10.1935 13.5 9C13.5 7.80653 13.0259 6.66193 12.182 5.81802C11.3381 4.97411 10.1935 4.5 9 4.5ZM14.85 4.275C14.85 3.97663 14.7315 3.69048 14.5205 3.47951C14.3095 3.26853 14.0234 3.15 13.725 3.15C13.4266 3.15 13.1405 3.26853 12.9295 3.47951C12.7185 3.69048 12.6 3.97663 12.6 4.275C12.6 4.57337 12.7185 4.85952 12.9295 5.0705C13.1405 5.28147 13.4266 5.4 13.725 5.4C14.0234 5.4 14.3095 5.28147 14.5205 5.0705C14.7315 4.85952 14.85 4.57337 14.85 4.275ZM9 6.3C9.71608 6.3 10.4028 6.58446 10.9092 7.09081C11.4155 7.59716 11.7 8.28392 11.7 9C11.7 9.71608 11.4155 10.4028 10.9092 10.9092C10.4028 11.4155 9.71608 11.7 9 11.7C8.28392 11.7 7.59716 11.4155 7.09081 10.9092C6.58446 10.4028 6.3 9.71608 6.3 9C6.3 8.28392 6.58446 7.59716 7.09081 7.09081C7.59716 6.58446 8.28392 6.3 9 6.3Z" fill="black"/>
              </svg>
            </a>

            <a href="/">
              <svg style="width: 1.9rem;" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3802 0.132424C17.3802 0.132424 19.1378 -0.516861 18.9913 1.05998C18.9425 1.70927 18.5031 3.98177 18.1613 6.4398L16.9896 13.7211C16.9896 13.7211 16.892 14.7878 16.0131 14.9733C15.1343 15.1588 13.8161 14.324 13.5719 14.1385C13.3766 13.9994 9.91022 11.9123 8.68961 10.892C8.34784 10.6138 7.95725 10.0572 8.73842 9.40795L13.8649 4.77021C14.4508 4.21367 15.0367 2.9151 12.5955 4.49194L5.76022 8.89782C5.76022 8.89782 4.97904 9.36158 3.51437 8.94419L0.340834 8.01664C0.340834 8.01664 -0.830929 7.32098 1.17083 6.62528C6.05318 4.44553 12.0584 2.2194 17.3802 0.132424Z" fill="black"/>
              </svg>
            </a>

            <a href="/">
              <svg style="width: 2.1rem;" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4378 13C4.26292 13 0.170518 8.12013 0 0L3.59399 0C3.71204 5.95997 6.36158 8.48447 8.46027 9.00499L8.46027 0L11.8445 0V5.14012C13.917 4.9189 16.0941 2.57658 16.8286 0L20.2129 0C19.6488 3.17518 17.2878 5.5175 15.6089 6.48046C17.2878 7.26124 19.9769 9.3043 21 13H17.2747C16.4746 10.5275 14.481 8.6146 11.8445 8.35434V13H11.4378Z" fill="black"/>
              </svg>
            </a>
          </div>

          <div class="footer__warn">
            * Instagram признан экстремистской<br>организацией и запрещен на территории РФ.
          </div>

          <div
            class="footer__table-element"
            v-for="(el, i) in tableElements.slice(...arr)"
            :key="el.title"
          >
            <span class="footer__title">{{ el.title }}</span>
            <q-separator class="footer__separator" />

            <div class="footer__column" :style="i === 2 &&  j === 0 ? 'grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(7, 1fr);': ''">
              <div v-for="link in el.content" :key="link.title">
                <NuxtLink
                  :external="link.external"
                  :target="link.external ? '_blank' : ''"
                  :to="link.to"
                >
                  {{ link.title }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="footer__table" style="display: block">
        <q-separator style="margin-bottom: 1.2rem;" />
        <div class="footer__last">
          <NuxtLink to="/">Политика конфединциальности</NuxtLink>
          <a href="/" target="_blank">Разработка сайта</a>
        </div>
      </div>
    </div>
  </footer>

  <app-footer-mobile v-if="isMobile" />
</template>

<style scoped lang="scss">
.footer {
  --bgContainerColor: var(--bg_container_color, #fff);
  --titleColor: var(--text_secondary_color);
  --secondaryColor: var(--text_secondary_color);

  padding: 7.6rem 0;
  background-color: var(--bgContainerColor);

  &__table {
    display: grid;
    position: relative;
    margin-bottom: 7.6rem;
    grid-template-columns: 0.9fr 1.1fr calc(4.5fr - 0.9fr - 1.1fr);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__table:nth-child(2) &__social {
    display: flex;
  }

  &__table:nth-child(2) &__warn {
    display: block;
  }

  &__separator,
  &__title {
    margin-bottom: 1.2rem;
  }

  &__title {
    display: block;
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--titleColor);
  }

  &__column {
    display: grid;
    row-gap: 1rem;

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

  &__social, &__warn {
    top: -.2rem;
    right: 0;
    display: none;
    position: absolute;
    flex-direction: row-reverse;
    gap: 2rem;
  }

  &__warn {
    top: 4.6rem;
    text-align: right;
    font-size: .8rem;
    font-weight: 400;
    line-height: .937rem;
    color: var(--secondaryColor);
  }

  &__last {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      font-size: 1.2rem;
      font-weight: 400;
      text-align: right;
      color: var(--secondaryColor);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
