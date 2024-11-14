<template>
  <UButton
    color="gray"
    icon="i-heroicons-magnifying-glass"
    block
    :ui="{
      block: '',
    }"
    class="w-full inline-flex items-center"
    size="sm"
  >
    <span class="font-normal">Search...</span>
    <template #trailing>
      <div class="ml-auto flex gap-1">
        <UKbd>Ctrl</UKbd>
        <UKbd>K</UKbd>
      </div>
    </template>
  </UButton>
</template>
