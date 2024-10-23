<script setup lang="ts">
const props = defineProps<{
  item?: Product;
}>();

const { changeProductType } = useProduct();

const items = [
  {
    title: "Nama Produk",
    value: props.item?.name,
  },
  {
    title: "Product Type",
    value: changeProductType(props.item?.type),
  },
  {
    title: "Material Code",
    value: props.item?.default_code,
  },
  {
    title: "Unit Of Issue",
    value: props.item?.uom_id?.name,
  },
  {
    title: "Purchase Unit of Measure",
    value: props.item?.uom_po_id?.name,
  },
];

const columns = [
  {
    key: "vendor",
    label: "Vendor",
  },
  {
    key: "uom",
    label: "UoM",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "delivery_lead_time",
    label: "Lead Time",
  },
];

const sales = computed(() => {
  return props.item?.seller_ids?.map((item) => {
    return {
      vendor: item?.partner_id?.name,
      uom: item?.product_uom?.name,
      price: currencyFormat(item?.price ?? 0),
      delivery_lead_time: item?.delay,
    };
  });
});
</script>

<template>
  <UCard
    :ui="{
      body: {
        padding: '',
      },
    }"
    class="px-4 py-3 mb-4"
  >
    <div v-for="(item, index) in items">
      <div class="flex flex-row max-w-lg gap-2">
        <div class="w-4/12">
          <div class="font-normal text-sm text-slate-900 dark:text-slate-50">
            {{ item.title }}
          </div>
        </div>
        <div class="w-8/12">
          <div class="font-normal text-sm text-slate-500 dark:text-slate-50">
            {{ item.value }}
          </div>
        </div>
      </div>
      <UDivider class="my-2" v-show="index != items.length - 1" />
    </div>
  </UCard>
  <UCard
    :ui="{
      body: {
        padding: '',
      },
    }"
    class="py-2"
  >
    <div class="px-4">
      <h1 class="font-bold text-lg">Purchase</h1>
    </div>

    <UTable :columns="columns" :rows="sales" />
  </UCard>
</template>
