export const useAuth = () => {
  const { $api } = useNuxtApp();

  const token = useState<string | null | undefined>();

  const setToken = (val?: string) => {
    const myCookie = useCookie<string | undefined | null>("auth-token", {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      secure: true,
      watch: true,
    });

    if (import.meta.client) {
      // Set cookie only on client-side
      myCookie.value = val;
    }
  };

  const getToken = () => {
    const myCookie = useCookie("auth-token");

    if (import.meta.client) {
      // Access cookie only on client-side
      token.value = myCookie.value;
    }
  };

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

        setToken(response?.data?.token);

        sessionStorage.setItem("current-user", JSON.stringify(response?.data));
      }

      return response;
    });
  };

  // Fungsi untuk memuat session dari sessionStorage
  const loadSession = () => {
    getToken();

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
    token,
    user,
    isAuthenticated,
    loadSession,
    signIn,
    signOut,
  };
};
