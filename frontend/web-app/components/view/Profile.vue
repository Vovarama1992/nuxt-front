<script setup lang="ts">
import { jwtDecode } from "jwt-decode";

const listElements = [
  {
    icon: `<svg style="width: 1.8rem; height: 1.8rem;" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66602 10.3333L8.17184 12.0543C8.59523 12.5382 9.35866 12.5025 9.7351 11.9813L13.3327 7M10 19C5.75736 19 3.63604 19 2.31802 17.682C1 16.364 1 14.2426 1 10C1 5.75736 1 3.63604 2.31802 2.31802C3.63604 1 5.75736 1 10 1C14.2426 1 16.364 1 17.682 2.31802C19 3.63604 19 5.75736 19 10C19 14.2426 19 16.364 17.682 17.682C16.364 19 14.2426 19 10 19Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    title: "Мои заказы",
    start: true,
    to: "/profile/orders",
  },
  {
    icon: `<svg style="width: 1.4rem; height: 1.4rem;" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.929688 8.70689L8.70786 0.928711M8.70786 0.928711L8.70786 5.87846M8.70786 0.928711H3.75811M15.0711 7.2926L7.29297 15.0708M7.29297 15.0708L12.2427 15.0708M7.29297 15.0708V10.121" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    title: "Возвраты",
    end: true,
    to: "/profile/refaunds",
  },

  //   {
  //     icon: `<svg width="1.8rem" height="1.8rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  // <path d="M15 17.2001C14.6831 11.0134 5.31692 11.0134 5 17.2001M12.5 7.1001C12.5 8.48081 11.3807 9.6001 10 9.6001C8.61929 9.6001 7.5 8.48081 7.5 7.1001C7.5 5.71939 8.61929 4.6001 10 4.6001C11.3807 4.6001 12.5 5.71939 12.5 7.1001ZM19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  // </svg>

  // `,
  //     title: "Аккаунт",
  //     start: true,
  //     to: "/personal-cabinet/profile"
  //   },
  //   {
  //     icon: `<svg width="1.8rem" height="1.8rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  // <path d="M10 19L18.1314 14.7916C18.4469 14.6283 18.6047 14.5467 18.7198 14.4264C18.8217 14.32 18.899 14.1924 18.9464 14.0526C19 13.8945 19 13.7167 19 13.3611C19 11.6519 19 8.0684 19 5.53273M10 19L1.86859 14.7916C1.55308 14.6283 1.39532 14.5467 1.28016 14.4264C1.17831 14.32 1.10095 14.1924 1.05357 14.0526C1 13.8945 1 13.7159 1 13.3587V5.53273M10 19C10 19 10 13.4766 10 9.93739M19 5.53273C15.4853 7.25286 13.5147 8.21726 10 9.93739M19 5.53273C17.2426 4.62321 16.2574 4.11328 14.5 3.20376M1 5.53273L9.26859 1.25332C9.53647 1.11468 9.67041 1.04536 9.81123 1.0181C9.93594 0.993966 10.0641 0.993966 10.1888 1.0181C10.3296 1.04536 10.4632 1.11451 10.7304 1.25282C11.6662 1.73713 13.3093 2.58749 14.5 3.20376M1 5.53273C1 5.53273 3.74264 6.875 5.5 7.73506M10 9.93739C8.24264 9.07733 7.25736 8.59512 5.5 7.73506M5.5 7.73506C9.01472 5.96548 10.9853 4.97334 14.5 3.20376M5.5 7.73506C5.5 8.59512 5.5 9.07733 5.5 9.93739" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  // </svg>
  // `,
  //     title: "Доставка",
  //     end: true,
  //     to: "/personal-cabinet/delivery"
  //   },
  {
    icon: `<svg width="1.8rem" height="1.8rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 5.62671V11.1267M10 14.3733V13.8733M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    title: "Поддержка",
    end: true,
    start: true,
    to: "/news/66804a200c936172eb4a68b1",
  },
  {
    icon: `<svg width="1.4rem" height="1.7rem" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 9.26389C15 13.6713 1 13.6713 1 9.26389M1 3.83333V15.3229C1 18.8924 15 18.8924 15 15.3229V3.83333M1 3.71994C1 2.21776 4.13401 1 8 1C11.866 1 15 2.21776 15 3.71994C15 7.64891 1 7.64891 1 3.71994Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    title: "Система баллов",
    end: true,
    start: true,
    to: "/profile/balls",
  },
];

