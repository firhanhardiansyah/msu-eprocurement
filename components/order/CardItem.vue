<script setup lang="ts">
import { OrderModalTransactionDetail } from "#components";

const props = defineProps<{
  date: string;
  color: any;
  state: string;
  invoice_serial: string;
  product_category: string;
  product_name: string;
  total_price: string;
}>();

const modal = useModal();

const onOpenTransactionDetail = () => {
  modal.open(OrderModalTransactionDetail, {
    isOpen: true,
    onChange: () => modal.close(),
  });
};
</script>

<template>
  <UCard
    :ui="{
      body: {
        padding: '',
      },
    }"
    class="p-3 sm:p-4"
  >
    <!-- Smartphone or Tablet -->
    <div class="flex flex-row justify-between items-center gap-2 lg:hidden">
      <Icon
        name="i-heroicons-shopping-bag-solid"
        size="18"
        class="bg-purple-800"
      />
      <div class="flex-1">
        <p class="text-sm">{{ props.date }}</p>
        <p class="text-xs text-gray-500">
          {{ props.invoice_serial }}
        </p>
      </div>

      <OrderStateBadge :color="props.color" :state="props.state" />
    </div>

    <!-- Laptop View -->
    <div class="hidden lg:flex gap-2 items-center">
      <Icon
        name="i-heroicons-shopping-bag-solid"
        size="18"
        class="bg-purple-800"
      />
      <p class="text-sm">{{ props.date }}</p>

      <OrderStateBadge :color="props.color" :state="props.state" />

      <p class="text-sm text-gray-500">
        {{ props.invoice_serial }}
      </p>
    </div>

    <UDivider class="py-3" />

    <div class="flex flex-col gap-2">
      <p class="text-sm font-semibold cursor-pointer">
        {{ props.product_category }}
      </p>

      <div class="flex flex-col lg:flex-row lg:justify-between">
        <div class="flex gap-3 items-start">
          <div class="w-12 h-12 lg:w-20 lg:h-20 bg-gray-300 rounded-md" />
          <div class="flex-1">
            <p class="text-sm cursor-pointer">{{ props.product_name }}</p>
            <p class="text-sm font-semibold">1 x Rp485.000</p>

            <!-- Large View -->
            <p class="hidden lg:flex text-xs text-gray-500 mt-1">
              +5 Produk lainnya
            </p>
          </div>
        </div>

        <!-- Small View -->
        <p class="flex lg:hidden text-xs text-gray-500 my-2">
          +5 Produk lainnya
        </p>

        <div
          class="flex py-2 justify-between lg:flex-col lg:border-l-[1px] lg:pl-4 lg:gap-2"
        >
          <div class="flex flex-col lg:pl-2 lg:items-end">
            <p class="text-xs">Total Belanja</p>
            <p class="text-base font-semibold">
              {{ props.total_price }}
            </p>
          </div>

          <div class="self-end">
            <UButton
              variant="outline"
              color="primary"
              label="Detail Transaksi"
              size="xs"
              class="mr-2"
              @click="onOpenTransactionDetail()"
            />
            <UButton
              variant="solid"
              color="primary"
              label="Beli Lagi"
              size="xs"
            />
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
