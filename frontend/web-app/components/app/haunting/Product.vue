<script setup lang="ts">
defineProps<{ productId: string | undefined; currentSize: any, data: any }>();

const button = ref(null);
const button2 = ref(null);
const container = ref(null);
const cart = useCartStore();

const step = 20;
const step2 = 15;

const windowSize = useWindowSize();
const btnSize = useElementSize(button);
const btnSize2 = useElementSize(button2);
const cotainerBounding = useElementBounding(container);

const isStopped = computed(() => {
  const startElement =
    cotainerBounding.y.value +
    step +
    (btnSize.height.value + step2) -
    windowSize.height.value;

  if (startElement <= 0) return true;
  return false;
});
const isStopped2 = computed(() => {
  const startElement =
    cotainerBounding.y.value +
    step +
    (btnSize2.height.value + step2) -
    windowSize.height.value;

  if (startElement <= 0) return true;
  return false;
});
// const isStopped = computed(() => y.value <= height.value);
</script>

<template>
  <div
    class="haunting"
    ref="container"
    :style="{
      height: `${(btnSize.height.value || btnSize2.height.value) + 40}px`,
    }"
  >
    <client-only>
      <q-btn
        flat
        v-if="!cart.quantityById(productId, currentSize._id)"
        :class="{ haunting__btn_stopped: isStopped }"
        class="haunting__btn haunting__btn_fixed"
        ref="button"
        @click="
          () => {
            if (
              cart.quantityById(productId, currentSize._id) >=
              currentSize.quantity
            )
              return;

            cart.add({
              price: currentSize.price,
              product_id: productId,
              size_grid: data.size_grid,
              size_id: currentSize._id,
              size_title: currentSize.title,
              preview: data.preview,
              title: data.title,
            });
          }
        "
      >
        Добавить в корзину
      </q-btn>

      <div
        ref="button2"
        v-else
        class="plus-btn plus-btn_fixed"
        :class="{ 'plus-btn_stopped': isStopped2 }"
        style="margin-top: 2.3rem"
      >
        <q-btn
          class="plus-btn__btn"
          flat
          @click="() => cart.del(productId, currentSize._id)"
        >
          <span style="position: relative; top: -0.1rem">-</span>
        </q-btn>
        <span class="plus-btn__text"
          >{{ cart.quantityById(productId, currentSize._id) }} шт. в
          корзине</span
        >
        <q-btn
          class="plus-btn__btn"
          flat
          @click="
            () => {
              if (
                cart.quantityById(productId, currentSize._id) >=
                currentSize.quantity
              )
                return;

              cart.add({
                price: currentSize.price,
                product_id: productId,
                size_grid: data.size_grid,
                size_id: currentSize._id,
                size_title: currentSize.title,
                preview: data.preview,
                title: data.title,
              });
            }
          "
          >+</q-btn
        >
      </div>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.haunting {
  position: relative;

  &__btn {
    width: 35.6rem;
    height: 7.2rem;
    text-transform: none;
    border-radius: 1.5rem;
    background-color: #000;
    transition: bottom 0.1s;
    color: white;
    font-size: 1.8rem;
    text-transform: none;
    font-weight: 400;

    &_fixed {
      left: 0;
      right: 0;
      margin: auto;
      bottom: 2rem;
      position: fixed;
    }

    &_stopped {
      bottom: 1.1rem;
      position: absolute;
    }
  }
}

.plus-btn {
  width: 100%;
  height: 7.2rem;
  border-radius: 1.5rem;
  width: 35.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(120, 120, 120, 1);

  &_fixed {
    left: 0;
    right: 0;
    margin: auto;
    bottom: 2rem;
    position: fixed;
  }

  &_stopped {
    bottom: 1.1rem;
    position: absolute;
  }

  &__btn {
    width: 7rem;
    height: 100%;
    font-weight: 200;
    font-size: 3.6rem;
    padding: 0;
    color: rgba(255, 255, 255, 0.5);
  }

  &__text {
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 117%;
    color: #fff;
  }
}
</style>
