<script setup lang="ts">
const isOpen = ref<boolean>(false);

const { t } = useI18n();

const links = [
  [
    {
      label: t("general.home"),
      to: "/",
      click: () => {
        isOpen.value = !isOpen.value;
      },
    },
    {
      label: t("general.announcement"),
      to: "/announcements",
      click: () => {
        isOpen.value = !isOpen.value;
      },
    },
    {
      label: t("general.news"),
      to: "/news",
      click: () => {
        isOpen.value = !isOpen.value;
      },
    },
    {
      label: t("general.contact"),
      to: "/contact",
      click: () => {
        isOpen.value = !isOpen.value;
      },
    },
  ],
];
</script>

<template>
  <div class="flex lg:hidden">
    <UButton icon="i-heroicons-bars-3" color="gray" @click="isOpen = true" />

    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1">
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Menu
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="">
          <UVerticalNavigation :links="links" />
        </div>
      </UCard>
    </USlideover>
  </div>
</template>
