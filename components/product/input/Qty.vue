<script setup lang="ts">
import type { ButtonColor, ButtonSize } from "#ui/types";

const props = defineProps<{
  stockAvailable: number;
  qty?: number;
  reduceTrash?: boolean;
  size?: ButtonSize;
  color?: ButtonColor;
  block?: boolean;
}>();

const qty = ref<number>(props.qty || 0);

const disabledAddQty = ref<boolean>(false);

const emit = defineEmits([
  "update:qty",
  "remove:item",
  "add:item",
  "reduce:item",
]);

const addQty = () => {
  qty.value++;
  emit("update:qty", qty.value);

  emit("add:item", qty.value);
};
const reduceQty = () => {
  qty.value--;
  emit("update:qty", qty.value);

  emit("reduce:item", qty.value);
};
const removeQty = () => emit("remove:item");

const stockAvailableUpdate = ref<number>(0);

onMounted(() => {
  disabledAddQty.value = qty.value >= stockAvailableUpdate.value ? true : false;
});

watch(qty, (newQty) => {
  // Jika input qty kosong maka di isi dengan qty 0
  if (typeof newQty !== "number" || qty.value < 0 || qty.value === 0) {
    qty.value = 0;
  }

  disabledAddQty.value = qty.value >= stockAvailableUpdate.value ? true : false;

  emit("update:qty", qty.value);
});

watch(
  () => props.qty,
  (newValue) => {
    qty.value = isNaN(newValue ?? 0) ? 0 : newValue!;
  },
  {
    immediate: true,
  }
);

watch(
  () => props.stockAvailable,
  (newValue) => {
    stockAvailableUpdate.value = newValue;

    disabledAddQty.value =
      qty.value >= stockAvailableUpdate.value ? true : false;
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <UInput
    v-model="qty"
    name="q"
    autocomplete="off"
    :ui="{
      base: 'text-center',
      icon: { leading: { pointer: '' }, trailing: { pointer: '' } },
    }"
    class="text-center"
    type="number"
    disabled
    :color="disabledAddQty ? 'gray' : 'white'"
    :size="props.size"
    :class="props.block ? 'w-full' : 'w-28'"
  >
    <template #leading>
      <!-- Remove Item -->
      <div v-if="props.reduceTrash && qty < 2" class="flex justify-center">
        <UButton
          color="gray"
          :ui="{
            icon: {
              base: 'text-gray-400',
            },
          }"
          variant="link"
          icon="i-heroicons-trash"
          :padded="false"
          @click="removeQty()"
          :class="[
            qty > 1 &&
              'hover:bg-primary-100 hover:text-primary text-primary dark:hover:bg-zinc-700',
          ]"
          v-if="props.reduceTrash && qty < 2"
        />
      </div>

      <!-- Reduce Item -->
      <template v-else>
        <UButton
          color="gray"
          variant="link"
          icon="i-heroicons-minus"
          :padded="false"
          @click="reduceQty()"
          :disabled="qty < 2"
          :class="[
            qty > 1 &&
              'hover:bg-primary-100 hover:text-primary text-primary dark:hover:bg-zinc-700',
          ]"
        />
      </template>
    </template>
    <template #trailing>
      <UButton
        color="gray"
        variant="link"
        icon="i-heroicons-plus"
        :padded="false"
        @click="addQty()"
        :disabled="disabledAddQty"
        class="text-gray-400 dark:hover:bg-zinc-700"
        :class="[
          !disabledAddQty &&
            'hover:bg-primary-100 hover:text-primary text-primary',
        ]"
      />
    </template>
  </UInput>
</template>
