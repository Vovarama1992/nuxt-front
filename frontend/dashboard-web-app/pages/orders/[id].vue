<script setup lang="ts">
const route = useRoute();
const productId = route.path.split("/").at(-1) as string;

const created = ref(false);
const paid = ref(false);
const completed = ref(false);
const onitsWay = ref(false);
const completedRefaund = ref(false);
const rejected = ref(false);
const refaund = ref(false);
const trackNumber = ref('');

const order = ref({});

const format = (date: any) => {
  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
  }).format(new Date(date));

  return formattedDate.replace(/(\d{4})/, "$1г.");
};

const allFalse = () => {
  created.value = false
  paid.value = false
  completed.value = false
  onitsWay.value = false
  completedRefaund.value = false
  rejected.value = false
  refaund.value = false
}

const getStatus = (statusEn: string) => {
  allFalse()

  if (statusEn === "created") {
    created.value = true;
    return "Не оплачен"
  };
  if (statusEn === "paid") {
    paid.value = true;
    return "На сборке"
  };
  if (statusEn === "on_its_way") {
    onitsWay.value = true;
    return "Сейчас в пути"
  };
  if (statusEn === "completed") {
    completed.value = true;
    return "Выполнен"
  };
  if (statusEn === "completed_refaund") {
    completedRefaund.value = true;
    return "На возврате"
  };
  if (statusEn === "rejected") {
    rejected.value = true;
    return "Отменен"
  };
  if (statusEn === "refaund") {
    refaund.value = true;
    return "Возвращен"
  };
};

const send = async () => {
  try {
    const result = await $fetch(
      "https://api.3hundred.ru/v1/dashboard/orders/order/" + productId,
      {
        headers: {
          Authorization: "Bearer " + useCookie("access_token").value,
        },
      }
    );

    order.value = result;
    trackNumber.value = order.value.delivery_details?.trak_number || '';
    getStatus(order.value.status)
  } catch (err) {}
};

const chagneStatus = async (status: string) => {
  await $fetch('https://api.3hundred.ru/v1/dashboard/orders/order/status', {
    method: 'patch',
    headers: {
      Authorization: 'Bearer ' + useCookie('access_token').value,
    },
    body: {
      order_id: productId,
      status,
    },
  });
  getStatus(status)
}

const changeTrack = async () => {
  await $fetch('https://api.3hundred.ru/v1/dashboard/orders/order/track-number', {
    method: 'patch',
    headers: {
      Authorization: 'Bearer ' + useCookie('access_token').value,
    },
    body: {
      order_id: productId,
      track_number: trackNumber.value.trim(),
    },
  });
}

await send();
</script>

<template>
  <q-page padding class="container">
    <p class="text-h4 q-pb-lg">ID: {{ productId }}</p>

    <div style="display: flex; flex-direction: column; margin-bottom: 4rem">
      <span style="font-weight: 500" class="text-subtitle1"> Статус </span>
      <q-toggle
        style="margin: 0"
        color="black"
        v-model="created"
        class="q-mb-sm"
        label="Не оплачен"
        @click="() => chagneStatus('created')"
      />
      <q-toggle
        style="margin: 0"
        color="blue"
        v-model="paid"
        class="q-mb-sm"
        label="На сборке (оплачен)"
        @click="() => chagneStatus('paid')"
      />
      <q-toggle
        style="margin: 0"
        color="green"
        v-model="onitsWay"
        class="q-mb-sm"
        label="В пути (после добавления трек-номера)"
        @click="() => chagneStatus('on_its_way')"
      />
      <q-toggle
        style="margin: 0"
        color="green"
        v-model="completed"
        class="q-mb-sm"
        label="Выполнен"
        @click="() => chagneStatus('completed')"
      />
      <q-toggle
        style="margin: 0"
        color="red"
        v-model="completedRefaund"
        @click="() => chagneStatus('completed_refaund')"
        class="q-mb-sm"
        label="Возвращен"
      />
      <q-toggle
        style="margin: 0"
        color="orange"
        v-model="rejected"
        @click="() => chagneStatus('rejected')"
        class="q-mb-sm"
        label="Отменен"
      />
      <q-toggle
        style="margin: 0"
        color="orange"
        v-model="refaund"
        @click="() => chagneStatus('refaund')"
        class="q-mb-sm"
        label="На возврате"
      />
      <q-separator />
    </div>

    <div style="display: flex; flex-direction: column; margin-bottom: 4rem">
      <span
        style="font-weight: 500; margin-bottom: 1rem"
        class="text-subtitle1"
      >
        Покупатель
      </span>

      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          ФИО:
          <b>{{
            order.customer?.first_name +
            " " +
            order.customer?.last_name +
            " " +
            order.customer?.surname
          }}</b>
        </p>
      </div>

      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Доставка: <b>{{ order.delivery_details.delivery_method }}</b>
        </p>
      </div>

      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Адрес:
          <b>{{ order.customer?.city + " " + order.customer?.address }}</b>
        </p>
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Номер телефона:
          <b>{{ order.customer?.phone_number || "Не заполнено" }}</b>
        </p>
      </div>

      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Почтовый индекс:
          <b>{{ order.customer?.postal_code || "Не заполнено" }}</b>
        </p>
      </div>

      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          ПВЗ: <b>{{ order.customer?.pvz || "Не заполнено" }}</b>
        </p>
      </div>

      <q-separator />
    </div>

    <div style="display: flex; flex-direction: column; margin-bottom: 4rem">
      <span
        style="font-weight: 500; margin-bottom: 1rem"
        class="text-subtitle1"
      >
        Содержание
      </span>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
        <div v-for="item in order.items" :key="order._id" class="order__card">
          <b>ID</b>
          <p>{{ item.product_id }}</p>
          <b>Название</b>
          <p>{{ item.product_title }}</p>
          <b>Размерная сетка</b>
          <p>{{ item.size_grid }}</p>
          <b>ID Размера</b>
          <p>{{ item.size_id }}</p>
          <b>Размер</b>
          <p>{{ item.size_title }}</p>
          <b>Цена</b>
          <p>{{ item.price }}</p>
          <b>Количество</b>
          <p>{{ item.quantity }}</p>
        </div>
      </div>
      <q-separator style="margin-top: 1rem" />
    </div>

    <div style="display: flex; flex-direction: column; margin-bottom: 4rem">
      <span
        style="font-weight: 500; margin-bottom: 1rem"
        class="text-subtitle1"
      >
        Дополнительно
      </span>
      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Промокод:
          <b>{{ order.payment_details?.promo_code || "Не заполнено" }}</b>
        </p>
      </div>

      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Трек-номер:
          <q-input v-model="trackNumber" />
        </p>
        <q-btn
          rounded
          flat
          style="text-transform: none; color: #444; margin-left: 2rem"
          @click="changeTrack"
          >Добавить</q-btn
        >
      </div>

      <div style="display: flex; align-items: center; margin-bottom: 1rem">
        <p style="margin-bottom: 0">
          Комментарий:
          <b>{{ order.comment || "Не заполнено" }}</b>
        </p>
      </div>

      <q-separator />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.order {
  &__card {
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
