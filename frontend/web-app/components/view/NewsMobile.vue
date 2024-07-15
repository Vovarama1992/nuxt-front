<script setup lang="ts">
// db.news.insertMany([
//   {
//     title: 'Stüssy Summer 24 Lookbook',
//     subtitle: 'Новая летняя коллекция Stüssy на сезон 2024 уже здесь!',
//     created_at: new Date(),
//     text: 'Готовьтесь к ярким и стильным летним образам с легендарным брендом Stüssy. Новая коллекция приносит вам свежие тренды, яркие цвета и ультра-комфортные модели, которые подчеркнут вашу индивидуальность и стиль.{{image}}Stüssy показали, что такое непринужденный костюм, штаны с эффектом выцветания, фланелевые рубашки и прочую городскую базу. От классических футболок и шорт до стильных пляжных нарядов и аксессуаров — Stussy Summer 2024 collection предлагает широкий выбор для каждого любителя уличной моды. Эта коллекция сочетает в себе дух калифорнийского пляжного стиля с элементами уличной моды, создавая уникальный и неповторимый образ.',
//     preview: 'gp2.jpg',
//     photos: ['gpt3.jpg', 'gpt4.jpg', 'gpt5.jpg', 'gpt6.jpg', '2.jpg', '3.jpg'],
//   },
//   {
//     title: 'Nike Air Jordan 1 X Travis Scott “Pink Pack”',
//     subtitle: 'Этот релиз уже вызвал огромный интерес со стороны поклонников культовой марки',
//     created_at: new Date(),
//     text: 'Этот новый цветовой вариант кроссовок Air Jordan 1 от Travis Scott будет выполнен в нежных розовых тонах, что делает их еще более желанными для коллекционеров и поклонников стиля.{{image}}На данный момент даты релиза объявленa на весну 2025. Уже можно сказать, что Pink Pack от Travis Scott станет одним из самых горячих релизов этого года. Ожидается, что эти кроссовки будут разлетаться моментально, как и все предыдущие совместные коллаборации между Nike и Travis Scott.',
//     preview: 'c6.jpg',
//     photos: ['c2.jpg', 'c3.jpg', 'c4.jpg', 'c5.jpg', 'c1.jpg', 'c7.jpg'],
//   },
//   {
//     title: 'Dior x Stone Island',
//     subtitle: 'Долгожданное сотрудничество',
//     created_at: new Date(),
//     text: `Это событие в мире моды невозможно проигнорировать - долгожданное сотрудничество между двумя иконами индустрии: Stone Island и DIOR. Когда два мировых гиганта объединяют усилия, результат превосходит все ожидания.
// {{image}}
// Stone Island, известный своим инновационным подходом к материалам и технологиям, встречается с элегантностью и роскошью DIOR. Эта коллаборация не только сочетает в себе лучшие качества обеих марок, но и создает совершенно новое модное направление.
// {{image}}
// Коллекция Stone Island x DIOR - это симбиоз утонченности и функциональности. Технические материалы Stone Island в сочетании с роскошными деталями и акцентами DIOR создают уникальные и неповторимые образы. Это не просто одежда, это произведение искусства, в котором каждая деталь продумана до мелочей.
// {{image}}
// Эта коллаборация стала настоящим событием в мире моды, привлекая внимание как ценителей классического стиля DIOR, так и поклонников технологических инноваций Stone Island. Stone Island x DIOR - это сочетание двух миров, которые дополняют друг друга, создавая новые стандарты в индустрии моды.
// {{image}}
// Не упустите возможность прикоснуться к этому уникальному сотрудничеству и ощутить на себе влияние двух легендарных брендов. Stone Island x DIOR - это не просто коллаборация, это новая страница в истории моды.
// `,
//     preview: 'd5.jpg',
//     photos: ['d1.jpg', 'd2.jpg', 'd3.jpg', 'd4.jpg', 'd5.jpg', 'd6.jpg'],
//   },
//   {
//     title: 'Rolls-Royce "Spirit of Expression" Trio',
//     subtitle: 'Удивительная коллекция автомобилей',
//     created_at: new Date(),
//     text: `Rolls-Royce "Spirit of Expression" Trio - это удивительная коллекция автомобилей, которая воплощает в себе высший класс, роскошь и индивидуальность, характерные для бренда Rolls-Royce.
// {{image}}
// Этот тройной ансамбль, состоящий из Rolls-Royce Phantom, Dawn и Wraith, представляет собой истинное произведение искусства на четырех колесах. Каждая модель в этой коллекции отличается уникальным дизайном и непревзойденным качеством исполнения, что делает их поистине великолепными произведениями автомобильного мастерства.
// <br>
// Rolls-Royce Phantom, воплощение роскоши и комфорта, представляет собой вершину автомобильного мастерства. Dawn, кабриолет с безупречными линиями и изысканным интерьером, призван подчеркнуть элегантность и стиль своего владельца. Wraith, спортивный купе с мощным двигателем, сочетает в себе элегантность и динамику, создавая неповторимый образ.
// {{image}}
// Каждый автомобиль из коллекции "Spirit of Expression" Trio является уникальным произведением искусства, способным вызвать восхищение и восторг у всех ценителей красоты и роскоши. Эти автомобили не просто средство передвижения, они являются воплощением статуса, стиля и изыска.
// {{image}}
// Rolls-Royce "Spirit of Expression" Trio - это не просто автомобили, это истинные шедевры, которые заслуживают восхищения и вечной благодарности своих владельцев.
// `,
//     preview: '2xr3.jpg',
//     photos: ['2xr1.jpg', '2xr2.jpg', '2xr4.jpg', '2xr5.jpg', '2xr6.jpg', '2xr7.jpg'],
//   },
// ]);

