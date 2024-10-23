export const useAuth = () => {
  const { $api } = useNuxtApp();

  const token = useCookie("auth-token", {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    // secure: true,
    watch: false,
  });

  const user = useState<UserResponse | null>("user", () => null);

  const isAuthenticated = computed(() => !!token.value);

  const signIn = (credentials: SignInCredentials) => {
    return $api<ApiResponseGeneric<UserResponse>>(`/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
    }).then((response) => {
      if (response?.data?.token) {
        token.value = response?.data?.token;
        user.value = response?.data;

        token.value = response?.data?.token;

        sessionStorage.setItem("current-user", JSON.stringify(response?.data));
      }

      return response;
    });
  };

  // Fungsi untuk memuat session dari sessionStorage
  const loadSession = () => {
    const savedToken = token.value;
    const savedUser = sessionStorage.getItem("current-user");

    if (savedToken) {
      token.value = savedToken;
    }

    if (savedUser) {
      user.value = JSON.parse(savedUser);
    }
  };

  function signOut() {
    token.value = undefined;

    sessionStorage.removeItem("current-user");
  }

  return {
    user,
    isAuthenticated,
    loadSession,
    signIn,
    signOut,
  };
};
