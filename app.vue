<script setup lang="ts">
const { loadSession } = useAuth();
const { loadItemsInCart } = useCartNew();

onMounted(() => {
  loadSession();
  loadItemsInCart();
});
</script>

<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
    <UModals />
    <USlideovers />
  </div>
</template>
