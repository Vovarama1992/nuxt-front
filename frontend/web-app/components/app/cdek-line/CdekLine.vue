<script setup lang="ts">
defineProps<{
  statuses: {
    name: string;
    date: string;
    completed: boolean;
  }[];
}>();

const { format } = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' })
</script>

<template>
  <div class="cdek-line">
    <div style="display: flex; align-items: center;">
      <div class="cdek-line__points">
        <template v-for="(status, i) in statuses">
          <div
            class="point"
            :style="{
              backgroundColor: status.completed ? '#2fc0af' : '#B3B3B3',
            }"
          ></div>
          <div
            class="stick"
            :style="{
              backgroundColor: status.completed ? '#2fc0af' : '#B3B3B3',
              opacity: status.completed ? '1' : '.55',
            }"
            v-if="i !== statuses.length - 1"
          >
            <div class="stick__top"></div>
            <div class="stick__bottom"></div>
          </div>
        </template>
      </div>
  
      <div class="cdek-line__events">
        <template v-for="(status, i) in statuses">
          <div
            class="date"
            :style="{
              color: status.completed ? '#2fc0af' : '#B3B3B3',
            }"
          >{{ format(new Date(status.date)) }}</div>
          <div
            class="name"
            :style="{
              color: status.completed ? '#2fc0af' : '#B3B3B3',
            }"
          >{{ status.name }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cdek-line {
  &__events {
    width: 100%;
    text-align: center;
    margin-left: -2rem;

    .date {
      font-size: 18px;
      font-weight: 600;
      line-height: 2.898rem;
    }

    .name {
      font-size: 18px;
      font-weight: 400;
      line-height: 2.898rem;
      margin-bottom: 2.5rem;
    }
  }

  &__points {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-left: 1rem;

    .point {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: #2fc0af;
      border: 0.1rem solid white;
      z-index: 1;
    }

    .stick {
      width: 0.5rem;
      height: 6rem;
      position: relative;
      background-color: #2fc0af;

      &__top {
        border-radius: 50%;
        background-color: white;
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        left: -0.5rem;
        top: -1.1rem;
      }

      &__bottom {
        border-radius: 50%;
        background-color: white;
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        left: -0.5rem;
        bottom: -1.1rem;
      }
    }
  }
}
</style>
