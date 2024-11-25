export const useNavbar = () => {
  const { t } = useI18n();

  const links = computed(() => [
    {
      label: t("general.home"),
      to: "/",
    },
    {
      label: t("general.category"),
      to: "/category",
    },
    {
      label: t("general.contact"),
      to: "/contact",
    },
  ]);

  return {
    links,
  };
};
