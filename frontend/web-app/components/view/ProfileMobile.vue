<script setup lang="ts">
import ColorThief from "colorthief";
import type { QImg } from "quasar";

const balls = ref(0);

const { $api } = useNuxtApp();
const { data } = await $api.v1.profilesControllerGetScores();
balls.value = data.scores.quantity;

const accessToken = useCookie("access_token");
const profileId = useSelfProfileId();

const colorStop = ref<SVGStopElement>();

const name = ref("");
const image = ref<QImg>();

if (profileId) {
  const { data: response } = await $api.v1.profilesControllerGetName(profileId);
  name.value = response.name;
} else
  navigateTo("/");

async function colorize() {
  const unrefColorStop = unref(colorStop);
  if (!unrefColorStop) return;

  const unrefImage = unref(image);
  if (!unrefImage) return;

  const domImage = unrefImage.$el.querySelector("img");
  if (!domImage) return;

  const colorThief = new ColorThief();
  const colors = colorThief.getPalette(domImage);
  if (!colors) return;

  let color = [ 0, 0, 0 ];
  for (const imageColor of colors) {
    // http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(
      0.299 * imageColor[0] ** 2 +
      0.587 * imageColor[1] ** 2 +
      0.114 * imageColor[2] ** 2
    );

    if (hsp <= 127.5) {
      color = imageColor;
      break;
    }
  }

  unrefColorStop.setAttribute('stop-color', `rgb(${color.join(',')})`);
}

function logout() {
  accessToken.value = null;
  navigateTo("/");
}
</script>

