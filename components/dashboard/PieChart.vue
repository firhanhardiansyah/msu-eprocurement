<script setup lang="ts">
import { Pie } from "vue-chartjs";

const chartData = ref({
  labels: [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Health & Beauty",
    "Sports & Outdoors",
  ],
  datasets: [
    {
      data: [300, 150, 100, 200, 250], // Data untuk masing-masing kategori
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"], // Warna untuk tiap kategori
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.label}: ${context.raw} items`,
      },
    },
    title: {
      display: false,
    },
  },
});

// Computed property untuk menghitung total jumlah item
const totalItems = computed(() => {
  return chartData.value.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
});
</script>

<template>
  <UCard>
    <div>
      <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
        Distribution of Product Categories
      </p>
      <p class="text-3xl font-semibold">
        {{ totalItems }}
      </p>
    </div>

    <div class="h-96 pb-4 flex justify-center">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </UCard>
</template>
