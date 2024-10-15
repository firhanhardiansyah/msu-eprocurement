<script setup lang="ts">
const props = defineProps({
  divider: {
    type: Boolean,
    default: true,
  },
});

const { loadSession } = useAuth();
const { loadCart } = useCart();

onMounted(() => {
  loadSession();
  loadCart();
});
</script>

<template>
  <header class="bg-white dark:bg-black sticky top-0 z-50">
    <UContainer class="container mx-auto flex h-14 max-w-screen-2xl">
      <div class="flex justify-between w-full gap-2 items-center">
        <UiLogo />

        <MainHeaderNavBar />

        <div class="flex flex-1 justify-end gap-2 py-2">
          <MainHeaderSearch />
          <MainHeaderShoppingCart />
          <div class="hidden md:flex">
            <UiDarkMode />
          </div>
          <MainHeaderUser />
          <MainHeaderSideBar />
        </div>
      </div>
    </UContainer>
    <UDivider v-if="props.divider" />
  </header>
</template>
