<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

// Dummy Transaction
const transactions: {
  color: any;
  state: string;
  date: string;
  invoice_serial: string;
  product_category: string;
  product_name: string;
  total_price: string;
}[] = [
  {
    color: "blue",
    state: "Request Order",
    date: "Selasa, 14 Oktober 2024",
    invoice_serial: "INV/20240811/MPL/4082927045",
    product_category: "Braking Systems and Components",
    product_name: "ADJUSTER,WHEEL BRAKE,RR,PN S4490-E0140",
    total_price: "Rp123.456",
  },
  {
    color: "green",
    state: "Selesai",
    date: "Jum'at, 11 Oktober 2024",
    invoice_serial: "INV/20240811/MPL/4082927045",
    product_category: "Battery and Accu",
    product_name: "ACCU,70A,65D26R-70A,RCA",
    total_price: "Rp123.456.000",
  },
  {
    color: "red",
    state: "Tidak Berhasil",
    date: "Rabu, 09 Oktober 2024",
    invoice_serial: "INV/20240811/MPL/4082927045",
    product_category: "Consumables Workshop",
    product_name: "AC,KIT,DENSO,HINO FM8J",
    total_price: "Rp12.456.123.322",
  },
];

// Paging Dummy
const page = ref(1);
const items = ref(Array(55));
</script>

<template>
  <NuxtLayout name="user-content" heading="Daftar Transaksi">
    <UCard
      :ui="{
        shadow: '',
        body: {
          padding: '',
        },
      }"
      class="sm:shadow sm:p-6"
    >
      <OrderFilterItem />
      <UDivider class="py-4" />
      <OrderFilterStatus />

      <div class="flex flex-col gap-3">
        <OrderCardItem
          v-for="data in transactions"
          :date="data.date"
          :color="data.color"
          :state="data.state"
          :invoice_serial="data.invoice_serial"
          :product_category="data.product_category"
          :product_name="data.product_name"
          :total_price="data.total_price"
        />
      </div>

      <div class="flex justify-center mt-5">
        <UPagination v-model="page" :page-count="5" :total="items.length" />
      </div>
    </UCard>
  </NuxtLayout>
</template>
