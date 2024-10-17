<script setup lang="ts">
const props = defineProps({
  description: {
    type: String,
  },
  confirmLabel: {
    type: String,
    default: "Ok",
  },
});

const emits = defineEmits(["confirm"]);

const onConfirm = () => {
  emits("confirm");
};
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
        <template v-if="props.description">
          <p>{{ props.description }}</p>
        </template>
        <UButton @click="onConfirm()"> {{ props.confirmLabel }} </UButton>
      </div>
    </UCard>
  </UModal>
</template>
