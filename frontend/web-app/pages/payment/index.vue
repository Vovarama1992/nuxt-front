<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const q = useQuasar();

const deliveryMethod = ref<any[]>(["СДЭК"]);
const cart = useCartStore();

const deliveryMethods = [
  { title: "Экспресс-доставка по Москве", val: "Экспресс-доставка по Москве" },
  { title: "СДЭК", val: "СДЭК" },
  { title: "Доставка Почтой России", val: "Доставка Почтой России" },
];

const { isMobile } = useDevice();

const surname = ref('');
const firstName = ref('');
const lastName = ref('');
const city = ref('');
const address = ref('');
const postalCode = ref('');
const pvz = ref('');
const phoneNumber = ref('');
const message = ref('');
const promocode = ref('');

const { $api } = useNuxtApp();

const createOrder = async () => {
  const { data, error } = await $api.v1.orderControllerCreateOrder({
    first_name: unref(firstName),
    last_name: unref(lastName),
    postal_code: unref(postalCode),
    phone_number: unref(phoneNumber),
    pvz: unref(pvz),
    surname: unref(surname),
    delivery_address: {
      city: unref(deliveryMethod)[0] === 'Экспресс-доставка по Москве' ? 'Экспресс-доставка по Москве' : unref(city),
      address: unref(address),
    },
    promocode: unref(promocode),
    delivery_method: unref(deliveryMethod)[0],
    products: cart.$state.cart.map((el) => ({
      product_id: el.product_id,
      size_id: el.size_id,
      quantity: el.quantity,
    })),
    message: unref(message)
  })

  if (error)
    return q.notify({
      message: error.message || 'Возникла неизвестная ошибка! Проверьте заполненные поля или попробуйте собрать корзину заново.',
      color: 'danger'
    });

  localStorage.setItem('cart', '[]');
  cart.$state.cart = [];
  navigateTo(`/payment/success/${data._id}`)
}
</script>