<template>
  <div>
    <slot />
    <div style="height: 37rem; background-color: #fff; position: relative">
      <div style="overflow-x: hidden; justify-content: center; display: flex;">
        <svg
          style="margin-top: 1rem; width: 39rem; height: 23.8rem;"
          viewBox="0 0 390 238"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-60.8097 36.4293L-54.8409 0.465302H30.2796L24.3108 37.0761L1.86285 35.7824L-10.4641 112.368H-50.6887L-38.3618 35.6531L-60.8097 36.4293Z"
            fill="url(#gradient)"
          />
          <path
            d="M15.7468 112.238L33.6533 0.335938H74.2672L68.1686 38.111H91.6546L97.7532 0.335938H138.237L120.461 112.238H79.9765L86.2048 72.7814H62.5891L56.3607 112.238H15.7468Z"
            fill="url(#gradient)"
          />
          <path
            d="M130.452 112.238L148.358 0.335938H201.04C212.329 0.335938 221.541 3.31137 228.548 9.26224C235.555 15.2131 239.058 22.9751 239.058 32.4189C239.058 40.569 236.982 47.9429 232.96 54.4113C228.808 60.8796 222.32 65.5368 213.367 68.5122L235.685 112.238H189.102L178.981 81.4489L175.737 70.3234V77.3092C175.737 81.7077 175.478 84.5537 175.088 86.1061L170.936 112.238H130.452ZM183.912 30.6078L180.798 50.2715H186.247C189.881 50.2715 192.995 49.2366 195.46 47.0374C197.796 44.7088 198.834 41.8627 198.834 38.3698C198.834 36.0412 197.926 34.23 196.239 32.807C194.422 31.384 192.216 30.6078 189.491 30.6078H183.912Z"
            fill="url(#gradient)"
          />
          <path
            d="M235.425 112.238L253.332 0.335938H328.072L323.4 30.6078H288.626L286.939 41.2158H318.34L313.669 70.5821H282.397L280.71 80.9315H316.004L311.203 112.238H235.425Z"
            fill="url(#gradient)"
          />
          <path
            d="M319.378 112.238L337.284 0.335938H412.024L407.353 30.6078H372.578L370.892 41.2158H402.293L397.621 70.5821H366.35L364.663 80.9315H399.957L395.156 112.238H319.378Z"
            fill="url(#gradient)"
          />
          <path
            d="M-66 235.137L-48.0936 123.234H-7.47964L-13.5782 161.01H9.90779L16.0064 123.234H56.4905L38.7138 235.137H-1.77033L4.45799 195.68H-19.1578L-25.3861 235.137H-66Z"
            fill="url(#gradient)"
          />
          <path
            d="M169.639 123.234L158.739 191.023C157.831 197.491 156.274 203.183 154.068 207.84C150.045 217.284 143.168 224.529 133.696 229.703C124.094 234.878 112.935 237.336 100.089 237.336C85.5561 237.336 74.397 234.361 66.7413 228.41C59.0856 222.459 55.1929 213.791 55.1929 202.278C55.1929 198.914 55.4525 195.162 56.1012 191.152L66.8711 123.364H106.706L96.7151 186.365L95.8069 194.257C95.8069 197.103 96.7151 199.173 98.6615 200.596C100.478 202.019 102.814 202.795 105.668 202.795C108.134 202.795 110.469 202.019 112.805 200.596C115.011 199.173 116.568 197.62 117.346 195.939C117.736 194.774 118.125 193.351 118.644 191.54C119.033 189.729 119.423 188.047 119.682 186.365L129.673 123.364H169.639V123.234Z"
            fill="url(#gradient)"
          />
          <path
            d="M161.464 235.137L179.37 123.234H219.335L241.394 171.876L243.211 176.663L247.622 191.54L246.584 174.593C246.584 171.876 246.714 170.324 246.844 169.806L254.11 123.234H293.686L276.039 235.137H234.906L213.626 187.918L211.939 183.778C211.161 181.708 210.512 179.38 209.733 176.663C208.955 173.946 208.436 171.488 207.917 169.16C208.566 174.076 208.825 178.474 208.825 182.096V185.848C208.825 187.271 208.695 188.694 208.566 189.858L201.429 235.137H161.464Z"
            fill="url(#gradient)"
          />
          <path
            d="M286.03 235.137L303.937 123.234H345.848C364.404 123.234 378.677 127.245 388.538 135.395C398.4 143.545 403.46 155.188 403.46 170.453C403.46 188.823 397.232 204.218 384.646 216.637C372.189 229.056 356.618 235.137 338.063 235.137H286.03ZM338.842 158.163L331.835 201.631H335.598C343.772 201.631 350.39 199.173 355.321 194.386C360.251 189.6 362.717 183.261 362.717 175.369C362.717 163.856 356.359 158.163 343.513 158.163H338.842Z"
            fill="url(#gradient)"
          />
          <path
            d="M401.644 235.137L419.55 123.234H472.232C483.521 123.234 492.733 126.21 499.74 132.161C506.747 138.112 510.25 145.874 510.25 155.317C510.25 163.468 508.174 170.841 504.152 177.31C500 183.778 493.512 188.435 484.559 191.411L506.877 235.137H460.294L450.173 204.347L446.929 193.222V200.208C446.929 204.606 446.67 207.452 446.28 209.005L442.128 235.137H401.644ZM455.104 153.506L451.99 173.17H457.439C461.073 173.17 464.187 172.135 466.652 169.936C468.988 167.607 470.026 164.761 470.026 161.268C470.026 158.94 469.117 157.129 467.431 155.705C465.614 154.282 463.408 153.506 460.683 153.506H455.104Z"
            fill="url(#gradient)"
          />
          <path
            d="M506.617 235.137L524.524 123.234H599.264L594.592 153.506H559.818L558.131 164.114H589.532L584.861 193.481H553.589L551.902 203.83H587.196L582.395 235.137H506.617Z"
            fill="url(#gradient)"
          />
          <path
            d="M590.57 235.137L608.476 123.234H650.388C668.943 123.234 683.216 127.245 693.078 135.395C702.939 143.545 708 155.188 708 170.453C708 188.823 701.772 204.218 689.185 216.637C676.729 229.056 661.158 235.137 642.602 235.137H590.57ZM643.381 158.163L636.374 201.631H640.137C648.312 201.631 654.929 199.173 659.86 194.386C664.791 189.6 667.256 183.261 667.256 175.369C667.256 163.856 660.898 158.163 648.052 158.163H643.381Z"
            fill="url(#gradient)"
          />
          <defs>
            <radialGradient
              id="gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(201 -251.164) rotate(89.5309) scale(488.516 754.544)"
            >
              <stop offset="0.379669" stop-color="black" ref="colorStop" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <q-img
        style="
          width: 11.4rem;
          height: 11.4rem;
          border-radius: 50%;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          border: 9px solid #fff;
          top: 9rem;
        "
        crossorigin="anonymous"
        error-src="/3hundred.jpeg"
        :src="'https://api.3hundred.ru/v1/profile/info/avatar/' + profileId"

        ref="image"
        @load="colorize"
      />

      <div class="row" style="margin-bottom: 5.2rem">
        <p
          class="col"
          style="
            font-weight: 500;
            font-size: 2rem;
            line-height: 117%;
            margin-left: 3.3rem;
            margin-bottom: 0;
            margin-top: 1.5rem;
          "
        >
          Здравствуйте,<br>{{ name }}!
        </p>
        <div class="">
          <div
            style="
              height: 5.2rem;
              padding: 0 2.3rem;
              border-radius: 3rem;
              background: linear-gradient(90deg, #2dd36c 0%, #26af96 100%),
                radial-gradient(
                  90.93% 90.93% at 50.17% 90.93%,
                  rgb(66, 232, 152) 0%,
                  rgb(79, 226, 247) 100%
                );
              justify-content: center;
              align-items: center;
              display: flex;
              margin-right: 2.6rem;
            "
          >
            <svg
              style="width: 1.9rem; height: 2.2rem;"
              width="19"
              height="22"
              viewBox="0 0 19 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 1.33594C4.80558 1.33594 1 2.69696 1 4.37587C1 8.76707 18 8.76707 18 4.37587C18 2.69696 14.1944 1.33594 9.5 1.33594Z"
                fill="white"
              />
              <path d="M18 10.572C18 15.498 1 15.498 1 10.572Z" fill="white" />
              <path
                d="M1 4.5026V17.3439C1 21.3333 18 21.3333 18 17.3439V4.5026"
                fill="white"
              />
              <path
                d="M18 10.572C18 15.498 1 15.498 1 10.572M1 4.5026V17.3439C1 21.3333 18 21.3333 18 17.3439V4.5026M1 4.37587C1 2.69696 4.80558 1.33594 9.5 1.33594C14.1944 1.33594 18 2.69696 18 4.37587C18 8.76707 1 8.76707 1 4.37587Z"
                stroke="#37D39A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p
              style="
                font-weight: 500;
                font-size: 2rem;
                line-height: 117%;
                margin: 0;
                margin-left: .5rem;
                color: #fff;
              "
            >
              {{ balls }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="btn-active"
      @click="navigateTo('/profile/orders')"
      style="
        border: 1px solid #e5e5e5;
        height: 8.6rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #fff;
        background-color: #fff;
      "
    >
      <div style="min-width: 6rem; text-align: right">
        <svg
          style="width: 3.1rem; height: 3.1rem;"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 16.8958L12.2587 19.7663C12.8938 20.5734 14.039 20.5139 14.6036 19.6445L20 11.3359"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 15.8359C2 9.47198 2 6.29 3.97703 4.31297C5.95406 2.33594 9.13604 2.33594 15.5 2.33594C21.864 2.33594 25.0459 2.33594 27.023 4.31297C29 6.29 29 9.47198 29 15.8359C29 22.1999 29 25.3819 27.023 27.3589C25.0459 29.3359 21.864 29.3359 15.5 29.3359C9.13604 29.3359 5.95406 29.3359 3.97703 27.3589C2 25.3819 2 22.1999 2 15.8359Z"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <p
        style="
          width: 100%;
          margin-bottom: 0;
          margin-left: 2.2rem;
          font-weight: 400;
          font-size: 2rem;
          line-height: 117%;
        "
      >
        Мои заказы
      </p>

      <div style="min-width: 5.5rem">
        <svg
          style="width: 1.4rem; height: 2.7rem;"
          viewBox="0 0 14 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 25.3359L13 13.3359L1 1.33594"
            stroke="#C2C2C2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div
      class="btn-active"
      style="
        border: 1px solid #e5e5e5;
        height: 8.6rem;
        display: flex;
        align-items: center;
        background-color: #fff;
      "
    >
      <div style="min-width: 6rem; text-align: right">
        <svg
          style="width: 2.5rem; height: 2.6rem;"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 14.3359L14 2.33594M14 2.33594L14 9.9723M14 2.33594L6.36364 2.33594"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M23 12.3359L11 24.3359M11 24.3359L18.6364 24.3359M11 24.3359L11 16.6996"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <p
        style="
          width: 100%;
          margin-bottom: 0;
          margin-left: 2.2rem;
          font-weight: 400;
          font-size: 2rem;
          line-height: 117%;
        "
      >
        Возвраты
      </p>

      <div style="min-width: 5.5rem">
        <svg
          style="width: 1.4rem; height: 2.7rem;"
          viewBox="0 0 14 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 25.3359L13 13.3359L1 1.33594"
            stroke="#C2C2C2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <!-- <div
      class="btn-active"
      style="
        margin-top: 1.5rem;
        border: 1px solid #e5e5e5;
        height: 8.6rem;
        display: flex;
        border-bottom: 1px solid #fff;
        align-items: center;
        background-color: #fff;
      "
    >
      <div style="min-width: 6rem; text-align: right">
        <svg
          style="width: 3.2rem; height: 3.2rem;"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.7778 27.5361C23.2848 17.9123 8.71521 17.9123 8.22222 27.5361M19.8889 11.825C19.8889 13.9728 18.1478 15.7139 16 15.7139C13.8522 15.7139 12.1111 13.9728 12.1111 11.825C12.1111 9.6772 13.8522 7.93609 16 7.93609C18.1478 7.93609 19.8889 9.6772 19.8889 11.825ZM30 16.3359C30 24.0679 23.732 30.3359 16 30.3359C8.26801 30.3359 2 24.0679 2 16.3359C2 8.60395 8.26801 2.33594 16 2.33594C23.732 2.33594 30 8.60395 30 16.3359Z"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <p
        style="
          width: 100%;
          margin-bottom: 0;
          margin-left: 2.2rem;
          font-weight: 400;
          font-size: 2rem;
          line-height: 117%;
        "
      >
        Аккаунт
      </p>

      <div style="min-width: 5.5rem">
        <svg
          style="width: 1.4rem; height: 2.7rem;"
          viewBox="0 0 14 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 25.3359L13 13.3359L1 1.33594"
            stroke="#C2C2C2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div> -->

    <div
      class="btn-active"
      @click="navigateTo('/profile/balls')"
      style="
        border: 1px solid #e5e5e5;
        height: 8.6rem;
        display: flex;
        border-bottom: 1px solid #fff;
        align-items: center;
        background-color: #fff;
      "
    >
      <div style="min-width: 6rem; text-align: right">
        <svg
          style="margin-right: .4rem; width: 2.6rem; height: 3.1rem;"
          viewBox="0 0 26 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 15.4609C24 22.4609 2 22.4609 2 15.4609M2 6.83594V25.084C2 30.7532 24 30.7532 24 25.084V6.83594M2 6.65584C2 4.27002 6.92487 2.33594 13 2.33594C19.0751 2.33594 24 4.27002 24 6.65584C24 12.896 2 12.896 2 6.65584Z"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <p
        style="
          width: 100%;
          margin-bottom: 0;
          margin-left: 2.2rem;
          font-weight: 400;
          font-size: 2rem;
          line-height: 117%;
        "
      >
        Система баллов
      </p>

      <div style="min-width: 5.5rem">
        <svg
          style="width: 1.4rem; height: 2.7rem;"
          viewBox="0 0 14 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 25.3359L13 13.3359L1 1.33594"
            stroke="#C2C2C2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <!-- <div
      class="btn-active"
      style="
        border: 1px solid #e5e5e5;
        height: 8.6rem;
        display: flex;
        border-bottom: 1px solid #fff;
        align-items: center;
        background-color: #fff;
      "
    >
      <div style="min-width: 6rem; text-align: right">
        <svg
          style="margin-right: .3rem; width: 2.8rem; height: 2.3rem;"
          viewBox="0 0 28 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 7.76451V6.67906C2 5.15892 2 4.39828 2.29065 3.81766C2.54631 3.30694 2.95396 2.892 3.45573 2.63178C4.02616 2.33594 4.77345 2.33594 6.26693 2.33594H21.7336C23.2271 2.33594 23.9728 2.33594 24.5432 2.63178C25.045 2.892 25.454 3.30694 25.7096 3.81766C26 4.39771 26 5.15743 26 6.6746V7.76451M2 7.76451H26M2 7.76451V16.9933C2 18.5135 2 19.2732 2.29065 19.8538C2.54631 20.3645 2.95396 20.7802 3.45573 21.0404C4.0256 21.3359 4.77199 21.3359 6.26255 21.3359H21.7375C23.228 21.3359 23.9733 21.3359 24.5432 21.0404C25.045 20.7802 25.454 20.3645 25.7096 19.8538C26 19.2737 26 18.5151 26 16.9979V7.76451M6 15.9074H11.3333"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <p
        style="
          width: 100%;
          margin-bottom: 0;
          margin-left: 2.2rem;
          font-weight: 400;
          font-size: 2rem;
          line-height: 117%;
        "
      >
        Оплата
      </p>

      <div style="min-width: 5.5rem">
        <svg
          style="width: 1.4rem; height: 2.7rem;"
          viewBox="0 0 14 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 25.3359L13 13.3359L1 1.33594"
            stroke="#C2C2C2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div> -->

    <!-- <div
      class="btn-active"
      style="
        border: 1px solid #e5e5e5;
        height: 8.6rem;
        display: flex;
        align-items: center;
        background-color: #fff;
      "
    >
      <div style="min-width: 6rem; text-align: right">
        <svg
          style="width: 3.3rem; height: 3.3rem;"
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 31.3359L29.6006 24.5557C30.1089 24.2926 30.3631 24.1611 30.5486 23.9674C30.7127 23.796 30.8374 23.5904 30.9137 23.3651C31 23.1104 31 22.8239 31 22.251C31 19.4973 31 13.7239 31 9.63867M16.5 31.3359L3.3994 24.5557C2.89107 24.2926 2.6369 24.1611 2.45137 23.9674C2.28728 23.796 2.16265 23.5904 2.08631 23.3651C2 23.1104 2 22.8226 2 22.2471V9.63867M16.5 31.3359C16.5 31.3359 16.5 22.4371 16.5 16.7351M31 9.63867C25.3374 12.41 22.1626 13.9638 16.5 16.7351M31 9.63867C28.1687 8.17333 26.5813 7.35177 23.75 5.88643M2 9.63867L15.3216 2.74407C15.7532 2.5207 15.969 2.40902 16.1959 2.3651C16.3968 2.32622 16.6032 2.32622 16.8041 2.3651C17.031 2.40902 17.2463 2.52043 17.6768 2.74326C19.1844 3.52353 21.8316 4.89357 23.75 5.88643M2 9.63867C2 9.63867 6.4187 11.8012 9.25 13.1869M16.5 16.7351C13.6687 15.3494 12.0813 14.5725 9.25 13.1869M9.25 13.1869C14.9126 10.3359 18.0874 8.73743 23.75 5.88643M9.25 13.1869C9.25 14.5725 9.25 15.3494 9.25 16.7351"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <p
        style="
          width: 100%;
          margin-bottom: 0;
          margin-left: 2.2rem;
          font-weight: 400;
          font-size: 2rem;
          line-height: 117%;
        "
      >
        Доставка
      </p>

      <div style="min-width: 5.5rem">
        <svg
          style="width: 1.4rem; height: 2.7rem;"
          viewBox="0 0 14 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 25.3359L13 13.3359L1 1.33594"
            stroke="#C2C2C2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div> -->

    <!-- <div
      class="btn-active"
      style="
        margin-top: 1.5rem;
        border: 1px solid #e5e5e5;
        height: 8.6rem;
        border-bottom: 1px solid #fff;
        display: flex;
        align-items: center;
        background-color: #fff;
      "
    >
      <div style="min-width: 6rem; text-align: right">
        <svg
          style="width: 3.2rem; height: 3rem;"
          viewBox="0 0 32 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.2791 11.4008L18.0222 7.6238C20.0185 5.60938 20.268 3.84675 18.7708 2.33594M9.77779 5.58594V4.86372M28.4445 4.5026V3.78038M28.4445 17.5026V16.7804M25.3334 24.7248V24.0026M18.7709 15.9333L22.5139 12.1563C25.0093 9.63827 27.5046 9.63827 30 12.1563M19.4741 21.938L7.40846 11.0411C7.0015 10.6192 6.2555 10.7664 6.06812 11.3056L2.03958 27.3745C1.83925 27.951 2.43372 28.4923 3.04975 28.2943L19.1439 23.1224C19.6778 22.9508 19.8512 22.329 19.4741 21.938Z"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <p
        style="
          width: 100%;
          margin-bottom: 0;
          margin-left: 2.2rem;
          font-weight: 400;
          font-size: 2rem;
          line-height: 117%;
        "
      >
        Сертификаты
      </p>

      <div style="min-width: 5.5rem">
        <svg
          style="width: 1.4rem; height: 2.7rem;"
          viewBox="0 0 14 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 25.3359L13 13.3359L1 1.33594"
            stroke="#C2C2C2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div> -->

    <div
      class="btn-active"
      @click="navigateTo('/news/66804a200c936172eb4a68b1')"
      style="
        border: 1px solid #e5e5e5;
        height: 8.6rem;
        display: flex;
        align-items: center;
        background-color: #fff;
      "
    >
      <div style="min-width: 6rem; text-align: right">
        <svg
          style="margin-right: .4rem; width: 2.8rem; height: 2.8rem;"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 8.50488V15.8382M14 20.167V19.5003M26 14.3359C26 20.9634 20.6274 26.3359 14 26.3359C7.37258 26.3359 2 20.9634 2 14.3359C2 7.70852 7.37258 2.33594 14 2.33594C20.6274 2.33594 26 7.70852 26 14.3359Z"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <p
        style="
          width: 100%;
          margin-bottom: 0;
          margin-left: 2.2rem;
          font-weight: 400;
          font-size: 2rem;
          line-height: 117%;
        "
      >
        Поддержка
      </p>

      <div style="min-width: 5.5rem">
        <svg
          style="width: 1.4rem; height: 2.7rem;"
          viewBox="0 0 14 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 25.3359L13 13.3359L1 1.33594"
            stroke="#C2C2C2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div
      style="
        width: min(95%, 1025px);
        margin: auto;
        display: flex;
        justify-content: center;
      "
    >
      <q-btn
        flat
        @click="logout"
        style="
          width: min(368px, 100%);
          margin-top: 3rem;
          margin-bottom: 3rem;
          background-color: black;
          border-radius: .8rem;
          height: 7.2rem;
          text-transform: none;
          color: white;
          font-size: 1.8rem;
          font-weight: 400;
        "
      >
        <svg
          style="margin-right: 1.9rem; width: 2.7rem; height: 2.7rem;"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5 13.3359L7.5 13.3359M7.5 13.3359L12.1667 18.0026M7.5 13.3359L12.1667 8.66927M13.5 25.3359C7.84315 25.3359 5.01472 25.3359 3.25736 23.5786C1.5 21.8212 1.5 18.9928 1.5 13.3359C1.5 7.67908 1.5 4.85066 3.25736 3.0933C5.01472 1.33594 7.84315 1.33594 13.5 1.33594C19.1569 1.33594 21.9853 1.33594 23.7426 3.0933C25.5 4.85066 25.5 7.67908 25.5 13.3359C25.5 18.9928 25.5 21.8212 23.7426 23.5786C21.9853 25.3359 19.1569 25.3359 13.5 25.3359Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        Выйти из аккаунта
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn-active {
  transition: border-color 0.1s;

  &:active {
    border-color: #60adf4 !important;
  }
}

.three-svg {
  width: 100%;
}
</style>
