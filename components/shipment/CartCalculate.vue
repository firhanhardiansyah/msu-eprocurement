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
        <p class="text-base font-semibold">Ringkasan Belanja</p>
      </div>
    </template>
    <template #default>
      <div class="px-4 py-3">
        <div
          class="text-sm text-zinc-500 dark:text-zinc-300 flex justify-between"
        >
          <p>Total Harga (1 Barang)</p>
          <p>{{ currencyFormat(234) }}</p>
        </div>
        <UDivider class="py-3" />
        <div class="text-sm flex justify-between">
          <p class="">Total Belanja</p>
          <p class="font-bold">{{ currencyFormat(234) }}</p>
        </div>
      </div>
    </template>
  </UCard>
</template>
