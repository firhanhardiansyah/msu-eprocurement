<script setup lang="ts">
import type { ButtonSize, SelectColor, SelectVariant } from "#ui/types";

const props = defineProps<{
  color?: SelectColor;
  variant?: SelectVariant;
  size?: ButtonSize;
}>();

const people = [
  {
    id: "msu",
    label: "Magma Sigma Utama",
    avatar: { src: "/msu_icon.png" },
  },
  {
    id: "msu2",
    label: "Mitra Sigra Utama",
    avatar: { src: "/msu_icon.png" },
  },
  {
    id: "sss",
    label: "Sinergi Sigra Sejahtera",
    avatar: { src: "/msu_icon.png" },
  },
];

const selected = ref(people[0]);
</script>

<template>
  <USelectMenu
    v-model="selected"
    :options="people"
    class="w-full"
    :variant="props.variant"
    :color="props.color"
    :size="props.size"
  >
    <template #leading>
      <NuxtImg v-bind:src="selected.avatar.src" width="24" height="24" />
    </template>

    <template #label>
      <span class="font-medium">{{ selected.label }}</span>
    </template>
  </USelectMenu>
</template>
