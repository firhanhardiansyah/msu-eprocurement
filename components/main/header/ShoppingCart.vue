<script setup lang="ts">
const isOpen = ref<boolean>(false);
</script>

<template>
  <UButton
    icon="i-heroicons-shopping-cart"
    color="gray"
    @click="isOpen = true"
  />

  <USlideover v-model="isOpen">
    <UCard class="flex flex-col flex-1">
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Shopping Cart
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <div>
        <article class="prose prose-slate">
          <NuxtImg src="/images/illustration/empty_cart.svg" class="w-72" />
          <h1>Keranjang belanjamu masih kosong.</h1>
          <p>Yuk, isi keranjangmu dengan berbagai produk yang tersedia</p>
          <UButton label="Mulai Belanja" color="black" size="lg" />
        </article>
      </div>
    </UCard>
  </USlideover>
</template>
