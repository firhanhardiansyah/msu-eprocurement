<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="auth">
    <AuthSignInForm @validation="(value) => [value && navigateTo('/')]" />
  </NuxtLayout>
</template>
