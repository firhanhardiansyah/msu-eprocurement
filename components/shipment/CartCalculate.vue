<script setup lang="js">
const { totalShoppingProducts, totalShoppingPrice, totalPriceOfAllPurchases } = useShipment();
</script>

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
        <p class="text-base font-semibold">
          {{ $t("general.shopping_summary") }}
        </p>
      </div>
    </template>
    <template #default>
      <div class="px-4 py-3">
        <div
          class="text-sm text-zinc-500 dark:text-zinc-300 flex justify-between"
        >
          <p>
            {{ $t("general.total_price") }}
            <span>
              ( {{ totalShoppingProducts }} {{ $t("general.product") }} )
            </span>
          </p>
          <p>{{ currencyFormat(totalShoppingPrice) }}</p>
        </div>
        <UDivider class="py-3" />
        <div class="text-sm flex justify-between">
          <p>{{ $t("general.total_shopping") }}</p>
          <p class="font-bold">
            {{ currencyFormat(totalPriceOfAllPurchases) }}
          </p>
        </div>
      </div>
    </template>
  </UCard>
</template>
