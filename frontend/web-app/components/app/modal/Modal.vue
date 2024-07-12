<script setup lang="ts">
withDefaults(
  defineProps<{ title?: string }>(),
  { title: '' }
);

const show = defineModel({ default: false });
</script>

<template>
  <q-dialog maximized v-model="show" transition-show="slide-down" transition-hide="fade">
    <div class="dialog-container" @mousedown.self="show = false">
      <div class="modal">
        <div class="modal__header">
          <span class="modal__title">{{ title }}</span>
          <ui-btn style="height: 5rem; border-color: transparent;" @click="show = false">
            <svg style="width: 2.2rem;" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.265 1.00008L1 22M0.99991 1L22.265 21.9999" stroke="#545454" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </ui-btn>
        </div>

        <div class="modal__body">
          <slot />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<style scoped lang="scss">
.dialog-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
}

.modal {
  border-radius: 1.6rem;
  width: min(1025px, 100%);
  max-height: 100%;
  background-color: white;
  border: 1px solid var(--auxiliary_line_color);

  &__header {
    display: flex;
    align-items: center;
    padding: 1.6rem 2rem;
    justify-content: space-between;
    border-bottom: 1px solid var(--auxiliary_line_color);
  }

  &__title {
    margin: 0;
    font-weight: 500;
    font-size: 2.5rem;
  }

  &__body {
    overflow: hidden;
    overflow-y: auto;
    max-height: calc(100vh - 8.4rem);
  }
}

@media (max-width: 720px) {
  .modal {
    border-radius: 0;
    
    &__header {
      padding: 1rem 1.6rem;
    }
  
    &__title {
      font-size: 2.2rem;
    }
  
    &__body {
      max-height: calc(100vh - 7.2rem);
    }
  }
}
</style>