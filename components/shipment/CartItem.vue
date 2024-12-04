<script setup lang="ts">
const { checkoutItems, getCheckedProducts } = useCartNew();

const columns = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "vendor",
    label: "Vendor",
    sortable: true,
  },
  {
    key: "unit_price",
    label: "Unit Price",
    sortable: true,
  },
  {
    key: "qty",
    label: "Qty",
    sortable: true,
  },
  {
    key: "analytic_project",
    label: "Analytic Project",
    sortable: true,
  },
  {
    key: "analytic_location",
    label: "Analytic Location",
    sortable: true,
  },
  {
    key: "analytic_category",
    label: "Analytic Category",
    sortable: true,
  },
  {
    key: "analytic_unit",
    label: "Analytic Unit",
    sortable: true,
  },
  {
    key: "analytic_type",
    label: "Analytic Type",
    sortable: true,
  },
  {
    key: "analytic_department",
    label: "Analytic Department",
    sortable: true,
  },
];

const checkOutProducts = computed<CheckoutProductItem[]>({
  set: () => {},
  get: (_) => {
    const products = getCheckedProducts(checkoutItems.value);

    return products.map((item: ProductFormState) => {
      return {
        id: item.product?.id,
        name: item.product?.name,
        analytic_project: item.analytic_project?.name,
        vendor: item.vendor?.name,
        unit_price: currencyFormat(item.unit_price ?? 0),
        qty: `${item.qty} ${item.product?.uom_id?.name}`,
        analytic_location: item.analytic_location?.name,
        analytic_category: item.analytic_category?.name,
        analytic_unit: item.analytic_unit?.name,
        analytic_type: item.analytic_type?.name,
        analytic_department: item.analytic_department?.name,
      };
    });
  },
});

const q = ref("");

const filteredRows = computed(() => {
  if (!q.value) {
    return checkOutProducts.value;
  }

  return checkOutProducts.value.filter((product) =>
    Object.values(product).some((value) =>
      String(value).toLowerCase().includes(q.value.toLowerCase())
    )
  );
});
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
    <template #default>
      <div>
        <div
          class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
        >
          <UInput v-model="q" placeholder="Search..." size="sm" />
        </div>
        <UTable
          :loading="filteredRows.length === 0"
          :loading-state="{
            icon: 'i-heroicons-arrow-path-20-solid',
            label: 'Loading...',
          }"
          :progress="{ color: 'primary', animation: 'carousel' }"
          :sort="{ column: 'name', direction: 'asc' }"
          :rows="filteredRows"
          :columns="columns"
        />
      </div>
    </template>
  </UCard>
</template>
