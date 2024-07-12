import { verify } from "~/api/api";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessToken = useCookie("access_token");

  if (to.path.split("/")[1] === "sign-in") {
    const { data } = await verify(to.path.split("/")[2]);
    accessToken.value = data.value?.access_token;

    if (accessToken.value) {
      return navigateTo("/");
    }
  }

  if (!accessToken.value) {
    return navigateTo("https://t.me/Threehundredrusupport_bot", {
      external: true,
    });
  }
});
