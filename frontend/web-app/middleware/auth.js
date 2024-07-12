export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("access_token").value;

  if (!token) {
    return navigateTo("/auth");
  }

  // try {
  //   jwt.verify(token, "your_secret_key");
  // } catch (error) {
  //   return navigateTo("/auth");
  // }
});
