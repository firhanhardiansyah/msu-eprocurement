<script setup lang="ts">
import { add, format, isSameDay, sub } from "date-fns";

import type { DatePickerRangeObject } from "v-calendar/dist/types/src/use/datePicker.js";

const props = defineProps({
  placeholder: {
    type: String,
  },
});

const model = defineModel({
  type: String,
});

const emits = defineEmits(["update:modelValue", "close"]);

const selected = ref<DatePickerRangeObject | undefined>();

const dateRange = computed({
  get: () => selected.value,
  set: (date: DatePickerRangeObject | undefined) => {
    selected.value = date;
    model.value = dateRangeModelParse.value;
    // selected.value = value;
    // console.log("dateRange");
    // console.log(value);
  },
});

const dateRangeFormat = computed(() => {
  if (selected.value === undefined) return undefined;

  const start = format(selected.value?.start as Date, "d MMM, yyy");
  const end = format(selected.value?.end as Date, "d MMM, yyy");

  return `${start} - ${end}`;
});

const dateRangeModelParse = computed(() => {
  if (selected.value === undefined) return undefined;

  const start = format(selected.value?.start as Date, "y-MM-dd");
  const end = format(selected.value?.end as Date, "y-MM-dd");

  return `${start} - ${end}`;
});

const ranges = [
  { label: "Next 7 days", duration: { days: 7 } },
  { label: "Next 14 days", duration: { days: 14 } },
  { label: "Next 30 days", duration: { days: 30 } },
  { label: "Next 3 months", duration: { months: 3 } },
  { label: "Next 6 months", duration: { months: 6 } },
  { label: "Next year", duration: { years: 1 } },
];

function isRangeSelected(duration: Duration) {
  return (
    isSameDay(selected.value?.start as Date, sub(new Date(), duration)) &&
    isSameDay(selected.value?.start as Date, new Date())
  );
}

function selectRange(duration: Duration) {
  selected.value = { start: new Date(), end: add(new Date(), duration) };
}
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UInput
      v-model="dateRangeFormat"
      class="w-full"
      :placeholder="props.placeholder"
      aria-readonly="true"
      readonly
    />

    <template #panel="{ close }">
      <div
        class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800"
      >
        <div class="hidden sm:flex flex-col py-4">
          <UButton
            v-for="(range, index) in ranges"
            :key="index"
            :label="range.label"
            color="gray"
            variant="ghost"
            class="rounded-none px-6"
            :class="[
              isRangeSelected(range.duration)
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
            ]"
            truncate
            @click="selectRange(range.duration)"
          />
        </div>

        <UiDatePicker :date-range="true" v-model="dateRange" @close="close" />
      </div>

      <!-- <UInput v-model="dateRange" class="w-full" /> -->
    </template>
  </UPopover>
</template>
