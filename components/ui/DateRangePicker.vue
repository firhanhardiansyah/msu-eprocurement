<script setup lang="ts">
import { format, isSameDay, sub, type Duration } from "date-fns";

const emit = defineEmits(["update:model-value", "close"]);

const ranges = [
  { label: "Last 7 days", duration: { days: 7 } },
  { label: "Last 14 days", duration: { days: 14 } },
  { label: "Last 30 days", duration: { days: 30 } },
  { label: "Last 3 months", duration: { months: 3 } },
  { label: "Last 6 months", duration: { months: 6 } },
  { label: "Last year", duration: { years: 1 } },
];
const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() });

function isRangeSelected(duration: Duration) {
  return (
    isSameDay(selected.value.start, sub(new Date(), duration)) &&
    isSameDay(selected.value.end, new Date())
  );
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() };

  emit("update:model-value", selected.value);
}

const selectedStart = format(selected.value.start, "d MMM, yyy");
const selectedEnd = format(selected.value.end, "d MMM, yyy");

const dateModel = ref(`${selectedStart} - ${selectedEnd}`);
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton
      color="gray"
      variant="soft"
      :label="dateModel"
      trailing-icon="i-heroicons-chevron-down-20-solid"
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

        <UiDatePicker
          v-model="selected"
          daterangepicker
          @update:model-value="
              (date: any) => {
                console.log('date');
                console.log(date);


      const selectedStart = format(date.start, 'd MMM, yyy');
      const selectedEnd = format(date.end, 'd MMM, yyy');

                dateModel = `${selectedStart} - ${selectedEnd}`;
              }
            "
          @close="close"
        />
      </div>
    </template>
  </UPopover>
</template>
