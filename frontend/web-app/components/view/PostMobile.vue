<script setup lang="ts">
const route = useRoute();

const { $api } = useNuxtApp();
const { data: result } = await $api.v1.newsControllerGet(route.params.id as string);

function formatDate(date: any) {
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

const textBlocks = result.text.split("{{image}}");
</script>

<template>
  <img class="post__preview" :src="useCDN(result.preview)" :alt="result.title" />

  <h1 class="post__title">{{ result.title }}</h1>
  <p class="post__date">{{ formatDate(new Date(result.created_at)) }}</p>

  <h2 class="post__subtitle">{{ result.subtitle }}</h2>

  <template v-for="(block, i) in textBlocks">
    <p class="post__text" v-html="block"></p>

    <img v-if="result.photos.length" class="post__preview" :src="useCDN(result.photos[i])" />
  </template>

  <div style="display: flex; justify-content: center; padding: 0 1.1rem;">
      <q-btn
        style="
          width: 100%;
          height: 7.2rem;
          font-size: 1.8rem;
          font-weight: 400;
          background-color: white;
          border: 1px solid rgba(214, 214, 214, 1);
          border-radius: .8rem;
          margin: auto;
          margin-bottom: 3.6rem;
          margin-top: 3.6rem;
          text-transform: none;
        "
        flat
        v-if="result.button_label && result.to"
        @click="navigateTo(result.to, { external: true })"
      >
        {{ result.button_label }}
      </q-btn>
    </div>
</template>

<style scoped lang="scss">
img {
  display: block;
}
.post {
  &__preview {
    width: 100%;
    height: 32.2rem;
    object-fit: cover;
  }

  &__title, &__date, &__text, &__subtitle {
    margin: auto;
    margin-top: 2.8rem;
    text-align: center;
    max-width: 31rem;
    font-size: 2.2rem;
    font-weight: 400;
    line-height: 2.577rem;
  }

  &__date {
    opacity: .5;
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.406rem;
    margin-top: 1.3rem;
  }

  &__subtitle {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.109rem;
    margin-top: 2.9rem;
  }

  &__text {
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 2.064rem;
    margin-top: 3.5rem;
    margin-bottom: 3.5rem;
  }
}
</style>