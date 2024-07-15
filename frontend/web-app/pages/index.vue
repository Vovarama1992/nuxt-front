<script setup lang="ts">
const { data } = await useFetch<any[]>(
  "https://api.3hundred.ru/v1/products/collections"
);
</script>

<template>
  <q-page>
    <div class="desktop">
      <app-carousel-main />
    </div>

    <div class="mobile">
      <app-carousel-main-mobile />
    </div>

    <div class="page-container page-padding">
      <div class="collection" v-for="(el, i) in data?.slice(0, 4)" :key="el._id">
        <h2 class="collection__title">{{ el.title }}</h2>
  
        <div class="collection__items">
          <app-product-card
            class="collection__items_card"
            v-for="card in el.products_full"
            :key="card._id"
            :_id="card._id"
            :title="card.title"
            :discount="card.discount"
            :in-stock="card.status.in_stock"
            :is-new="card.status.is_new"
            :is-sale="card.status.is_sale"
            :photos="card.photos_compress"
            :preview="card.preview_compress || card.preview"
            :price="card.price"
          />
        </div>
  
        <div class="row justify-center">
          <q-btn
            class="collection__btn"
            flat
            @click="navigateTo(el.to)"
          >
            Перейти к подборке
            <svg
              style="margin-left: 1rem"
              width=".9rem"
              height="1.4rem"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M1.5 1L7.5 7L1.5 13"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </q-btn>
        </div>
      </div>

      <app-baner-original />
      <app-baner-check />
      <app-baner-legit-fam />
  
      <div class="collection" v-for="(el, i) in data?.slice(4, 8)" :key="el._id">
        <h2 class="collection__title">{{ el.title }}</h2>
  
        <div class="collection__items">
          <app-product-card
            v-for="card in el.products_full"
            :key="card._id"
            :_id="card._id"
            :title="card.title"
            :discount="card.discount"
            :in-stock="card.status.in_stock"
            :is-new="card.status.is_new"
            :is-sale="card.status.is_sale"
            :photos="card.photos_compress"
            :preview="card.preview_compress || card.preview"
            :price="card.price"
          />
        </div>
  
        <div class="row justify-center">
          <q-btn
            class="collection__btn"
            flat
            @click="navigateTo(el.to)"
          >
            Перейти к подборке
            <svg
              style="margin-left: 1rem"
              width=".9rem"
              height="1.4rem"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M1.5 1L7.5 7L1.5 13"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </q-btn>
        </div>
      </div>
  
      <app-baner-cdek />
  
      <div class="collection" v-for="(el, i) in data?.slice(8)" :key="el._id">
        <h2 class="collection__title">{{ el.title }}</h2>
  
        <div class="collection__items">
          <app-product-card
            v-for="card in el.products_full"
            :key="card._id"
            :_id="card._id"
            :title="card.title"
            :discount="card.discount"
            :in-stock="card.status.in_stock"
            :is-new="card.status.is_new"
            :is-sale="card.status.is_sale"
            :photos="card.photos_compress"
            :preview="card.preview_compress || card.preview"
            :price="card.price"
          />
        </div>
  
        <div class="row justify-center">
          <q-btn
            class="collection__btn"
            flat
            @click="navigateTo(el.to)"
          >
            Перейти к подборке
            <svg
              style="margin-left: 1rem"
              width=".9rem"
              height="1.4rem"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M1.5 1L7.5 7L1.5 13"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </q-btn>
        </div>
      </div>
  
      <div class="collection" style="margin-top: 12rem">
        <h2 class="collection__title">Популярные вопросы</h2>
  
        <app-accardion-plus title="Как подобрать размер?">
          Для определения подходящего размера мы предоставляем вам размерные
          таблицы и инструкции по измерениям на нашем сайте и в карточке
          товара. Если у вас возникли вопросы или нужна помощь, наша команда
          поддержки доступна для чата прямо на главной странице. 
          <br /><br />
          Подробнее про размеры:
          <NuxtLink to="/" style="color: #398ef1">3hundred.ru/razmer</NuxtLink>
        </app-accardion-plus>
  
        <app-accardion-plus title="Есть ли самовывоз?" style="margin-top: 1.4rem">
          Да, для каждого клиента доступна услуга самовывоза товара со склада в
          Москве и Санкт-Петербурге: при оформлении заказа вы сможете выбрать
          удобный для вас пункт самовывоза из списка доступных опций.
        </app-accardion-plus>
  
        <app-accardion-plus
          title="Какие способы доставки доступны?"
          style="margin-top: 1.4rem"
        >
          Мы предлагаем несколько способов доставки: Яндекс.Доставку, СДЭК, Почту
          России, Достависта и самовывоз со склада в Москве и Санкт-Петербурге. 
          Каждый из них обеспечивает быструю и надежную доставку вашего заказа,
          позволяя выбрать наиболее удобный вариант для вас.
        </app-accardion-plus>
  
        <app-accardion-plus
          title="Где можно посмотреть отзывы?"
          style="margin-top: 1.4rem"
        >
          Наши отзывы можно посмотреть по ссылке:
          <a href="/" style="color: #398ef1">https://t.me/threehundredru</a
          ><br /><br />
          Рекомендации можно посмотреть по ссылке:
          <a href="/" style="color: #398ef1">https://t.me/threehundredru</a>
        </app-accardion-plus>
  
        <app-accardion-plus
          title="Есть ли экспресс-доставка?"
          style="margin-top: 1.4rem"
        >
          Быстрая доставка позволит вам получить свой заказ максимально
          оперативно: по Москве и Санкт-Петербургу от 1 часа.
        </app-accardion-plus>
  
        <app-accardion-plus
          title="Доставляете в Казахстан?"
          style="margin-top: 1.4rem"
        >
          Доставка производится в Казахстан, Грузию, Армению, Беларусь и другие
          страны СНГ.<br /><br />Независимо от вашего местоположения, вы можете
          заказать у нас товары и получить их удобным для вас способом доставки.
        </app-accardion-plus>
      </div>
      <app-brands />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.collection {
  margin-top: 6rem;

  &__title {
    font-weight: 400;
    font-size: 3rem;
    line-height: 117%;
    text-align: center;
    margin-bottom: 3.6rem;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 0.8rem;
    row-gap: 1.3rem;
    
    @media (max-width: 970px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 800px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 460px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__btn {
    text-transform: none;
    background-color: #000;
    color: #fff;
    width: 27.9rem;
    height: 7rem;
    margin-top: 4.5rem;
    border-radius: 1.6rem;
    font-size: 1.5rem;
    font-weight: 400;
  }
}

.page {
  &__container {
    border-radius: 2rem;
    padding: 2.3rem 1.8rem;
    background-color: #fff;
    border: 1px solid #e5e5e5;
  }
}

.ad-title {
  font-weight: 500;
  font-size: 5rem;
  line-height: 7.678rem;
  margin-bottom: 0;
  color: rgba(48, 48, 48, 1);
  margin-left: 2rem;
}

.ad-text {
  font-weight: 300;
  font-size: 2.3rem;
  line-height: 3.287rem;
  margin-bottom: 0;
  margin-top: 3.6rem;
  color: rgba(48, 48, 48, 1);
}

.ad-title-glav {
  display: flex;
  align-items: center;
  border-radius: 1.6rem;
  background: rgba(48, 48, 48, 1);
  width: 51.3rem;
  height: 7.4rem;
  margin-top: 1.4rem;

  P {
    color: white;
    line-height: 100%;
    margin-bottom: 1rem;
  }

  svg {
    margin-left: 2.2rem;
  }
}

.tra {
  &:hover {
    scale: 1.1;
  }
}

.mobile { display: none; }

@media (max-width: 720px) {
  .mobile { display: block; }
  .desktop { display: none; }

  .collection__btn {
    width: 100%;
    margin-top: 2.2rem;
    border-radius: .8rem;
  }
}
</style>

