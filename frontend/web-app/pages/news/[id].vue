<script setup lang="ts">
const route = useRoute();

const result = await $fetch<{
  title: string;
  subtitle: string;
  preview: string;
  created_at: string;
  photos: string[];
  text: string;
  to: string;
  btnTitle: string;
}>("http://localhost:8080/v1/search/news/" + route.path.split("/").at(-1));

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

const { isMobile} = useDevice();
</script>

<template>
  <q-page v-if="!isMobile">
    <div class="page-container page-padding">
      <h1 class="post__title">{{ result.title }}</h1>
      <p class="post__date">{{ formatDate(new Date(result.created_at)) }}</p>
  
      <img
        class="post__preview"
        :src="'http://localhost:8080/' + result.preview"
        :alt="result.title"
      />
  
      <h2 class="post__subtitle">{{ result.subtitle }}</h2>
  
      <template v-for="(block, i) in textBlocks">
        <p class="post__text" v-html="block"></p>
  
        <img
          v-if="result.photos.length"
          class="post__preview"
          :src="'http://localhost:8080/' + result.photos[i]"
        />
      </template>
  
      <div style="display: flex; justify-content: center;">
        <q-btn
          style="
            width: 50rem;
            height: 5.8rem;
            font-size: 1.2rem;
            font-weight: 300;
            line-height: 1.406rem;
            background-color: white;
            border: 1px solid rgba(214, 214, 214, 1);
            border-radius: .8rem;
            margin: auto;
            margin-bottom: 3.6rem;
            margin-top: 3.6rem;
            text-transform: none;
          "
          flat
          v-if="result.btnTitle && result.to"
          @click="navigateTo(result.to, { external: true })"
        >
          {{ result.btnTitle }}
        </q-btn>
      </div>
    </div>
  </q-page>

  <view-post-mobile v-if="isMobile" />
</template>

<style scoped lang="scss">
.post {
  &__preview {
    width: 100%;
    height: 55.5rem;
    object-fit: cover;
  }

  &__title,
  &__date,
  &__text,
  &__subtitle {
    margin: auto;
    text-align: center;
    max-width: 57rem;
    font-size: 4rem;
    font-weight: 500;
    line-height: 4.686rem;
    margin-top: 4.2rem;
  }

  &__date {
    opacity: 0.5;
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.406rem;
    margin-top: 2.6rem;
    margin-bottom: 3.1rem;
  }

  &__subtitle {
    font-size: 2.2rem;
    font-weight: 400;
    line-height: 2.577rem;
    margin-top: 4.1rem;
  }

  &__text {
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 2.064rem;
    margin-top: 2.3rem;
    margin-bottom: 2.3rem;
  }
}
</style>
