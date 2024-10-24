export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth(); // Example of getting the user (can be from Pinia, Vuex, etc.)

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated.value) {
    return navigateTo("/sign-in");
  }
});
