import { ModalSignInForm } from "#components";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();

  const modal = useModal();

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated.value) {
    // return navigateTo("/sign-in");

    modal.open(ModalSignInForm, {
      fullscreen: true,
      onValidation: (value: boolean) => {
        if (!value) return null;

        modal.close();
        return;
      },
    });

    return;
  }
});
