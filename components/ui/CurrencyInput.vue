<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue", "changed"]);

const rawValue = ref<string>();

watch(
  () => props.modelValue,
  (newValue) => {
    rawValue.value = newValue;
  },
  {
    immediate: true,
  }
);

const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;

  const parse = parseCurrency(input.value);

  rawValue.value = Number.isNaN(parse) ? "" : currencyFormat(parse);

  emits("update:modelValue", rawValue.value);
};

const onChange = (event: Event) => {
  emits("changed", rawValue.value);
};
</script>

<template>
  <UInput
    v-model="rawValue"
    @keyup="onInput"
    @change="onChange"
    :disabled="disabled"
    :color="disabled ? 'gray' : 'white'"
  />
</template>
