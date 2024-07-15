<script setup lang="ts">
defineProps<{
  previews: string[];
  orderId: string;
  price: number;
  created_at: Date;
  count: number;
  weight: number;
  trakNumber: string;
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
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 15L14.3244 11.7268C14.5698 11.5998 14.6925 11.5363 14.7821 11.4428C14.8613 11.36 14.9215 11.2608 14.9583 11.152C15 11.029 15 10.8908 15 10.6142C15 9.28481 15 6.49764 15 4.52546M8 15L1.67557 11.7268C1.43017 11.5998 1.30747 11.5363 1.2179 11.4428C1.13869 11.36 1.07852 11.2608 1.04167 11.152C1 11.029 1 10.8901 1 10.6123V4.52546M8 15C8 15 8 10.704 8 7.9513M15 4.52546C12.2663 5.86333 10.7337 6.61343 8 7.9513M15 4.52546C12.856 3.41585 10.7121 2.30624 8.56812 1.19664C8.36027 1.08907 8.25635 1.03528 8.14682 1.01408C8.04983 0.995307 7.95017 0.995307 7.85318 1.01408C7.74365 1.03528 7.63948 1.0892 7.43113 1.19703L1 4.52546M1 4.52546C3.33333 5.66741 5.66667 6.80935 8 7.9513" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "paid",
    title: "На сборке",
    bg: "radial-gradient(112.26% 253.19% at 50% -56.38%, #B7FBFF 0%, #36C0D2 100%);",
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 15L14.3244 11.7268C14.5698 11.5998 14.6925 11.5363 14.7821 11.4428C14.8613 11.36 14.9215 11.2608 14.9583 11.152C15 11.029 15 10.8908 15 10.6142C15 9.28481 15 6.49764 15 4.52546M8 15L1.67557 11.7268C1.43017 11.5998 1.30747 11.5363 1.2179 11.4428C1.13869 11.36 1.07852 11.2608 1.04167 11.152C1 11.029 1 10.8901 1 10.6123V4.52546M8 15C8 15 8 10.704 8 7.9513M15 4.52546C12.2663 5.86333 10.7337 6.61343 8 7.9513M15 4.52546C12.856 3.41585 10.7121 2.30624 8.56812 1.19664C8.36027 1.08907 8.25635 1.03528 8.14682 1.01408C8.04983 0.995307 7.95017 0.995307 7.85318 1.01408C7.74365 1.03528 7.63948 1.0892 7.43113 1.19703L1 4.52546M1 4.52546C3.33333 5.66741 5.66667 6.80935 8 7.9513" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "on_its_way",
    title: "Сейчас в пути",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(183, 255, 233, .64) 0%, rgba(54, 210, 173, .64) 100%)",
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 15L14.3244 11.7268C14.5698 11.5998 14.6925 11.5363 14.7821 11.4428C14.8613 11.36 14.9215 11.2608 14.9583 11.152C15 11.029 15 10.8908 15 10.6142C15 9.28481 15 6.49764 15 4.52546M8 15L1.67557 11.7268C1.43017 11.5998 1.30747 11.5363 1.2179 11.4428C1.13869 11.36 1.07852 11.2608 1.04167 11.152C1 11.029 1 10.8901 1 10.6123V4.52546M8 15C8 15 8 10.704 8 7.9513M15 4.52546C12.2663 5.86333 10.7337 6.61343 8 7.9513M15 4.52546C12.856 3.41585 10.7121 2.30624 8.56812 1.19664C8.36027 1.08907 8.25635 1.03528 8.14682 1.01408C8.04983 0.995307 7.95017 0.995307 7.85318 1.01408C7.74365 1.03528 7.63948 1.0892 7.43113 1.19703L1 4.52546M1 4.52546C3.33333 5.66741 5.66667 6.80935 8 7.9513" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "completed",
    title: "Доставлен",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(249, 255, 249, .64) 0%, rgba(112, 228, 109, .64) 100%)",
    icon: `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 8.32582L2.87389 10.2197C3.90726 11.2641 4.42395 11.7863 5.00299 11.9511C5.51155 12.0959 6.05221 12.057 6.53687 11.8409C7.0887 11.5949 7.53164 11.0038 8.41752 9.82155L15 1.03711" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "completed_refaund",
    title: "На возврате",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(255, 240, 238, .64) 0%, rgba(245, 111, 102, .64) 100%)",
    icon: `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.0962 12.0962C10.9199 13.2725 9.29494 14 7.5 14C3.91016 14 1 11.0898 1 7.5C1 3.91016 3.91016 1 7.5 1C10.4307 1 12.2072 2.95325 14 4.97222M14.625 2.5625V5.72917H11.4583" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "refaund",
    title: "Возвращен",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(255, 240, 238, .64) 0%, rgba(245, 111, 102, .64) 100%)",
    icon: `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.0962 12.0962C10.9199 13.2725 9.29494 14 7.5 14C3.91016 14 1 11.0898 1 7.5C1 3.91016 3.91016 1 7.5 1C10.4307 1 12.2072 2.95325 14 4.97222M14.625 2.5625V5.72917H11.4583" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
  {
    id: "rejected",
    title: "Отменен",
    bg: "radial-gradient(112.26% 253.19% at 49.54% -56.38%, rgba(254, 254, 254, .64) 0%, rgba(197, 197, 197, .64) 100%)",
    icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13 1.00005L1 13M0.999949 1L12.9999 13" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  },
];
</script>

<template>
  <div class="order container">
    <div>
      <div class="order-card__header">
        <span class="order-card__id">№{{ orderId }}</span>
        <div class="order-card__btns">
          <div
            style="
              display: flex;
              flex-wrap: nowrap;
              justify-content: center;
              align-items: center;
              height: 4.7rem;
              font-size: 1rem;
              padding: 0 2rem;
              border-radius: 30px;
              margin-left: 1rem;
              color: black;
            "
            :style="{
              background: statuses.find((el) => el.id === status).bg,
              color: status === 'created' ? 'white' : 'black',
            }"
          >
            <div
              v-html="statuses.find((el) => el.id === status).icon"
              style="position: relative; top: 2px"
            ></div>
            <span style="margin-left: 1rem">{{
              statuses.find((el) => el.id === status).title
            }}</span>
          </div>
        </div>
      </div>

      <div class="order-card__previews">
        <ui-img-fill
          style="height: 18.9rem"
          v-for="preview in previews.splice(0, 3)"
          :key="preview"
          :src="`https://api.3hundred.ru/` + preview"
        />
      </div>
    </div>

    <div>
      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
        <div>
          <div class="order-card__total-price">
            <span>{{ usePriceFormat(price).replace("&nbsp;₽", "") }} Рублей</span>
          </div>
  
          <div class="order-card__info">
            <div class="order-card__text">
              <div>
                <p class="order-card__light">Вес:</p>
                <p class="order-card__light_bottom">{{ weight.toFixed(1) }}кг</p>
              </div>
              <div>
                <p class="order-card__light">Дата заказа:</p>
                <p class="order-card__light_bottom">{{ format(created_at) }}</p>
              </div>
              <div>
                <p class="order-card__light">Состав:</p>
                <p class="order-card__light_bottom">{{ count }}</p>
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: .6rem;">
          <ui-btn @click="navigateTo('/profile/order/' + orderId)" block style="height: 7.1rem; border-radius: .8rem;" v-if="trakNumber">
            Отследить
          </ui-btn>
  
          <ui-btn  @click="navigateTo('/profile/order/' + orderId)" block dark style="height: 7.1rem; border-radius: .8rem;">
            Раскрыть
          </ui-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order {
  gap: 2rem;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
}

