<script setup lang="ts">
// const db: any = {}

// db.products.find({
//   _id: {
//     $in: [
//       'Adidas Originlas Yeezy Foam Runner',
//       'Nike Air Jordan 1 Low "World Make Japan"',
//       'Nike Air Jordan 1 low X Travis Scott “Reverse Moc...',
//       'Asics Gel-Trabuco Terra',
//       'Supreme Cap',
//       'Nike Dunk Low SB Pro "Fog"',
//       'Nike Air Max 90 Terrascape "Black"',
//       'Nike Air Jordan 1 Low "True Blue"',
//       'Nike Air Jordan 1 Low "Shadow"',
//       'Nike Air Jordan 1 High OG "Lost and Found"',
//     ]
//   }
// }, { projection: { _id: 1 } }).toArray();

const links = ref([
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
        extarnal: false,
      },
      {
        title: "Возврат и обмен",
        to: "/news/refund-and-exchange",
      },
      {
        title: "Помощь",
        to: "/news/66804a200c936172eb4a68b1",
        extarnal: false,
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
        to: "https://t.me/noflours1",
        extarnal: true,
      },
    ],
  },
  { title: "Бренды" },
  { title: "Контакты", content: [{ title: "+7 (911) 597-79-74", to: "tel:" }] },
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
        extarnal: true,
      },
    ],
    last: true,
  },
]);

try {
  const vars: any = await $fetch("http://localhost:8080/v1/products/vars");
  const brands = vars.find((el: any) => el.group === "brand");
  const listBrands = links.value.find((el) => el.title === "Бренды");
  
  if (listBrands) {
    listBrands.content = brands.variables.map((el: any) => ({
      title: el.title,
      to: `/catalog?brand=${el.title}`,
    }));
  }
} catch (err) {}

</script>

