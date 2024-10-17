<template>
  <UCard
    :ui="{
      divide: '',
      header: {
        padding: '',
      },
      body: {
        padding: '',
      },
    }"
  >
    <template #header>
      <div class="px-4 pt-3">
        <p class="text-base font-semibold">Purchase Requisition</p>
      </div>
    </template>
    <template #default>
      <div class="px-4 py-3">
        <ShipmentFormPurchase />
      </div>
    </template>
  </UCard>
</template>
