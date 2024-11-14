export default defineNuxtPlugin((nuxtApp) => {
  const _config = useRuntimeConfig();
  const _url = _config.public.apiBase;

  const auth = useAuth();

  const api = $fetch.create({
    baseURL: _url,
    headers: {
      "Content-Type": "application/json",
    },
    onResponseError({ response }) {
      return response?._data?.error?.error?.data;
    },
  });

  const apiAuthorized = $fetch.create({
    baseURL: _url,
    headers: {
      "Content-Type": "application/json",
    },
    onRequest({ request, options, error }) {
      if (auth.token.value) {
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        options.headers.set("Authorization", `Bearer ${auth.token.value}`);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 403) {
        await nuxtApp.runWithContext(() => navigateTo("/sign-in"));
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
      apiAuthorized,
    },
  };
});
