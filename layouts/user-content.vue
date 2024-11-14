<!-- User And Content -->
<script setup lang="ts">
const props = defineProps({
  heading: {
    type: String,
  },
});
</script>

<template>
  <div class="py-4">
    <article class="prose dark:prose-invert mb-2 lg:mb-4">
      <h1 class="text-2xl md:text-3xl lg:text-4xl">{{ props.heading }}</h1>
    </article>

    <div class="flex flex-col md:flex-row gap-5">
      <div class="hidden md:block w-full md:w-4/12 lg:w-3/12">
        <UiCardUserContent />
      </div>

      <div class="w-full md:w-8/12 lg:w-9/12">
        <slot />
      </div>
    </div>
  </div>
</template>
