<script setup lang="ts">
import { Line } from "vue-chartjs";

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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

const chartData = ref({
  labels: labels,
  datasets: [
    {
      data: revenueData,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.3,
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Sembunyikan legend untuk tampil lebih bersih
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `Revenue: Rp${context.raw.toLocaleString()}`, // Format angka
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Month",
      },
      grid: {
        // Hanya tampilkan garis grid pada setiap label kedua
        display: false,
        drawOnChartArea: true,
        drawTicks: true,
        color: (context: any) => {
          // Tampilkan garis grid untuk label pada index genap
          return context.index % 2 === 0
            ? "rgba(200, 200, 200, 0.5)"
            : "transparent";
        },
      },
      ticks: {
        callback: (_: any, index: number) => {
          // Tampilkan setiap label kedua (index genap)
          return index % 2 === 0 ? chartData.value.labels[index] : "";
        },
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Revenue (Rp)",
      },
      ticks: {
        callback: (value: any) => `Rp${value.toLocaleString()}`, // Format label angka pada sumbu Y
      },
      grid: {
        display: true,
      },
    },
  },
});
</script>

<template>
  <UCard
    :ui="{
      body: {
        padding: '',
      },
    }"
    class="col-span-2 md:col-span-1 xl:col-span-2"
  >
    <div class="px-4 py-5 sm:px-6">
      <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
        Revenue
      </p>
      <p class="text-3xl font-semibold">
        {{ currencyFormat(totalRevenue) }}
      </p>
    </div>

    <div class="h-96">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </UCard>
</template>
