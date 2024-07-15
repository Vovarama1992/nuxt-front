<script setup lang="ts">
const deliveryMethod = ref<any[]>(["СДЭК"]);
const cart = useCartStore();
const q = useQuasar();

const deliveryMethods = [
  { title: "Экспресс-доставка по Москве", val: "Экспресс-доставка по Москве" },
  { title: "СДЭК", val: "СДЭК" },
  { title: "Доставка Почтой России", val: "Доставка Почтой России" },
];

const surname = ref("");
const firstName = ref("");
const lastName = ref("");
const city = ref("");
const address = ref("");
const message = ref("");
const promocode = ref("");
const postalCode = ref("");
const pvz = ref("");
const phoneNumber = ref("");

const createOrder = async () => {
  try {
    const result = await $fetch("https://api.3hundred.ru/v1/order", {
      method: "post",
      headers: {
        Authorization: "Bearer " + useCookie("access_token").value,
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
        })),
      },
    });

    localStorage.setItem("cart", "[]");
    cart.$state.cart = [];
    navigateTo(`/payment/success/${result}`);
  } catch (err: any) {
    q.notify({
      message:
        "Возникла ошибка!Проверьте правильность заполнения полей или попробуйте собрать корзину заново",
      color: "danger",
    });
  }
};
</script>

<template>
  <app-subheader-mobile title="Оформление заказа" />

  <div class="container" style="margin-top: 1.6rem">
    <p
      style="
        font-weight: 500;
        font-size: 2.2rem;
        line-height: 117%;
        text-align: center;
        margin-bottom: 0;
      "
    >
      Данные для заказа
    </p>

    <div style="margin-top: 2.7rem">
      <p class="text-field-label">Имя</p>
      <ui-input v-model="firstName" placeholder="Ваше имя" />
    </div>

    <div style="margin-top: 1.8rem">
      <p class="text-field-label">Фамилия</p>
      <ui-input v-model="lastName" placeholder="Ваша фамилия" />
    </div>

    <div style="margin-top: 1.8rem">
      <p class="text-field-label">Отчество*</p>
      <ui-input v-model="surname" placeholder="Ваше отчество" />
    </div>

    <div style="margin-top: 1.8rem">
      <p class="text-field-label">Номер телефона</p>
      <ui-input v-model="phoneNumber" placeholder="Ваш номер телефона" />
    </div>

    <!-- <div style="margin-top: 2.7rem">
      <p class="text-field-label">Адрес доставки</p>
      <app-address-picker />
    </div> -->
    <div style="margin-top: 2.7rem">
      <div v-if="deliveryMethod[0] !== deliveryMethods[0].val" style="margin-top: 1.8rem">
        <p class="text-field-label">Город</p>
        <ui-input placeholder="Ваш город" v-model.trim="city" />
      </div>
      <div v-if="deliveryMethod[0] !== 'СДЭК'" style="margin-top: 1.8rem">
        <p class="text-field-label">Адрес</p>
        <ui-input placeholder="Ваш адрес" v-model.trim="address" />
      </div>
      <div v-if="deliveryMethod[0] === deliveryMethods[1].val" style="margin-top: 1.8rem">
        <p class="text-field-label">ПВЗ (адрес пункта выдачи ТК СДЕК)</p>
        <ui-input placeholder="Нужный ПВЗ" v-model.trim="pvz" />
      </div>
      <div v-if="deliveryMethod[0] === deliveryMethods[2].val" style="margin-top: 1.8rem">
        <p class="text-field-label">Почтовый индекс</p>
        <ui-input placeholder="Ваш почтовый индекс" v-model.trim="postalCode" />
      </div>
    </div>

    <div style="margin-top: 2.7rem">
      <p class="text-field-label">Способ доставки</p>
      <ui-checkbox-block
        v-model="deliveryMethod"
        v-for="delivery in deliveryMethods"
        :value="delivery.val"
        :title="delivery.title"
        style="margin-top: 1rem; border-radius: 0.8rem"
      />
    </div>
    <div style="margin-top: 1.5rem">
      <ui-input
        v-model="message"
        placeholder="Комментарий (при необходимости)"
      />
    </div>

    <div style="margin-top: 2.7rem">
      <p class="text-field-label">Промокод</p>

      <div style="display: flex; gap: 1rem">
        <ui-input v-model="promocode" placeholder="При наличии" />
        <ui-btn style="width: 8.9rem; height: 7.2rem; border-radius: 0.8rem">
          <svg
            style="width: 1.1rem; height: 2.2rem"
            viewBox="0 0 13 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 23L12 12L1 1"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </ui-btn>
      </div>
    </div>
  </div>

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
        v-for="card in cart.$state.cart"
        :key="card.product_id"
        :_id="card.product_id"
        :preview="card.preview"
        :price="card.price"
        :title="card.title"
        :discount="0"
        :size-grid="card.size_grid"
        :size-value="card.size_title"
        :quantity="1"
      />
    </div>
  </ui-accardion-fill>

  <div class="container" style="margin-top: 1.3rem; margin-bottom: 1.6rem">
    <app-price-list :price="0" :services="[]" />

    <ui-btn
      block
      dark
      style="margin-top: 1rem"
      @click="createOrder"
    >
      Перейти к оплате
    </ui-btn>
  </div>

  <!-- <q-dialog v-model="addressDialog">
    <div style="width: 100%; background-color: #fff; padding: 3rem 1rem">
      <p class="text-field-label" style="font-size: 2rem">Адрес доставки</p>
      <div style="width: 100%; margin-top: 3rem">
        <p class="text-field-label">Город</p>
        <ui-input
          style="height: 5.6rem"
          v-model="city"
          placeholder="Ваш город"
        />
      </div>
      <div style="width: 100%; margin-top: 1.5rem">
        <p class="text-field-label">Полный адрес</p>
        <ui-input
          style="height: 5.6rem"
          v-model="address"
          placeholder="Ваш адрес"
        />
      </div>

      <ui-btn
        block
        dark
        style="margin-top: 1.5rem"
        @click="
          () => {
            addressDialog = false;
            addressSelect = true;
          }
        "
      >
        Добавить адрес
      </ui-btn>
    </div>
  </q-dialog> -->
</template>

<style scoped lang="scss">
.text-field-label {
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 117%;
  margin-left: 1.5rem;
  margin-bottom: 1.4rem;
}

.checkbox-block {
  display: flex;
  align-items: center;
  height: 7.2rem;
  padding: 0 2.8rem;
  border-radius: 0.8rem;
  border: 1px solid #d6d6d6;
}
</style>
