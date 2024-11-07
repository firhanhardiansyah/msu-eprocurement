<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const darkModeTooltip = ref(toCapitalCase(`${colorMode.preference} mode`));

watch(isDark, () => {
  darkModeTooltip.value = toCapitalCase(`${colorMode.preference} mode`);
});
</script>

<template>
  <ClientOnly>
    <UTooltip :text="darkModeTooltip" :popper="{ arrow: true }">
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        color="gray"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
      <template #fallback>
        <div class="w-8 h-8" />
      </template>
    </UTooltip>
  </ClientOnly>
</template>
