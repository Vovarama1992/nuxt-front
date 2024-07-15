<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

defineProps<{
  previews: string[];
  orderId: string;
  price: number;
  created_at: Date;
  count: number;
  weight: number;
  trak_number: string;
  status: string;
}>();

const { isMobile } = useDevice();

const { format } = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
});

const statuses = [
  {
    id: "created",
    title: "Не оплачен",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(0, 0, 0, 0.64) 0%, rgba(0, 0, 0, 0.64) 100%)",
    icon: `<svg width="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 15L14.3244 11.7268C14.5698 11.5998 14.6925 11.5363 14.7821 11.4428C14.8613 11.36 14.9215 11.2608 14.9583 11.152C15 11.029 15 10.8908 15 10.6142C15 9.28481 15 6.49764 15 4.52546M8 15L1.67557 11.7268C1.43017 11.5998 1.30747 11.5363 1.2179 11.4428C1.13869 11.36 1.07852 11.2608 1.04167 11.152C1 11.029 1 10.8901 1 10.6123V4.52546M8 15C8 15 8 10.704 8 7.9513M15 4.52546C12.2663 5.86333 10.7337 6.61343 8 7.9513M15 4.52546C12.856 3.41585 10.7121 2.30624 8.56812 1.19664C8.36027 1.08907 8.25635 1.03528 8.14682 1.01408C8.04983 0.995307 7.95017 0.995307 7.85318 1.01408C7.74365 1.03528 7.63948 1.0892 7.43113 1.19703L1 4.52546M1 4.52546C3.33333 5.66741 5.66667 6.80935 8 7.9513" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "paid",
    title: "На сборке",
    bg: "radial-gradient(112.26% 253.19% at 50% -56.38%, #B7FBFF 0%, #36C0D2 100%);",
    icon: `<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 15L14.3244 11.7268C14.5698 11.5998 14.6925 11.5363 14.7821 11.4428C14.8613 11.36 14.9215 11.2608 14.9583 11.152C15 11.029 15 10.8908 15 10.6142C15 9.28481 15 6.49764 15 4.52546M8 15L1.67557 11.7268C1.43017 11.5998 1.30747 11.5363 1.2179 11.4428C1.13869 11.36 1.07852 11.2608 1.04167 11.152C1 11.029 1 10.8901 1 10.6123V4.52546M8 15C8 15 8 10.704 8 7.9513M15 4.52546C12.2663 5.86333 10.7337 6.61343 8 7.9513M15 4.52546C12.856 3.41585 10.7121 2.30624 8.56812 1.19664C8.36027 1.08907 8.25635 1.03528 8.14682 1.01408C8.04983 0.995307 7.95017 0.995307 7.85318 1.01408C7.74365 1.03528 7.63948 1.0892 7.43113 1.19703L1 4.52546M1 4.52546C3.33333 5.66741 5.66667 6.80935 8 7.9513" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "on_its_way",
    title: "Сейчас в пути",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(183, 255, 233, .64) 0%, rgba(54, 210, 173, .64) 100%)",
    icon: `<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 15L14.3244 11.7268C14.5698 11.5998 14.6925 11.5363 14.7821 11.4428C14.8613 11.36 14.9215 11.2608 14.9583 11.152C15 11.029 15 10.8908 15 10.6142C15 9.28481 15 6.49764 15 4.52546M8 15L1.67557 11.7268C1.43017 11.5998 1.30747 11.5363 1.2179 11.4428C1.13869 11.36 1.07852 11.2608 1.04167 11.152C1 11.029 1 10.8901 1 10.6123V4.52546M8 15C8 15 8 10.704 8 7.9513M15 4.52546C12.2663 5.86333 10.7337 6.61343 8 7.9513M15 4.52546C12.856 3.41585 10.7121 2.30624 8.56812 1.19664C8.36027 1.08907 8.25635 1.03528 8.14682 1.01408C8.04983 0.995307 7.95017 0.995307 7.85318 1.01408C7.74365 1.03528 7.63948 1.0892 7.43113 1.19703L1 4.52546M1 4.52546C3.33333 5.66741 5.66667 6.80935 8 7.9513" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "completed",
    title: "Доставлен",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(249, 255, 249, .64) 0%, rgba(112, 228, 109, .64) 100%)",
    icon: `<svg width="18" height="15" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 8.32582L2.87389 10.2197C3.90726 11.2641 4.42395 11.7863 5.00299 11.9511C5.51155 12.0959 6.05221 12.057 6.53687 11.8409C7.0887 11.5949 7.53164 11.0038 8.41752 9.82155L15 1.03711" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "completed_refaund",
    title: "Возвращен",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(249, 255, 249, .64) 0%, rgba(112, 228, 109, .64) 100%)",
    icon: `<svg width="18" height="15" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 8.32582L2.87389 10.2197C3.90726 11.2641 4.42395 11.7863 5.00299 11.9511C5.51155 12.0959 6.05221 12.057 6.53687 11.8409C7.0887 11.5949 7.53164 11.0038 8.41752 9.82155L15 1.03711" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "refaund",
    title: "На возврате",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(255, 240, 238, .64) 0%, rgba(245, 111, 102, .64) 100%)",
    icon: `<svg width="18" height="17" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.0962 12.0962C10.9199 13.2725 9.29494 14 7.5 14C3.91016 14 1 11.0898 1 7.5C1 3.91016 3.91016 1 7.5 1C10.4307 1 12.2072 2.95325 14 4.97222M14.625 2.5625V5.72917H11.4583" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "rejected",
    title: "Отменен",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(254, 254, 254, .64) 0%, rgba(197, 197, 197, .64) 100%)",
    icon: `<svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13 1.00005L1 13M0.999949 1L12.9999 13" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
];

const route = useRoute();
const productId = route.path.split("/").at(-1) as string;

const order = await $fetch("https://api.3hundred.ru/v1/order/" + productId, {
  headers: {
    Authorization: "Bearer " + useCookie("access_token").value,
  },
});
</script>

<template>
  <app-subheader-mobile title="Статус заказа" />

  <div class="page-padding">
    <div class="container">
      <div class="id">
        <span style="font-size: 2.2rem">Заказ</span><br />№{{ productId }}
      </div>

      <div
        style="
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          height: 6.5rem;
          font-size: 1.8rem;
          padding: 0 2rem;
          border-radius: 30px;
          color: black;
        "
        :style="{
          background: statuses.find((el) => el.id === order[0].status)?.bg,
          color: status === 'created' ? 'white' : 'black',
        }"
      >
        <div
          v-html="statuses.find((el) => el.id === order[0].status)?.icon"
          style="position: relative; top: 2px"
        ></div>
        <span style="margin-left: 1rem">{{
          statuses.find((el) => el.id === order[0].status)?.title
        }}</span>
      </div>

      <div style="margin-top: 4rem;" v-if="order[0]?.statuses?.length">
        <app-cdek-line
          :statuses="order[0]?.statuses"
        />
      </div>

      <div class="info">
        <span>Трек-номер:</span><br />
        <span>{{ order[0]?.delivery_details?.trak_number || "Еще нет" }}</span>
      </div>

      <div class="info" style="margin-top: 2rem">
        <span>Дата заказа:</span><br />
        <span>{{ format(new Date(order[0].created_at)) }}</span>
      </div>
    </div>

    <ui-accardion-fill title="Детали о доставке" style="margin-top: 1.3rem">
      <div class="info" style="margin-top: 0">
        <span>Адрес доставки:</span><br />
        <span>{{
          order[0].customer?.city +
          ", " +
          (order[0].customer?.address || order[0].customer?.pvz)
        }}</span>
      </div>

      <div class="info" style="margin-top: 2rem">
        <span>ФИО Получателя:</span><br />
        <span>
          {{
            order[0].customer?.last_name +
            " " +
            order[0].customer?.first_name +
            order[0].customer?.surname
          }}
        </span>
      </div>

      <div class="info" style="margin-top: 2rem">
        <span>Вес посылки:</span><br />
        <span
          >{{
            order[0].items?.reduce((acc, el) => (acc += el.package.weight), 0) /
            1000
          }}
          кг</span
        >
      </div>

      <div class="info" style="margin-top: 2rem; padding-bottom: 3.5rem">
        <span>Состав заказа:</span><br />
        <span>{{ order[0].items?.length }} предмет</span>
      </div>
    </ui-accardion-fill>

    <ui-accardion-fill title="Состав заказа" style="margin-top: 1.3rem">
      <div
        style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 1.6rem;
          row-gap: 3rem;
          padding: 0 1.6rem;
          padding-bottom: 3rem;
        "
      >
        <app-product-card-fill
          v-for="card in order[0].items"
          :key="card.product_id"
          :_id="card.product_id"
          :preview="card.preview"
          :price="card.sizes[0].price"
          :title="card.title"
          :discount="0"
          :size-grid="card.size_grid"
          :size-value="card.sizes[0].title"
          :quantity="1"
        />
      </div>
    </ui-accardion-fill>

    <ui-accardion-fill title="Информация о возврате" style="margin-top: 1.3rem">
      <div class="page-container">
        <a href="https://t.me/noflours1" target="_blank">
          <ui-btn block style="border-radius: 0.8rem"
            >Подать заявку на возврат</ui-btn
          >
        </a>
      </div>

      <p
        style="
          padding-top: 2rem;
          padding-bottom: 3.5rem;
          font-size: 1.4rem;
          font-weight: 300;
          line-height: 2.394rem;
          text-align: center;
          color: rgba(140, 140, 140, 1);
        "
      >
        Возврат осуществляется согласно<br />политике возвратов 3HUNDRED
      </p>
    </ui-accardion-fill>
  </div>
</template>

<style scoped lang="scss">
.id {
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.877rem;
  margin-bottom: 2rem;
  text-align: center;
}

.info {
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 3.078rem;
  text-align: center;
  margin-top: 4rem;

  & span:nth-child(3) {
    font-weight: 300;
    color: rgba(140, 140, 140, 1);
  }
}
</style>
