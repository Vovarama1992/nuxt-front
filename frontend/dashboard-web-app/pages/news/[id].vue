<script lang="ts" setup>
const route = useRoute();
const { $api } = useNuxtApp();

const { data, refresh } = await useAsyncData(
  async () =>
    (await $api.v1.newsControllerGet(route.params.id as string)).data,
  { immediate: true }
);

const editor = ref<any>(null);

const title = ref('');
const subtitle = ref('');
const text = ref('');
const preview = ref<string>();
const map: Record<string, File> = {};
const buttonLink = ref('');
const buttonLabel = ref('');

const unData = unref(data);
if (!unData)
  navigateTo('/')
else {
  title.value = unData.title;
  subtitle.value = unData.subtitle;
  preview.value = useCDN(unData.preview);
  buttonLink.value = unData.to;
  buttonLabel.value = unData.button_label;

  let image = -1;
  text.value = unData.text.replaceAll('{{image}}', () => {
    image++;
    return `<img src="${useCDN(unData.photos[image])}"/>`;
  });
}

function promptFileUpload() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/png, image/jpeg, image/webp';
  input.click();

  return new Promise<string | null>(resolve =>
    input.addEventListener('change', () => {
      if (!input.files)
        return null;

      const url = URL.createObjectURL(input.files[0]);
      map[url] = input.files[0];
      resolve(url);

      input.remove();
    })
  );
}

async function replaceThumbnail() {
  const file = await promptFileUpload();
  if (!file) return;

  preview.value = file;
}

async function insertImage() {
  const file = await promptFileUpload();
  if (!file) return;

  const edit = unref(editor);
  edit.caret.restore();
  edit.runCmd('insertHTML', `<img src="${file}"/>`);
  edit.caret.restore();
  edit.focus();
}

async function update() {
  const domParser = new DOMParser();

  const dom = domParser.parseFromString(unref(text).replaceAll('\n', '<br>'), 'text/html');

  const images: string [] = [];
  let parsed = '';
  dom.body.childNodes.forEach(x => {
    if (x.nodeType === Node.ELEMENT_NODE) {
      switch (true) {
        case (x instanceof HTMLImageElement):
          parsed += '{{image}}';
          images.push(x.src);
          return;
        case (x instanceof HTMLBRElement):
          parsed += '<br>';
          return;
      }
    }

    parsed += x.textContent;
  });

  console.log(parsed);
  console.log(unData?.text);

  let image = -1;
  text.value = parsed.replaceAll('{{image}}', () => {
    image++;
    return `<img src="${images[image]}"/>`;
  });
}
</script>

<template>
  <div class="container">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="save" color="accent" @click="update" />
    </q-page-sticky>

    <h4>Основная информация</h4>

    <div class="q-gutter-y-lg">
      <div class="row">
        <div class="col-8 q-gutter-y-sm q-pr-sm">
          <q-input v-model="title" label="Заголовок"></q-input>
          <q-input v-model="subtitle" label="Подзаголовок" autogrow></q-input>
        </div>
        <div class="col-4 q-pl-sm">
          <q-img
            v-if="preview"
            :src="preview"
            class="rounded-borders"
          >
            <div class="absolute-top-left button-container">
              <q-btn round color="primary" icon="edit" @click="replaceThumbnail" />
            </div>
          </q-img>
        </div>
      </div>

      <q-editor
        ref="editor"
        v-model="text"
        min-height="5rem"
        :toolbar="[
          [ 'undo', 'redo' ],
          ['imageinsert']
        ]"
      >
        <template v-slot:imageinsert>
          <q-btn
            dense no-caps flat
            ref="custom"
            icon="add_photo_alternate"
            size="sm"
            @click="insertImage"
          >
          </q-btn>
        </template>
      </q-editor>
    </div>

    <h4>Кнопка</h4>

    <div class="q-gutter-y-sm">
      <q-input v-model="buttonLabel" label="Кнопка"></q-input>
      <q-input v-model="buttonLink" label="Ссылка кнопки"></q-input>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-container {
  background: transparent;
}
</style>