.order-card {
  &__header,
  &__btns,
  &__info {
    display: grid;
    align-items: center;
  }

  &__header {
    width: 100%;
    grid-template-columns: 1fr .8fr;
  }

  &__id {
    font-size: 2rem;
    font-weight: 400;
    line-height: 2.343rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__btn-search {
    width: 7rem;
    height: 4.7rem;
    border-radius: 4rem;
    border: 2px solid rgba(214, 214, 214, 1);
  }

  &__previews {
    gap: 0.6rem;
    display: grid;
    margin-top: 2rem;
    grid-template-columns: 1fr 1fr 1fr;
  }

  &__total-price {
    padding-bottom: 3rem;
    padding-top: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.21);

    span {
      font-size: 2.5rem;
      font-weight: 400;
      line-height: 2.343rem;
    }
  }

  &__info {
    align-items: center;

    svg {
      margin-top: 2rem;
      margin-right: 2rem;
    }
  }

  &__text {
    gap: 4rem;
    display: flex;
    margin-top: 2rem;

    p {
      margin: 0;
    }
  }

  &__light {
    margin-bottom: .3rem !important;
    font-size: 1.2rem;
    font-weight: 400;
  }

  &__light_bottom {
    font-size: 1.2rem;
    font-weight: 300;
    color: rgba(140, 140, 140, 1);
  }
}
</style>
