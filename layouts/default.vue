<script setup lang="ts">
const props = defineProps({
  bgCanvas: {
    type: Boolean,
  },
});
</script>

<template>
  <MainHeader />

  <div :class="[props.bgCanvas && 'bg-gray-100 dark:bg-inherit']">
    <UContainer class="min-h-screen">
      <slot />
    </UContainer>
  </div>

  <MainFooter />
</template>
