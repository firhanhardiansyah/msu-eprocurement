<script setup lang="ts">
const emits = defineEmits(["validation"]);
</script>

<template>
  <UModal>
    <UContainer class="container min-h-screen flex justify-center items-center">
      <div class="w-full md:max-w-md">
        <AuthSignInForm
          @validation="(value: boolean) => emits('validation', value)"
        />
      </div>
    </UContainer>
  </UModal>
</template>
