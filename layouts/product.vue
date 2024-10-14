<script setup lang="ts">
const props = defineProps<{
  links?: [];
}>();
</script>

<template>
  <MainHeader :divider="false" />

  <div
    class="bg-white dark:bg-black md:sticky md:top-14 md:z-50"
    v-if="props.links != null"
  >
    <UContainer class="py-2">
      <UBreadcrumb :links="props.links" />
    </UContainer>
    <UDivider />
  </div>

  <UContainer class="container min-h-screen mb-8 flex flex-col gap-3 py-4">
    <slot />
  </UContainer>

  <MainFooter />
</template>