<template>
  <footer style="background-color: #fff">
    <ui-accardion
      v-for="el in links"
      :key="el.title"
      :style="el.last ? 'border-bottom: 1px solid #e5e5e5;' : ''"
    >
      <template #title>{{ el.title }}</template>
      <template #default>
        <div class="q-gutter-lg">
          <NuxtLink
            v-for="cnt in el.content"
            :key="cnt.title"
            :to="cnt.to"
            :extarnal="cnt.extarnal"
            :target="cnt.extarnal ? '_blank' : ''"
            class="footer__accardion-link"
          >
            {{ cnt.title }}
          </NuxtLink>
        </div>
      </template>
    </ui-accardion>

    <div style="display: flex; flex-direction: column; align-items: center">
      <NuxtLink to="/" style="margin-top: 4rem">
        <svg
          style="width: 22.7rem; height: 3.2rem"
          viewBox="0 0 227 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.120195 20.4801H10.6799L10.639 21.1196C10.639 23.0543 11.4828 24.0217 13.1688 24.0217C14.0782 24.0217 14.8411 23.6938 15.4573 23.0399C16.0727 22.3859 16.3804 21.5888 16.3804 20.6504C16.3804 19.1141 15.4573 18.346 13.6103 18.346L12.8074 18.4312L13.7714 12.0743L14.4933 12.1594C15.1897 12.1594 15.7983 11.8967 16.3207 11.3696C16.8424 10.8442 17.1032 10.2391 17.1032 9.55616C17.1032 8.44746 16.5943 7.89311 15.5775 7.89311C14.3194 7.89311 13.4901 8.69022 13.0886 10.2826H2.85026C3.30541 8.5471 3.80062 7.21014 4.3359 6.27174C6.7182 2.09058 10.8129 0 16.6216 0C19.9943 0 22.6502 0.710149 24.591 2.13225C26.5318 3.55616 27.5018 5.48913 27.5018 7.93479C27.5018 9.41486 27.0867 10.7736 26.2574 12.0109C25.4272 13.2482 24.2765 14.2083 22.8045 14.8895C25.4272 15.8297 26.7389 17.8062 26.7389 20.8206C26.7389 22.9547 26.0161 24.9601 24.5714 26.837C21.9479 30.279 17.826 32 12.2047 32C8.1365 32 5.07146 31.1178 3.01134 29.3551C2.18116 28.6141 1.47201 27.5833 0.883033 26.2609C0.294061 24.9384 0 23.6649 0 22.442L0.120195 20.4801Z"
            fill="#1D1D1B"
          />
          <path
            d="M27.4208 31.4022L32.038 0.639491H42.5167L40.9518 11.0072H47.0137L48.5803 0.639491H59.0181L54.441 31.4022H44.0032L45.609 20.5652H39.5062L37.9004 31.4022H27.4208Z"
            fill="#1D1D1B"
          />
          <path
            d="M88.2075 0.639491L85.3965 19.2844C85.1561 21.0761 84.7538 22.6123 84.1912 23.8931C83.148 26.4819 81.3939 28.4801 78.9323 29.8877C76.469 31.2953 73.5795 32 70.2605 32C66.5119 32 63.648 31.183 61.6689 29.5453C59.688 27.9112 58.6976 25.5145 58.6976 22.3569C58.6976 21.4185 58.7777 20.3949 58.938 19.2844L61.7081 0.639491H71.9874L69.4167 17.962L69.1763 20.1377C69.1763 20.9058 69.4167 21.4891 69.8991 21.8877C70.3799 22.2862 70.9833 22.4855 71.7061 22.4855C72.3488 22.4855 72.9557 22.2862 73.5318 21.8877C74.108 21.4891 74.5018 21.0634 74.7166 20.6069C74.824 20.2953 74.9314 19.8895 75.0388 19.3913C75.1445 18.8949 75.2382 18.4167 75.3183 17.962L77.889 0.639491H88.2075Z"
            fill="#1D1D1B"
          />
          <path
            d="M86.0801 31.4022L90.6964 0.639491H101.015L106.715 13.9946L107.198 15.317L108.321 19.413L108.042 14.7627C108.042 14.0235 108.067 13.5815 108.122 13.4402L110.009 0.639482H120.206L115.668 31.4022H105.07L99.5693 18.4312L99.1278 17.279C98.9402 16.7101 98.7527 16.0562 98.5652 15.317C98.3777 14.5779 98.2175 13.8949 98.0845 13.2681C98.2447 14.6341 98.3248 15.8152 98.3248 16.8098V17.8333C98.3248 18.2337 98.2976 18.6015 98.2447 18.9438L96.3985 31.4022H86.0801Z"
            fill="#1D1D1B"
          />
          <path
            d="M118.198 31.4022L122.814 0.639491H133.615C138.406 0.639491 142.079 1.75543 144.636 3.98913C147.191 6.22283 148.47 9.42935 148.47 13.6105C148.47 18.6739 146.857 22.904 143.632 26.3044C140.407 29.7029 136.397 31.4022 131.607 31.4022H118.198ZM131.808 10.2391L130.001 22.1866H130.965C133.078 22.1866 134.773 21.5254 136.045 20.2029C137.315 18.8786 137.95 17.1377 137.95 14.9746C137.95 11.8188 136.305 10.2391 133.012 10.2391H131.808Z"
            fill="#1D1D1B"
          />
          <path
            d="M148.029 31.4022L152.645 0.639491H166.216C169.133 0.639491 171.495 1.45833 173.302 3.09239C175.108 4.72826 176.011 6.85507 176.011 9.47101C176.011 11.7192 175.483 13.7319 174.426 15.5091C173.369 17.2862 171.69 18.5743 169.387 19.3696L175.128 31.4022H163.124L160.514 22.9547L159.672 19.8822V21.8025C159.672 22.9964 159.617 23.808 159.511 24.2337L158.427 31.4022L148.029 31.4022ZM161.799 8.96015L160.996 14.3786H162.401C163.338 14.3786 164.128 14.0797 164.77 13.4819C165.358 12.8569 165.653 12.0598 165.653 11.0924C165.653 10.4674 165.425 9.95471 164.971 9.55617C164.515 9.15943 163.94 8.96015 163.245 8.96015H161.799Z"
            fill="#1D1D1B"
          />
          <path
            d="M175.089 31.4022L179.705 0.639491H198.977L197.773 8.96014H188.818L188.377 11.8605H196.488L195.283 19.9257H187.213L186.771 22.7826H195.886L194.64 31.4022H175.089Z"
            fill="#1D1D1B"
          />
          <path
            d="M196.728 31.4022L201.344 0.639491H212.145C216.936 0.639491 220.609 1.75543 223.166 3.98913C225.721 6.22283 227 9.42935 227 13.6105C227 18.6739 225.387 22.904 222.162 26.3044C218.937 29.7029 214.927 31.4022 210.137 31.4022H196.728ZM210.338 10.2391L208.531 22.1866H209.495C211.608 22.1866 213.303 21.5254 214.575 20.2029C215.845 18.8786 216.48 17.1377 216.48 14.9746C216.48 11.8188 214.835 10.2391 211.542 10.2391H210.338Z"
            fill="#1D1D1B"
          />
        </svg>
      </NuxtLink>

      <NuxtLink class="link" style="margin-top: 4rem" to="/"
        >Публичная оферта</NuxtLink
      >
      <NuxtLink class="link" to="/">Политика конфеденциальности</NuxtLink>
      <NuxtLink class="link" to="/">Разработка сайта</NuxtLink>
      <p
        style="
          font-weight: 400;
          font-size: 1.2rem;
          text-align: center;
          margin-top: 4rem;
          margin-bottom: 5rem;
          color: rgba(0, 0, 0, 0.35);
        "
        to="/"
      >
        © 3HUNDRED, 2024
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.link {
  font-weight: 400;
  margin-top: 2rem;
  font-size: 1.2rem;
  text-decoration: underline;
  text-decoration-skip-ink: none;
  color: #525252;
}

.footer__accardion-link {
  font-size: 1.8rem;
  font-weight: 400;
  display: block;
  color: black;
  text-decoration: none;

  &:active {
    text-decoration: underline;
  }
}
</style>
