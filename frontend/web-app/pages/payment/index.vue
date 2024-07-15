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

const createOrder = async () => {
  try {
    const result = await $fetch('https://api.3hundred.ru/v1/order', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + useCookie('access_token').value,
      },
      body: {
        first_name: firstName.value,
        last_name: lastName.value,
        postal_code: postalCode.value,
        phone_number: phoneNumber.value,
        pvz: pvz.value,
        surname: surname.value,
        delivery_address: {
          city: deliveryMethod.value[0] === 'Экспресс-доставка по Москве' ? 'Экспресс-доставка по Москве' : city.value,
          address: address.value,
        },
        promocode: promocode.value,
        delivery_method: deliveryMethod.value[0],
        products: cart.$state.cart.map((el) => ({
          product_id: el.product_id,
          size_id: el.size_id,
          quantity: el.quantity,
        }))
      }
    })

    localStorage.setItem('cart', '[]');
    cart.$state.cart = [];
    navigateTo(`/payment/success/${result}`)
  } catch (err: any) {
    q.notify({
      message: 'Возникла ошибка! Проверьте правильность заполнения полей или попробуйте собрать корзину заново',
      color: 'danger'
    })
  }
}
</script>

<template>
  <q-page v-if="!isMobile">
    <app-subheader>Оформление заказа</app-subheader>
    <div class="page-container page-padding">
      <div class="payment">
        <div style="flex: 2.5">
          <div
            class="payment__form container"
          >
            <h2>Данные для заказа</h2>

            <div class="payment__form-fio">
              <div style="display: flex; gap: 0.6rem" class="a">
                <div>
                  <p>Фамилия</p>
                  <ui-input placeholder="Ваша фамилия" v-model.trim="lastName" />
                </div>

                <div>
                  <p>Имя</p>
                  <ui-input placeholder="Ваше имя" v-model.trim="firstName" />
                </div>
              </div>

              <div style="display: flex; gap: 0.6rem; margin-top: 1.2rem;" class="a">
                <div style="width: 100%;">
                  <p>Отчество*</p>
                  <ui-input placeholder="Ваш отчество" v-model.trim="surname" />
                </div>

                <div style="width:100%;">
                  <p>Номер телефона</p>
                  <ui-input placeholder="Ваш номер телефона" v-model.trim="phoneNumber" />
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
              <div v-if="deliveryMethod[0] !== deliveryMethods[0].val" style="margin-top: 1.2rem">
                <p>Город</p>
                <ui-input placeholder="Ваш город" v-model.trim="city" />
              </div>
              <div v-if="deliveryMethod[0] !== 'СДЭК'" style="margin-top: 1.2rem">
                <p>Адрес</p>
                <ui-input placeholder="Ваш адрес" v-model.trim="address" />
              </div>
              <div v-if="deliveryMethod[0] === deliveryMethods[1].val" style="margin-top: 1.2rem">
                <p>ПВЗ (адрес пункта выдачи ТК СДЕК)</p>
                <ui-input placeholder="Нужный ПВЗ" v-model.trim="pvz" />
              </div>
              <div v-if="deliveryMethod[0] === deliveryMethods[2].val" style="margin-top: 1.2rem">
                <p>Почтовый индекс</p>
                <ui-input placeholder="Ваш почтовый индекс" v-model.trim="postalCode" />
              </div>
              <div style="margin-top: 1.2rem">
                <p>Комментарий</p>
                <ui-input placeholder="Ваш комментарий (при необходимости)" v-model.trim="message" />
              </div>
            </div>
            <!-- <div class="payment__form-fio">
              <p>Адрес доставки</p>
              <app-address-picker />
            </div> -->

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
                  :discount="item.discount"
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
              <div style="display: flex; gap: 0.6rem; margin-top: 1.2rem">
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
