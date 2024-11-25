<script setup lang="ts">
const { cartShipment } = useShipment();
</script>

<template>
  <UCard
    class="pb-2"
    :ui="{
      header: {
        padding: '',
      },
      body: {
        base: 'flex flex-col gap-3 ',
        padding: '',
      },
      divide: '',
    }"
  >
    <template #header>
      <div class="px-4 pt-3">
        <p class="text-base font-semibold">
          {{ cartShipment?.subCategory }}
        </p>
      </div>
    </template>

    <template #default>
      <template v-for="(product, index) in cartShipment?.products">
        <div class="flex gap-4 px-4 py-3 sm:px-6">
          <!-- Image -->
          <div class="bg-gray-300 h-16 w-16 rounded-md" />

          <div class="flex-1 flex flex-col lg:flex-row lg:justify-between">
            <!-- Product Name -->
            <NuxtLink :to="product?.url_product">
              <p
                class="text-sm text-zinc-900 dark:text-zinc-300 cursor-pointer"
              >
                {{ product?.name }}
              </p>
              <div class="flex flex-wrap gap-1 mt-2">
                <UBadge
                  v-for="purchase in product?.seller_ids"
                  :label="purchase?.partner_id?.name"
                  variant="outline"
                />
              </div>
            </NuxtLink>

            <!-- Price -->
            <p class="text-base font-semibold flex gap-1">
              <span>
                {{ product.quantity }}
              </span>
              <span>x</span>
              {{ currencyFormat(product?.standard_price || 0) }}
            </p>
          </div>
        </div>
      </template>
    </template>
  </UCard>
</template>
