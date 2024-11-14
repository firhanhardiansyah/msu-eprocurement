<script setup lang="ts">
const props = defineProps<{
  color: string;
  state: string;
}>();
</script>

<template>
  <template v-if="props.color === 'blue'">
    <UBadge variant="soft" color="blue" :label="props.state" />
  </template>
  <template v-if="props.color === 'red'">
    <UBadge variant="soft" color="red" :label="props.state" />
  </template>
  <template v-if="props.color === 'green'">
    <UBadge variant="soft" color="green" :label="props.state" />
  </template>
</template>
