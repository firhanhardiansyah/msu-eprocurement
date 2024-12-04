<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from "v-calendar";

import { format, isSameDay, sub, type Duration } from "date-fns";

import type { DatePickerRangeObject } from "v-calendar/dist/types/src/use/datePicker.js";

const emits = defineEmits(["update:model-value", "close"]);

const dateRangeClose = ref<boolean>(false);

const ranges = [
  { label: "Last 7 days", duration: { days: 7 } },
  { label: "Last 14 days", duration: { days: 14 } },
  { label: "Last 30 days", duration: { days: 30 } },
  { label: "Last 3 months", duration: { months: 3 } },
  { label: "Last 6 months", duration: { months: 6 } },
  { label: "Last year", duration: { years: 1 } },
];

const props = defineProps({
  modelValue: {
    type: [Object] as PropType<DatePickerRangeObject | undefined>,
    // default: {
    //   start: new Date(),
    //   end: add(new Date(), { days: 1 }),
    // },
  },
  placeholder: {
    type: String,
  },
  error: {
    type: Boolean,
  },
});

const dateRange = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits("update:model-value", value);
    emits("close");
    dateRangeClose.value = true;

    console.log("change daterange");
  },
});

const isRangeSelected = (duration: Duration): boolean | undefined => {
  if (props.modelValue === undefined) return undefined;

  return (
    isSameDay(props.modelValue.start as Date, sub(new Date(), duration)) &&
    isSameDay(props.modelValue.end as Date, new Date())
  );
};

const dateRangeFormat = (
  date: DatePickerRangeObject | undefined
): string | undefined => {
  if (date === undefined) return props.placeholder;

  const isSameMonth =
    format(date.start as Date, "MMM y") === format(date.end as Date, "MMM y");

  if (isSameMonth) {
    return `${format(date.start as Date, "d MMM")} - ${format(
      date.end as Date,
      "d MMM y"
    )}`;
  }

  return `${format(date.start as Date, "d MMM y")} - ${format(
    date.end as Date,
    "d MMM y"
  )}`;
};

const attrs = {
  transparent: true,
  borderless: true,
  color: "primary",
  "is-dark": { selector: "html", darkClass: "dark" },
  "first-day-of-week": 1,
};

function onDayClick(_: any, event: MouseEvent): void {
  const target = event.target as HTMLElement;
  target.blur();
}

const dateRangeModel = computed(() => dateRangeFormat(dateRange.value));
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <!-- <UButton
      size="md"
      color="white"
      class="w-full"
      :variant="props.error ? 'ghost' : 'solid'"
      :class="[
        !dateRange && 'text-gray-400',
        props.error && 'border border-red-500',
      ]"
      :ui="{
        font: 'font-normal',
      }"
    >
      {{ dateRangeFormat(dateRange) }}
    </UButton> -->

    <UInput v-model="dateRangeModel" />

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
          />
        </div>

        <VCalendarDatePicker
          v-model.range="dateRange"
          :columns="2"
          v-bind="{ ...attrs, ...$attrs }"
          @dayclick="onDayClick"
          @click="
            () => {
              if (dateRangeClose) {
                close();
              }
              dateRangeClose = false;
            }
          "
        />
      </div>
    </template>
  </UPopover>
</template>
