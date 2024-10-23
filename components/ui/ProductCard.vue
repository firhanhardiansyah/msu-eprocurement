<script setup lang="ts">
const props = defineProps({
  title: {
    type: [String, Boolean],
  },
  subtitle: {
    type: [String, Boolean],
  },
  price: {
    type: Number,
  },
});

const emits = defineEmits(["to"]);

const goTo = () => {
  emits("to");
};
</script>

<template>
  <UCard
    :ui="{
      header: {
        padding: 'p-0 sm:p-0',
      },
      body: {
        padding: '',
      },
    }"
    class="cursor-pointer"
    @click="goTo()"
  >
    <template #header>
      <div class="bg-gray-200 w-full h-40 rounded-t-lg" />
    </template>

    <div class="px-3 pt-2 pb-3">
      <div class="text-sm line-clamp-2 min-h-10">{{ props.title }}</div>
      <div class="text-sm text-gray-500 min-h-10">
        <p>{{ props.subtitle !== false ? props.subtitle : "-" }}</p>
      </div>
      <div class="text-base font-semibold text-primary py-1">
        {{ currencyFormat(props.price ?? 0) }}
      </div>
    </div>
  </UCard>
</template>
