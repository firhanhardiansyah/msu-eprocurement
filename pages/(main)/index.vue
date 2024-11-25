<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="default" padded>
    <!-- <LandingHero /> -->
    <UContainer class="min-h-screen py-5">
      <LandingBanner />
      <LandingListMenu />
      <LandingContent />
    </UContainer>
  </NuxtLayout>
</template>
