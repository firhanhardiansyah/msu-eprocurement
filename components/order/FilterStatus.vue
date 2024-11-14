<template>
  <div class="flex flex-col gap-2 items-start lg:items-center mb-4 lg:flex-row">
    <p class="text-base font-semibold">Status</p>
    <div class="flex flex-wrap gap-2">
      <UButton
        class="bg-primary-50 dark:bg-primary-950"
        variant="outline"
        color="primary"
        label="Semua"
      />
      <UButton variant="outline" color="gray" label="Request Order" />
      <UButton variant="outline" color="gray" label="Selesai" />
      <UButton variant="outline" color="gray" label="Tidak Berhasil" />
    </div>
  </div>
</template>
