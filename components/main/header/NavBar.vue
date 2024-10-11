<script setup lang="ts">
const { t } = useI18n();

const links = [
  {
    label: t("general.home"),
    to: "/",
  },
  {
    label: t("general.announcement"),
    to: "/announcements",
  },
  {
    label: t("general.news"),
    to: "/news",
  },
  {
    label: t("general.contact"),
    to: "/contact",
  },
];
</script>

<template>
  <div class="hidden lg:flex">
    <UHorizontalNavigation :links="links" />
  </div>
</template>
