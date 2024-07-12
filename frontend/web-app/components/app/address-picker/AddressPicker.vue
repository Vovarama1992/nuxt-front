<script setup lang="ts">
const modal = ref(false);
const city = ref("");
const address = ref("");
const show = ref(false)
const createAddress = () => {
  if (city.value.length > 2 && address.value.length > 2) {
    show.value = true;
    modal.value = false;
  }

};
</script>

<template>
  <div>
    <app-modal title="Выбор адреса" v-model="modal">
      <div style="display: flex; gap: 2.6rem">
        <div style="padding: 2rem; padding-top: 0rem; width: 100%">
          <p
            class="text-field-label"
            style="font-size: 1.8rem; margin: 0; margin-top: 2rem"
          >
            Добавить новый адрес доставки
          </p>

          <div style="width: 100%; margin-top: 2rem">
            <p class="text-field-label">Город</p>
            <ui-input v-model.trim="city" placeholder="Ваш город" />
          </div>
          <div style="width: 100%; margin-top: 1.5rem">
            <p class="text-field-label">Полный адрес</p>
            <ui-input v-model.trim="address" placeholder="Ваш адрес" />
          </div>

          <div style="display: flex; justify-content: flex-start">
            <ui-btn
              block
              dark
              style="margin-top: 1.5rem; max-width: 50%"
              @click="createAddress"
            >
              Добавить адрес
            </ui-btn>
          </div>
        </div>

        <div style="padding: 2rem; padding-top: 0rem; width: 100%">
          <p
            class="text-field-label"
            style="font-size: 1.8rem; margin: 0; margin-top: 2rem"
          >
            Адреса
          </p>

          <div style="display: flex; justify-content: center; height: 80%; align-items: center;">
            <p
              style="
                font-size: 1.8rem;
                font-weight: 500;
                line-height: 22.5px;
                text-align: center;
                color: rgba(150, 150, 150, 1);
              "
            >
              Извините, но мы не нашли<br> связанные с вами адреса
            </p>
          </div>
        </div>
      </div>
    </app-modal>

    <ui-btn block @click="modal = true" v-if="!show">
      <svg
        style="width: 1.7rem; margin-right: 1.2rem"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 9.50007L9.5 9.50007M9.5 9.50007L1 9.50007M9.5 9.50007L9.5 1M9.5 9.50007L9.5 18"
          stroke="#B8B8B8"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Добавить новый адрес доставки
    </ui-btn>

    <app-card-address v-else :city="city" :address="address" />
  </div>
</template>
