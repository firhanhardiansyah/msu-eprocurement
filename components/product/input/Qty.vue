<script setup lang="ts">
const props = defineProps({
  stockAvailable: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
  },
  reduceTrash: {
    type: Boolean,
  },
});

const qty = ref<number>(props.qty || 1);

const disabledAddQty = ref<boolean>(false);

const emit = defineEmits([
  "update:qty",
  "remote:item",
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
const removeQty = () => emit("remote:item");

onMounted(() => {
  disabledAddQty.value = qty.value > props.stockAvailable ? true : false;
});

watch(qty, (newQty) => {
  // Jika input qty kosong maka di isi dengan qty 0
  if (typeof newQty !== "number" || qty.value < 0 || qty.value === 0) {
    qty.value = 0;
  }

  disabledAddQty.value = qty.value >= props.stockAvailable ? true : false;

  emit("update:qty", qty.value);
});
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
    class="w-28 text-center"
    type="number"
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
