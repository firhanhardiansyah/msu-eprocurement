<script setup lang="ts">
const props = defineProps({
  showLabel: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <NuxtLink to="/">
    <div class="flex justify-center items-center">
      <NuxtImg src="/logo.svg" width="32" height="32" />
      <p v-if="props.showLabel" class="mx-2">
        <span class="text-primary-500 dark:text-primary-300">e</span>
        <span class="font-bold text-primary dark:text-primary-100"
          >Catalog</span
        >
      </p>
    </div>
  </NuxtLink>
</template>
