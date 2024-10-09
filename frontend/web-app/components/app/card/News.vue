<script setup lang="ts">
const props = defineProps<{
  _id: string;
  createdAt: Date;
  preview: string
  title: string;
}>();

function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Получаем отформатированную строку
  let formattedDate = formatter.format(date);

  // Разделяем дату и время
  const [datePart, timePart] = formattedDate.split(", ");

  return `${datePart}`;
}
</script>

<template>
  <div class="news-card" @click="navigateTo('/news/'+_id)">
    <img :src="useCDN(preview)" :alt="title" />

    <div class="news-card__caption">
      <p
        class="news-card__title"
        style="
          font-size: 2.2rem;
          font-weight: 400;
          line-height: 2.577rem;
          text-align: center;
          margin-bottom: 1.2rem;
        "
      >
        {{ title }}
      </p>
      <p
        class="news-card__subtitle"
        style="
          font-size: 1.2rem;
          font-weight: 300;
          line-height: 1.406rem;
          text-align: center;
          opacity: .5;
          margin-bottom: 0;
        "
      >
        {{ formatDate(createdAt) }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news-card {
  width: 100%;
  overflow: hidden;
  border-radius: 0.8rem;
  background-color: white;
  border: 1px solid #d6d6d6;

  img {
    width: 100%;
    height: 31.4rem;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  &__caption {
    padding: 3.6rem 2.5rem;
    border-top: 1px solid #d6d6d6;
  }
}
</style>
