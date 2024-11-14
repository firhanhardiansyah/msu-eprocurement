<script setup lang="ts">
const options = ["Semua Produk", "Request Order"];

const selected = ref(options[0]);

// Date Picker
import { format } from "date-fns";

const deliveryDate = ref(new Date());
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-3 w-full">
    <UInput
      class="w-full lg:w-5/12"
      icon="i-heroicons-magnifying-glass"
      placeholder="Cari transaksi..."
      color="gray"
    />
    <div class="flex gap-3 lg:w-7/12">
      <USelectMenu
        placeholder="Select a person"
        class="w-6/12"
        color="gray"
        v-model="selected"
        :options="options"
      />

      <UPopover :popper="{ placement: 'bottom-start' }" class="w-6/12">
        <UButton
          icon="i-heroicons-calendar-days"
          class="w-full"
          size="lg"
          color="gray"
          :ui="{
            font: 'font-normal',
          }"
          :label="format(deliveryDate, 'd MMM, yyy')"
        />

        <template #panel="{ close }">
          <UiDatePicker v-model="deliveryDate" is-required @close="close" />
        </template>
      </UPopover>
    </div>
  </div>
</template>
