<script setup lang="ts">
const orders = ref([]);

const format = (date: any) => {
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric'
  }).format(new Date(date));

  return formattedDate.replace(/(\d{4})/, '$1г.');
}

const getStatus = (statusEn: string) => {
  if (statusEn === "created") return "Не оплачен";
  if (statusEn === "paid") return "На сборке";
  if (statusEn === "on_its_way") return "В пути";
  if (statusEn === "completed") return "Выполнен";
  if (statusEn === "completed_refaund") return "На возврате";
  if (statusEn === "rejected") return "Отменен";
  if (statusEn === "refaund") return "Возвращен";
};

const send = async () => {
  try {
    const result = await $fetch('https://api.3hundred.ru/v1/dashboard/orders', {
      headers: {
        Authorization: 'Bearer ' + useCookie('access_token').value
      },
    });
  
    orders.value = result;
  } catch (err) {
  
  }
}

await send();
</script>

<template>
  <q-page style="width: min(840px, 100%); margin: auto; padding: 3rem 0;">
    <div class="orders__container">
      <div
        v-for="order in orders"
        :key="order._id"
        class="order__card"
      >
        <b>ID</b>
        <p>{{ order._id }}</p>
        <b>Дата создания</b>
        <p>{{ format(order.created_at) }}</p>
        <b>Итоговая цена</b>
        <p>{{ order.total_amount_promocode }}</p>
        <b>ФИО</b>
        <p>{{ order.customer.first_name }} {{ order.customer.last_name }} {{ order.customer.surname }}</p>
        <b>Статус </b>
        <p style="margin-bottom: 0;">{{ getStatus(order.status) }}</p>

        <q-btn
          color="primary"
          flat
          rounded
          style="width: 100%; margin-top: 1rem; text-decoration: none;"
          @click="navigateTo('/orders/' + order._id)"
        >
          Подробнее
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.orders__container {
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.order {
  &__card {
    width: 100%;
    padding: 1rem;
    border-radius: .5rem;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, .1);
  }
}
</style>