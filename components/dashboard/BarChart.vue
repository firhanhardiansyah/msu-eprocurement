<script setup lang="ts">
import { Bar } from "vue-chartjs";

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
  30000000, 50000000, 40000000, 70000000, 20000000, 60000000, 80000000,
  75000000, 65000000, 90000000, 95000000, 110000000,
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
      backgroundColor: "#36A2EB",
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
        label: (context: any) =>
          `Sales(in units): Rp${context.raw.toLocaleString()}`, // Format angka
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
          return index % 3 === 0 ? chartData.value.labels[index] : "";
        },
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Sales (in units)",
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
  <div class="flex flex-col gap-4">
    <UCard
      :ui="{
        body: {
          padding: '',
        },
      }"
    >
      <template #header>
        <p class="text-sm text-gray-700 dark:text-gray-400 font-medium">
          Sales Data
        </p>
      </template>

      <div class="h-96 pt-4">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </UCard>

    <UCard>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        iste porro dolore expedita delectus veritatis nesciunt. Quisquam dolor
        earum id est nihil voluptatibus sed explicabo cumque possimus, beatae
        saepe numquam.
      </p>
    </UCard>
  </div>
</template>
