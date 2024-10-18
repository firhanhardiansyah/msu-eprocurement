<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="default" bgCanvas>
    <div class="py-3">
      <h1
        class="text-2xl lg:text-3xl font-bold tracking-tight mb-4 dark:text-primary"
      >
        Request
      </h1>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="md:w-6/12 xl:w-7/12 flex flex-col gap-4">
          <ShipmentCartItem />
          <ShipmentCartCalculate />
        </div>

        <div class="md:w-6/12 xl:w-5/12">
          <ShipmentCartPurchase />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
