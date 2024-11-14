<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const open = ref(props.isOpen);

const emits = defineEmits<{
  change: [value: boolean];
}>();

const onClose = () => {
  open.value = false;
  emits("change", false);
};
</script>

<template>
  <USlideover v-model="open" side="left">
    <div class="h-14 border-b flex px-4 gap-2 items-center">
      <UButton
        color="gray"
        size="md"
        icon="i-heroicons-x-mark-20-solid"
        class=""
        square
        padded
        @click="onClose()"
      />
      <PanelSideBarHeader size="md" color="gray" />
    </div>

    <PanelSideBarMenu @close-event="onClose()" />
  </USlideover>
</template>
