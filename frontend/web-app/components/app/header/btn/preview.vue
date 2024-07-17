<script setup lang="ts">
import { jwtDecode } from 'jwt-decode';

const header = useHeaderStore();
const token = useCookie('access_token');

const { isMobile } = useDevice();

const toProfile = () => {
  // location.href = '/profile'
  if (isMobile) return navigateTo('/profile')
  return navigateTo('/profile/orders')
}

const avatar = ref<HTMLImageElement>();

onMounted(() => {
  const unrefAvatar = unref(avatar);
  if (!unrefAvatar) return;

  const profileId = useSelfProfileId();
  if (!profileId) return;

  unrefAvatar.src = "https://api.3hundred.ru/v1/profile/info/avatar/" + profileId;
  unrefAvatar.addEventListener('error', () => unrefAvatar.src = '/3hundred.jpeg', { once: true });
});
</script>

<template>
  <button
    type="button"
    class="header-btn"
    v-if="!token"
    @click="
      () => {
        if (header.$state.currentMenuNema === 'auth') return header.hide();
        header.show('auth');
      }
    "
  >
    <svg v-if="header.$state.currentMenuNema !== 'auth'" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 16C14.5563 7.25 1.44369 7.25 1 16M10.8 3.8125C10.8 5.3658 9.5464 6.625 8 6.625C6.4536 6.625 5.2 5.3658 5.2 3.8125C5.2 2.2592 6.4536 1 8 1C9.5464 1 10.8 2.2592 10.8 3.8125Z"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg v-else  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9999 1.00006L1 15M0.999941 1L14.9999 14.9999" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  <!-- <button v-else @click="a()" class="header-btn header-btn_preview" :style="{backgroundImage: `url(https://api.3hundred.ru/v1/profile/info/photo/${jwtDecode(useCookie('access_token').value).profileId})`}">
  </button> -->
  <button v-else @click="toProfile()" class="header-btn header-btn_preview">
    <img ref="avatar">
  </button>
</template>

<style scoped lang="scss">
.header-btn {
  width: 3.2rem;
  padding: 0;
  height: 3.2rem;
  outline: none;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: flex-end;
  border: 0px solid transparent;
  background-color: transparent;

  &_preview {
    background-color: rgb(209, 209, 209);
    border: 2px solid rgb(209, 209, 209);
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;

    > img { width: 100%; height: 100%; }
  }

  &:hover svg {
    fill: rgba(255, 255, 0, 0.6);
  }

  svg {
    width: 1.4rem;
  }
}
</style>
