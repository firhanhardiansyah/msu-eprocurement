<script setup lang="ts">
const accordionItem = [
  {
    label: "Pembelian",
    items: [
      {
        label: "Menunggu Pembayaran",
      },
      {
        label: "Daftar Transaksi",
      },
    ],
  },
  {
    label: "Profile",
    items: [
      {
        label: "Wishlist",
      },
      {
        label: "Pengaturan Akun",
      },
    ],
  },
];
</script>

<template>
  <UCard
    :ui="{
      body: {
        padding: 'sm:p-0',
      },
    }"
    class="sm:p-4"
  >
    <div class="flex gap-4 items-center">
      <UAvatar
        size="lg"
        src="https://media.licdn.com/dms/image/v2/C5103AQEGHNA5tQR8bQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516834795769?e=1736380800&v=beta&t=6reXCU7o14HhGlfXoVSKgNYCuiYXMoE_QEpHr2T1Yq0"
        alt="Avatar"
      />
      <div>
        <p class="text-base">FITRADO BUDI ISMAYA</p>
        <p class="text-sm text-gray-500">73220004</p>
      </div>
    </div>
    <UDivider class="py-4" />

    <UAccordion default-open multiple :items="accordionItem">
      <template #item="{ item }">
        <div v-for="child in item.items" class="ml-3">
          <UButton
            :label="child.label"
            variant="ghost"
            color="gray"
            class="justify-start font-normal"
            block
          />
        </div>
      </template>
    </UAccordion>
  </UCard>
</template>
