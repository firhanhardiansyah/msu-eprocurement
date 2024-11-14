<script setup lang="ts">
const { loadSession } = useAuth();
const { loadCart } = useCart();

onMounted(() => {
  loadSession();
  loadCart();
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
