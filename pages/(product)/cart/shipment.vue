<template>
  <div class="py-3">
    <h1 class="text-xl sm:text-2xl font-bold tracking-tight mb-2">
      Purchase Requisition
    </h1>
    <div class="flex flex-col md:flex-row gap-4">
      <div class="md:w-6/12 xl:w-8/12 flex flex-col gap-4">
        <ShipmentCartItem />
        <ShipmentCartCalculate />
      </div>

      <div class="md:w-6/12 xl:w-4/12">
        <ShipmentCartPurchase />
      </div>
    </div>
  </div>
</template>
