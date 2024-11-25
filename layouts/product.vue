<script setup lang="ts">
import type { BreadcrumbLink } from "#ui/types";

const props = defineProps<{
  links: BreadcrumbLink[];
  bgCanvas?: boolean;
  padded?: boolean;
}>();
</script>

<template>
  <MainHeader :divider="false" />
  <div
    class="bg-white dark:bg-black md:sticky md:top-14 md:z-40"
    v-if="props.links != null"
  >
    <UContainer class="py-2">
      <UBreadcrumb :links="props.links" />
    </UContainer>
    <UDivider />
  </div>

  <div :class="[props.bgCanvas && 'bg-gray-100 dark:bg-inherit']">
    <template v-if="props.padded">
      <slot />
    </template>

    <template v-else>
      <UContainer class="min-h-screen py-3">
        <slot />
      </UContainer>
    </template>
  </div>

  <MainFooter />
</template>
