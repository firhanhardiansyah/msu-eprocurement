<script setup lang="ts">
const props = defineProps<{
  item: Product;
}>();

const columns = [
  {
    key: "vendor",
    label: "Vendor",
    sortable: true,
  },
  {
    key: "price",
    label: "Price",
    sortable: true,
  },
  {
    key: "uom",
    label: "UoM",
  },
  {
    key: "delivery_lead_time",
    label: "LT",
    sortable: true,
  },
  {
    key: "location",
    label: "Location",
    sortable: true,
  },
];

const rows = computed(() => {
  return props.item?.seller_ids?.map((item) => {
    return {
      vendor: item?.partner_id?.name,
      uom: item?.product_uom?.name,
      price: currencyFormat(item?.price ?? 0),
      delivery_lead_time: item?.delay,
      location: "California",
    };
  });
});
</script>

<template>
  <div class="bg-white dark:bg-black">
    <UContainer
      :ui="{
        padding: 'p-0',
      }"
    >
      <UTable
        :columns="columns"
        :rows="rows"
        class="md:border md:rounded-lg md:my-6 dark:border-gray-700"
      />
    </UContainer>
  </div>
</template>