const route = useRoute();
const currentPage = ref(parseInt(String(route.query.page || 1)))
const { data, execute } = await useFetch<{
  content: [];
  props: {
    total_items: number;
    total_page: number;
  };
}>("https://api.3hundred.ru/v1/search/news", {
  query: {
    limit: 5,
    page: currentPage,
  },
  server: false,
  immediate: false,
  watch: false,
});
const news = ref<any[][]>([]);
await execute();

if (data.value?.content) {
  news.value.push(data.value?.content);
}

async function nextPage() {
  currentPage.value += 1;
  await navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      page: currentPage.value,
    }
  });
  await execute();

  if (data.value?.content) {
    news.value.push(data.value?.content);
  }
}
</script>

<template>
  <app-subheader-mobile title="Новости" />
  <div style="padding: 2.2rem 1.6rem; display: flex; flex-direction: column; gap: .9rem">
    <template v-for="(page) in news" :key="page">
      <div
        style="
          display: flex;
          flex-shrink: 0;
          flex-wrap: wrap;
          row-gap: 0.9rem;
          column-gap: 0.5rem;
        "
      >
        <template v-for="(n, i) in page" :key="n._id">
          <app-card-news
            :_id="n._id"
            :title="n.title"
            :preview="n.preview"
            :style="i > 0 ? 'width: calc(50% - .25rem)':''"
            :class="{
              'mobile-small-news': i > 0
            }"
            :created-at="new Date(n.created_at)"
          />
        </template>
      </div>
    </template>
  </div>

  <div style="padding: 1.8rem 1.6rem; padding-top: 0;" v-if="currentPage < data?.props.total_page">
    <ui-btn block dark style="font-size: 1.8rem; height: 7.2rem; border-radius: .8rem;" @click="nextPage">
      Больше материала
      <svg style="margin-left: 1rem;" width="1.7rem" height="1.4rem" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.37948 0.999999L8.50028 8.12081L15.6211 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </ui-btn>
  </div>
</template>

<style lang="scss">
.mobile-small-news {
  img {
    height: 16rem!important;
  }

  .news-card__caption {
    padding: 1.6rem 1.9rem!important;
    padding-bottom: 2.2rem!important;
  }

  .news-card__title, .news-card__subtitle {
    font-size: 1.2rem!important;
    font-weight: 400!important;
    line-height: 1.406rem!important;
    text-align: left!important;
  }
  
  .news-card__subtitle {
    font-weight: 300!important;
  }
}
</style>