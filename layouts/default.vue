<script setup lang="ts">
const props = defineProps({
  bgCanvas: {
    type: Boolean,
  },
  padded: {
    type: Boolean,
  },
});
</script>

<template>
  <MainHeader />

  <div :class="[props.bgCanvas && 'bg-gray-100 dark:bg-inherit']">
    <template v-if="props.padded">
      <slot />
    </template>

    <template v-else>
      <UContainer class="min-h-screen">
        <slot />
      </UContainer>
    </template>
  </div>

  <MainFooter />
</template>
