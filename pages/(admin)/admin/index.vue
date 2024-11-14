<script setup lang="ts">
definePageMeta({
  layout: "panel-layout",
});

// Data dummy untuk revenue bulanan
const revenueData = [
  1200000, 1500000, 1000000, 2200000, 1800000, 2500000, 2300000, 2700000,
  2000000, 2900000, 3200000, 3000000,
];
// Menghitung total revenue
const totalRevenue = computed(() =>
  revenueData.reduce((sum, value) => sum + value, 0)
);

// Menghitung rata-rata revenue bulanan
const avgRevenue = computed(() => {
  return revenueData.length ? totalRevenue.value / revenueData.length : 0;
});

// Menghitung gross revenue (sama dengan total revenue)
const grossRevenue = computed(() =>
  revenueData.reduce((sum, value) => sum + value, 0)
);

// Dashboard Dummy Data
const dashboardCount = ref([
  {
    title: "Gross Revenue",
    subtitle: currencyFormat(grossRevenue.value),
    daterange: "From Jan 01, 2024 - March 30, 2024",
    profit: true,
  },
  {
    title: "Avg. Order Value",
    subtitle: currencyFormat(avgRevenue.value),
    daterange: "From Jan 01, 2024 - March 30, 2024",
    profit: false,
  },
  {
    title: "Total Orders",
    subtitle: currencyFormat(totalRevenue.value),
    daterange: "From Jan 01, 2024 - March 30, 2024",
    profit: true,
  },
]);

// Mode
const { isDesktop } = useHelper();
</script>

<template>
  <div
    class="flex-shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 py-2 top-0 z-10 bg-white dark:bg-black"
    :class="[isDesktop && 'sticky']"
  >
    <div class="px-4 flex gap-3">
      <UiDateRangePicker />

      <!-- Daily Or Weekly -->
      <USelectMenu
        size="sm"
        :ui="{
          color: {
            white: {
              none: 'bg-gray-50',
            },
          },
        }"
        variant="none"
        class="text-gray-500"
        placeholder="Daily"
        :options="['Daily', 'Weekly']"
        model-value="Daily"
      />
    </div>
  </div>
  <div class="px-4 flex flex-col gap-4 py-4">
    <!-- Counts -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <UCard v-for="item in dashboardCount">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {{ item.title }}
          </p>
          <div class="flex justify-between items-start">
            <p class="text-2xl xl:text-3xl font-semibold">
              {{ item.subtitle }}
            </p>
            <UBadge variant="soft" :color="item.profit ? 'green' : 'red'">
              <Icon
                :name="
                  item.profit
                    ? 'i-heroicons-arrow-trending-up'
                    : 'i-heroicons-arrow-trending-down'
                "
                size="20"
                class="mr-2"
              />
              <p>2,15%</p>
            </UBadge>
          </div>
        </div>

        <!-- Footer -->
        <template #footer>
          <p class="text-sm">{{ item.daterange }}</p>
        </template>
      </UCard>
    </div>

    <!-- Chart -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <!-- Pie Chart -->
      <DashboardPieChart class="col-span-2 md:col-span-1" />

      <!-- Line Chart Revenue -->
      <DashboardLineChart />

      <div class="col-span-2 md:col-span-2 xl:col-span-2">
        <DashboardProductTable />
      </div>

      <div class="col-span-2 md:col-span-2 xl:col-span-1">
        <DashboardBarChart />
      </div>
    </div>
  </div>
</template>