const accessToken = useCookie("access_token");
const profileId = useSelfProfileId();

const name = ref("");
const image = ref<HTMLImageElement>();

const { $api } = useNuxtApp();

if (profileId) {
  const { data: response } = await $api.v1.profilesControllerGetName(profileId);
  name.value = response.name;
} else
  navigateTo("/");

onMounted(() => {
  const unrefImage = unref(image);
  if (!unrefImage || !profileId) return;

  unrefImage.src = "https://api.3hundred.ru/v1/profile/info/avatar/" + profileId;
  unrefImage.addEventListener('error', () => unrefImage.src = '/3hundred.jpeg', { once: true });
});

function logout() {
  accessToken.value = null;
  navigateTo("/");
}
</script>

<template>
  <q-page>
    <app-subheader>
      <template #default>Личный кабинет</template>
      <template #control>
        <div style="display: flex; align-items: center; justify-content: end">
          <div @click="logout">
            <ui-btn style="height: 3rem; border-radius: .8rem;">
              <svg
                style="width: 1.5rem; height: 1.5rem; margin-right: 1rem"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8125 9.5L4.9375 9.5"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 12.5625L4.9375 9.5L8 6.4375"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 9.5C1 5.78769 1 3.93153 2.15327 2.77827C3.30653 1.625 5.16269 1.625 8.875 1.625C12.5873 1.625 14.4435 1.625 15.5967 2.77827C16.75 3.93153 16.75 5.78769 16.75 9.5C16.75 13.2123 16.75 15.0685 15.5967 16.2217C14.4435 17.375 12.5873 17.375 8.875 17.375C5.16269 17.375 3.30653 17.375 2.15327 16.2217C1 15.0685 1 13.2123 1 9.5Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              Выйти
            </ui-btn>
          </div>
        </div>
      </template>
    </app-subheader>

    <div class="page">
      <div>
        <div class="preview-container">
          <img class="preview" ref="image" />
          <span
            style="
              font-weight: 400;
              font-size: 1.5rem;
              line-height: 117%;
              margin-left: 2.1rem;
            "
          >
            <!-- Здравствуйте,<br />Никита! -->
            Здравствуйте,<br>{{ name }}!
          </span>
        </div>

        <app-ball-card style="margin-top: 1.9rem; margin-bottom: 1.9rem" />

        <template v-for="el in listElements" :key="el.title">
          <div
            @click="navigateTo(el.to)"
            class="list-block"
            :class="{ 'list-block_start': el.start, 'list-block_end': el.end }"
          >
            <div class="list-block__icon" v-html="el.icon"></div>
            <span>{{ el.title }}</span>
          </div>
        </template>
      </div>

      <div>
        <slot />
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.page {
  padding: 2.1rem 0;
  gap: 2.1rem;
  margin: auto;
  display: grid;
  width: min(1025px, 95%);
  grid-template-columns: 290px auto;

  &__container {
    border-radius: 2rem;
    padding: 2.3rem 1.8rem;
    background-color: #fff;
    border: 1px solid #e5e5e5;
  }
}

.preview-container {
  width: 100%;
  height: 13.1rem;
  border-radius: 0.8rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 2.5rem;
}

.preview {
  width: 6.8rem;
  height: 6.8rem;
  border-radius: 50%;
  background-color: #f3f3f3;
  border: 2px solid #f3f3f3;
  position: relative;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
  }
}

.list-block {
  width: 100%;
  display: flex;
  align-items: center;
  height: 6rem;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  border-top-color: transparent;

  span {
    font-size: 1.2rem;
    margin-left: 2rem;
  }

  &_start {
    margin-top: 1rem;
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
    border-top-color: #e5e5e5;
  }

  &_end {
    border-bottom-right-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
    border-bottom-color: #e5e5e5;
    border-top-color: transparent;
  }

  &:active {
    border: 1px solid #2fc0af;
  }

  &_select {
    border: 1px solid #2fc0af;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    width: 4.6rem;
  }
}
</style>
