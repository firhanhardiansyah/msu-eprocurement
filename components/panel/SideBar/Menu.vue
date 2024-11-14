<script setup lang="ts">
import type { VerticalNavigationLink } from "#ui/types";

const emits = defineEmits<{
  closeEvent: [value?: boolean];
}>();

const features: VerticalNavigationLink[][] = [
  [
    {
      label: "Home",
      icon: "i-heroicons-home",
      to: "/admin",
      click: () => {
        emits("closeEvent");
      },
    },
    {
      label: "Inbox",
      icon: "i-heroicons-inbox",
      to: "/admin/inbox",
      badge: 9,
      click: () => {
        emits("closeEvent");
      },
    },
  ],
  [
    {
      label: "Orders",
      icon: "i-heroicons-shopping-bag",
      to: "/admin/inbox",
    },
    {
      label: "Products",
      icon: "i-heroicons-sparkles",
      to: "/admin/inbox",
    },
    {
      label: "Invoices",
      icon: "i-heroicons-document-text",
      to: "/admin/inbox",
    },
    {
      label: "Analitics",
      icon: "i-heroicons-chart-bar-square",
      to: "/admin/inbox",
    },
  ],
];
const helpers: VerticalNavigationLink[][] = [
  [
    {
      label: "Help & Support",
      icon: "i-heroicons-question-mark-circle",
      to: "/",
    },
  ],
];

const accountSettings = [
  [
    {
      label: "Signed in as",
      username: "firhanhardiansyah.dev@gmail.com",
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      to: "/",
    },
    {
      label: "Help & Support",
      icon: "i-heroicons-question-mark-circle",
      to: "/",
    },
  ],
  [
    {
      label: "Sign Out",
      icon: "i-heroicons-arrow-left-start-on-rectangle",
      to: "/",
    },
  ],
];
</script>

<template>
  <div class="flex flex-col w-full flex-1 relative overflow-hidden px-4 py-3">
    <div class="flex-grow flex flex-col min-h-0 gap-y-3">
      <!-- Panel Search Bar -->
      <PanelSideBarSearch />

      <!-- Panel Content -->
      <div class="flex-1 flex flex-col gap-y-2 overflow-y-auto">
        <UVerticalNavigation :links="features" />

        <div class="flex-1" />
        <UVerticalNavigation :links="helpers" />
      </div>

      <UDivider />
      <!-- Panel Footer -->
      <UPopover :popper="{ placement: 'top-start' }">
        <UButton
          color="gray"
          label="Firhan Hardiansyah"
          :ui="{
            block: '',
          }"
          class="w-full inline-flex items-center"
          size="sm"
          icon="i-heroicons-magnifying-glass"
        >
          <template #leading>
            <UAvatar
              src="https://avatars.githubusercontent.com/u/739984?v=4"
              alt="Avatar"
              size="2xs"
            />
          </template>
          <template #trailing>
            <div class="ml-auto flex gap-1">
              <Icon name="i-heroicons-ellipsis-vertical" />
            </div>
          </template>
        </UButton>

        <template #panel>
          <UVerticalNavigation
            :links="accountSettings"
            :ui="{
              width: 'w-[16.7rem]',
            }"
          >
            <template #default="{ link }">
              <div
                class="relative flex flex-col items-start"
                v-if="link.username"
              >
                <span class="text-gray-400 font-normal">
                  {{ link.label }}
                </span>
                <span class="text-gray-700 font-normal">
                  {{ link.username }}
                </span>
              </div>
            </template>
          </UVerticalNavigation>
        </template>
      </UPopover>
    </div>
  </div>
</template>
