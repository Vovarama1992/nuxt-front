export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $api } = useNuxtApp();
  const accessToken = useCookie("access_token");

  // TODO: whyyyyy, use a separate page
  const [ _, page, code ] = to.path.split("/");
  if (page === "sign-in") {
    const { data } = await $api.v1.authControllerVerify({ code });
    accessToken.value = data.access_token;

    if (accessToken.value)
      return navigateTo("/");
  }

  if (!accessToken.value)
    return navigateTo("https://t.me/Threehundredrusupport_bot", {
      external: true,
    });

  $api.setSecurityData(accessToken.value);
});