<template>
  <q-page v-if="!isMobile">
    <app-subheader>Оформление заказа</app-subheader>
    <div class="page-container page-padding">
      <div class="payment">
        <div style="flex: 2.5">
          <div class="payment__form container">
            <h2>Данные для заказа</h2>

            <div class="payment__form-fio">
              <div style="display: flex; gap: 0.6rem" class="a">
                <div style="position: relative;">
                  <p>Фамилия</p>
                  <ui-input placeholder="Ваша фамилия" v-model.trim="lastName" />

                  <!-- Кнопка очистки поверх кастомного крестика -->
                  <button
                    v-if="lastName"
                    @click="lastName = ''"
                    style="
                      position: absolute;
                      right: 1.5rem;
                      top: 50%;
                      transform: translateY(-50%);
                      background: none;
                      border: none;
                      cursor: pointer;
                      width: 2rem;
                      height: 5rem;
                      z-index: 2;
                      opacity: 0;
                    "
                  >
                    ✕
                  </button>
                </div>

                <div style="position: relative;">
                  <p>Имя</p>
                  <ui-input placeholder="Ваше имя" v-model.trim="firstName" />

                  <!-- Кнопка очистки поверх кастомного крестика -->
                  <button
                    v-if="firstName"
                    @click="firstName = ''"
                    style="
                      position: absolute;
                      right: 1.5rem;
                      top: 50%;
                      transform: translateY(-50%);
                      background: none;
                      border: none;
                      cursor: pointer;
                      width: 2rem;
                      height: 4rem;
                      z-index: 2;
                      opacity: 0;
                    "
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div style="display: flex; gap: 0.6rem; margin-top: 1.2rem;" class="a">
                <div style="width: 100%; position: relative;">
                  <p>Отчество*</p>
                  <ui-input placeholder="Ваше отчество" v-model.trim="surname" />

                  <!-- Кнопка очистки поверх кастомного крестика -->
                  <button
                    v-if="surname"
                    @click="surname = ''"
                    style="
                      position: absolute;
                      right: 1.5rem;
                      top: 50%;
                      transform: translateY(-50%);
                      background: none;
                      border: none;
                      cursor: pointer;
                      width: 2rem;
                      height: 4rem;
                      z-index: 2;
                      opacity: 0;
                    "
                  >
                    ✕
                  </button>
                </div>

                <div style="width:100%; position: relative;">
                  <p>Номер телефона</p>
                  <ui-input placeholder="Ваш номер телефона" v-model.trim="phoneNumber" />

                  <!-- Кнопка очистки поверх кастомного крестика -->
                  <button
                    v-if="phoneNumber"
                    @click="phoneNumber = ''"
                    style="
                      position: absolute;
                      right: 1.5rem;
                      top: 50%;
                      transform: translateY(-50%);
                      background: none;
                      border: none;
                      cursor: pointer;
                      width: 2rem;
                      height: 4rem;
                      z-index: 2;
                      opacity: 0;
                    "
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <div class="payment__form-fio">
              <p>Способ доставки</p>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  gap: 0.6rem;
                  margin-bottom: 1.6rem;
                "
              >
                <ui-checkbox-block
                  v-model="deliveryMethod"
                  v-for="delivery in deliveryMethods"
                  :value="delivery.val"
                  :title="delivery.title"
                />
              </div>
            </div>

            <div class="payment__form-fio">
              <div v-if="deliveryMethod[0] !== deliveryMethods[0].val" style="margin-top: 1.2rem; position: relative;">
                <p>Город</p>
                <ui-input placeholder="Ваш город" v-model.trim="city" />

                <!-- Кнопка очистки поверх кастомного крестика -->
                <button
                  v-if="city"
                  @click="city = ''"
                  style="
                    position: absolute;
                    right: 1.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    width: 2rem;
                    height: 4rem;
                    z-index: 2;
                    opacity: 0;
                  "
                >
                  ✕
                </button>
              </div>
              <div v-if="deliveryMethod[0] !== 'СДЭК'" style="margin-top: 1.2rem; position: relative;">
                <p>Адрес</p>
                <ui-input placeholder="Ваш адрес" v-model.trim="address" />

                <!-- Кнопка очистки поверх кастомного крестика -->
                <button
                  v-if="address"
                  @click="address = ''"
                  style="
                    position: absolute;
                    right: 1.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    width: 2rem;
                    height: 4rem;
                    z-index: 2;
                    opacity: 0;
                  "
                >
                  ✕
                </button>
              </div>
              <div v-if="deliveryMethod[0] === deliveryMethods[1].val" style="margin-top: 1.2rem; position: relative;">
                <p>ПВЗ (адрес пункта выдачи ТК СДЕК)</p>
                <ui-input placeholder="Нужный ПВЗ" v-model.trim="pvz" />

                <!-- Кнопка очистки поверх кастомного крестика -->
                <button
                  v-if="pvz"
                  @click="pvz = ''"
                  style="
                    position: absolute;
                    right: 1.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    width: 2rem;
                    height: 4rem;
                    z-index: 2;
                    opacity: 0;
                  "
                >
                  ✕
                </button>
              </div>
              <div v-if="deliveryMethod[0] === deliveryMethods[2].val" style="margin-top: 1.2rem; position: relative;">
                <p>Почтовый индекс</p>
                <ui-input placeholder="Ваш почтовый индекс" v-model.trim="postalCode" />

                <!-- Кнопка очистки поверх кастомного крестика -->
                <button
                  v-if="postalCode"
                  @click="postalCode = ''"
                  style="
                    position: absolute;
                    right: 1.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    width: 2rem;
                    height: 4rem;
                    z-index: 2;
                    opacity: 0;
                  "
                >
                  ✕
                </button>
              </div>
              <div style="margin-top: 1.2rem; position: relative;">
                <p>Комментарий</p>
                <ui-input placeholder="Ваш комментарий (при необходимости)" v-model.trim="message" />

                <!-- Кнопка очистки поверх кастомного крестика -->
                <button
                  v-if="message"
                  @click="message = ''"
                  style="
                    position: absolute;
                    right: 1.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    width: 2rem;
                    height: 4rem;
                    z-index: 2;
                    opacity: 0;
                  "
                >
                  ✕
                </button>
              </div>
            </div>

            <div class="payment__form-fio">
              <ui-btn block dark @click="createOrder">
                Перейти к оплате
              </ui-btn>
            </div>
          </div>
        </div>

        <div class="payment__preview-order">
          <div class="container">
            <div class="desktop">
              <h2>Состав заказа</h2>
              <div>
                <app-product-card-stroke
                  v-for="item in cart.$state.cart"
                  :key="item.title"
                  small
                  :size-id="item.size_id"
                  style="
                    padding: 0;
                    border: 0;
                    min-height: 10.6rem;
                    margin-top: 1rem;
                  "
                  :_id="item.product_id"
                  :discount="item.discount || 0"
                  :preview="item.preview"
                  :price="item.price"
                  :size-grid="item.size_grid"
                  :size-value="item.size_title"
                  :title="item.title"
                />
              </div>
            </div>

            <div class="promocode" style="margin-top: 2.6rem">
              <h2>Промокод</h2>
              <div style="display: flex; gap: 0.6rem; margin-top: 1.2rem; position: relative;">
                <ui-input placeholder="При наличии" v-model.trim="promocode" />
                <ui-btn class="promocode-btn">
                  <svg
                    style="width: 2.1rem"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L13 11L7 5"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </ui-btn>

                <!-- Невидимая кнопка очистки размещена поверх кастомного крестика -->
                <button
                  v-if="promocode"
                  @click="promocode = ''"
                  style="
                    position: absolute;
                    right: 1.5rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    width: 2rem;
                    height: 4rem;
                    z-index: 2;
                    opacity: 0;
                  "
                >
                  ✕
                </button>
              </div>
            </div>

            <div style="margin-top: 2.6rem">
              <app-price-list />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>

  <view-payment-mobile v-if="isMobile" />
</template>

<style scoped lang="scss">
.payment {
  gap: 1.6rem;
  display: flex;

  h2 {
    margin: 0;
    font-weight: 500;
    font-size: 2.5rem;
  }

  &__form {
    box-shadow: 0px 4px 48.7px 0px rgba(0, 0, 0, 0.13);
  }

  &__form-fio {
    margin-top: 3rem;
    div:nth-child(1) {
      div:nth-child(1),
      div:nth-child(2) {
        width: 100%;
      }
    }

    p {
      font-size: 1.5rem;
      margin-left: 1.7rem;
      margin-bottom: 1rem;
    }
  }

  &__preview-order {
    flex: 1;
    min-width: 32.5rem;
  }
}

.promocode-btn {
  height: 5.6rem;
  border-radius: 0.8rem;
  min-width: 6.6rem;
}

@media (max-width: 720px) {
  .page-container {
    padding-left: 0;
    padding-right: 0;
  }

  .desktop {
    display: none;
  }

  .promocode {
    h2 {
      font-size: 1.5rem;
      font-weight: 400;
      text-align: left;
    }
  }

  .promocode-btn {
    height: 7rem;
  }

  .payment {
    flex-direction: column;

    h2 {
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
    }

    .a {
      flex-direction: column;
      gap: 1.2rem !important;
    }
  }
}
</style>