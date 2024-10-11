<script setup lang="ts">
const props = defineProps<{
  stockAvailable: number;
}>();

const qty = ref<number>(1);

const disabledAddQty = ref<boolean>(false);

const emit = defineEmits(["update:qty"]);

const addQty = () => {
  qty.value++;
  emit("update:qty", qty.value);
};
const reduceQty = () => {
  qty.value--;
  emit("update:qty", qty.value);
};

onMounted(() => {
  disabledAddQty.value = qty.value > props.stockAvailable ? true : false;
});

watch(qty, (newQty, oldQty) => {
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
      <UButton
        color="gray"
        variant="link"
        icon="i-heroicons-minus"
        :padded="false"
        @click="reduceQty()"
        :disabled="qty < 2"
        :class="[
          qty > 1 && 'hover:bg-primary-100 hover:text-primary text-primary',
        ]"
      />
    </template>
    <template #trailing>
      <UButton
        color="gray"
        variant="link"
        icon="i-heroicons-plus"
        :padded="false"
        @click="addQty()"
        :disabled="disabledAddQty"
        :class="[
          !disabledAddQty &&
            'hover:bg-primary-100 hover:text-primary text-primary',
        ]"
      />
    </template>
  </UInput>
</template>
