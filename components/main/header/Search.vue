<script setup lang="ts">
const { metaSymbol } = useShortcuts();

// Check Size Screen
const { isMobile } = useHelper();

const isOpenSlideOver = ref<boolean>(false);
const isOpenModal = ref<boolean>(false);

defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => isOpenSearchMenu(),
  },
});

const isOpenSearchMenu = () => {
  isOpenSlideOver.value = !isOpenSlideOver.value;
  isOpenModal.value = !isOpenModal.value;
};

watch(isMobile, () => {
  isOpenModal.value = false;
  isOpenSlideOver.value = false;
});
</script>

<template>
  <div class="flex w-full relative md:w-auto">
    <UButton
      icon="i-heroicons-magnifying-glass-20-solid"
      color="gray"
      :label="$t('general.search') + '...'"
      class="w-full md:w-64 lg:w-48"
      @click="isOpenSearchMenu"
    >
      <template #trailing>
        <ClientOnly>
          <div
            class="pointer-events-none absolute right-[0.4rem] top-[0.3rem] hidden md:flex"
          >
            <UKbd>{{ metaSymbol }}</UKbd>
            <UKbd>K</UKbd>
          </div>
        </ClientOnly>
      </template>
    </UButton>
  </div>

  <!-- Mobile Device -->
  <USlideover v-if="isMobile" v-model="isOpenSlideOver" side="top">
    <!-- Content Search -->
    <MainHeaderSearchPalette :close-button="isOpenSearchMenu" />
  </USlideover>

  <!-- Tablet, Desktop -->
  <template v-else>
    <UModal v-model="isOpenModal" side="top">
      <!-- Content Search -->
      <MainHeaderSearchPalette :close-button="isOpenSearchMenu" />
    </UModal>
  </template>
</template>
