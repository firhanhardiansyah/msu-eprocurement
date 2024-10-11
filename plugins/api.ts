export default defineNuxtPlugin((nuxtApp) => {
  const _config = useRuntimeConfig();
  const _url = _config.public.apiBase;

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
    baseURL: "https://api.nuxt.com",
    onRequest({ request, options, error }) {
      // if (session.value?.token) {
      //   const headers = options.headers ||= {}
      //   if (Array.isArray(headers)) {
      //     headers.push(['Authorization', `Bearer ${session.value?.token}`])
      //   } else if (headers instanceof Headers) {
      //     headers.set('Authorization', `Bearer ${session.value?.token}`)
      //   } else {
      //     headers.Authorization = `Bearer ${session.value?.token}`
      //   }
      // }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
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
