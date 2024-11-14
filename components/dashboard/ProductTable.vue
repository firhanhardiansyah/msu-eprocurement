<script setup lang="ts">
const columns = [
  {
    key: "product",
    label: "Products",
  },
  {
    key: "revenue",
    label: "Revenues",
  },
  {
    key: "sales",
    label: "Sales",
  },
  {
    key: "reviews",
    label: "Reviews",
  },
  {
    key: "views",
    label: "Views",
  },
];

const topProductsData = [
  {
    product: "Smartphone X1",
    revenue: currencyFormat(225000000), // IDR
    sales: 120,
    reviews: 85,
    views: 2000,
  },
  {
    product: "Laptop Pro 14",
    revenue: currencyFormat(450000000), // IDR
    sales: 75,
    reviews: 65,
    views: 1500,
  },
  {
    product: "Wireless Headphones",
    revenue: currencyFormat(120000000), // IDR
    sales: 200,
    reviews: 120,
    views: 2500,
  },
  {
    product: "Smartwatch S2",
    revenue: currencyFormat(180000000), // IDR
    sales: 90,
    reviews: 70,
    views: 1800,
  },
  {
    product: "4K Television",
    revenue: currencyFormat(675000000), // IDR
    sales: 40,
    reviews: 50,
    views: 800,
  },
  {
    product: "Gaming Console Z",
    revenue: currencyFormat(525000000), // IDR
    sales: 60,
    reviews: 45,
    views: 1300,
  },
  {
    product: "Bluetooth Speaker",
    revenue: currencyFormat(90000000), // IDR
    sales: 150,
    reviews: 90,
    views: 2200,
  },
  {
    product: "Electric Scooter",
    revenue: currencyFormat(300000000), // IDR
    sales: 45,
    reviews: 40,
    views: 1000,
  },
  {
    product: "Digital Camera",
    revenue: currencyFormat(270000000), // IDR
    sales: 50,
    reviews: 30,
    views: 900,
  },
  {
    product: "Smart Home Hub",
    revenue: currencyFormat(150000000), // IDR
    sales: 80,
    reviews: 55,
    views: 1400,
  },
];
</script>

<template>
  <UCard
    :ui="{
      body: {
        padding: '',
      },
    }"
  >
    <template #header>
      <p class="text-sm text-gray-700 dark:text-gray-400 font-medium">
        Top Products
      </p>
    </template>

    <UTable
      :columns="columns"
      :rows="topProductsData"
      :ui="{
        th: {
          padding: 'px-4 py-4 sm:px-6 sm:py-4',
        },
        td: {
          padding: 'px-4 py-4 sm:px-6 sm:py-4',
        },
      }"
    />
  </UCard>
</template>
