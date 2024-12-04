<script setup lang="ts">
const isOpen = ref<boolean>(false);

const { links } = useNavbar();
</script>

<template>
  <div class="flex lg:hidden">
    <UButton
      icon="i-heroicons-bars-3"
      color="gray"
      @click="isOpen = true"
      aria-label="Open Menu"
    />

    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1">
        <template #header>
          <div class="flex items-center justify-between">
            <UiDarkMode />
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Menu
            </h3>
            <UButton
              color="gray"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
              aria-label="Close Menu"
            />
          </div>
        </template>

        <UVerticalNavigation :links="links" />
      </UCard>
    </USlideover>
  </div>
</template>
