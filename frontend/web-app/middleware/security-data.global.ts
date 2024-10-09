export default defineNuxtRouteMiddleware(() => {
  // if (import.meta.server) return;
  const token = useCookie('access_token').value;
  if (!token) return;

  const { $api } = useNuxtApp();
  $api.setSecurityData(token);
})