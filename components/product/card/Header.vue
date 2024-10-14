<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
  },
});

const { toCapitalCase } = useHelper();
</script>

<template>
  <div
    class="inline-block bg-yellow-400 dark:bg-yellow-700 dark:text-black rounded-tl-lg rounded-br-[40px] px-4 py-5 sm:px-6"
  >
    <div
      class="inline-block bg-gradient-to-r from-black to-transparent bg-[length:100%_4px] bg-no-repeat bg-bottom pb-1 pr-3 font-bold text-xl md:text-2xl lg:text-3xl"
    >
      {{ props.label ? toCapitalCase(props.label) : "-" }}
    </div>
  </div>
</template>
