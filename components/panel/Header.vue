<script setup lang="ts">
const { isDesktop } = useHelper();

import { PanelSideMenu } from "#components";

const slideover = useSlideover();

const openSideMenu = () => {
  slideover.open(PanelSideMenu, {
    isOpen: true,
    onChange: () => slideover.close(),
  });
};

watch(isDesktop, () => {
  slideover.close();
});
</script>

<template>
  <div class="h-14 bg-white dark:bg-black border-b py-3 px-4">
    <div class="flex items-center justify-between">
      <!-- Left -->
      <div class="flex gap-3 items-center">
        <UButton
          icon="i-heroicons-bars-3"
          color="gray"
          v-if="!isDesktop"
          @click="openSideMenu()"
        />

        <p class="text-base font-medium">Home</p>
      </div>
      <!-- End Left -->

      <!-- Right -->
      <div class="flex gap-3 items-center">
        <UChip text="99" size="xl">
          <UButton icon="i-heroicons-bell" color="gray" />
        </UChip>
      </div>
      <!-- End Right -->
    </div>
  </div>
</template>
