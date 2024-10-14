<script setup lang="ts">
const isOpen = ref<boolean>(false);

const { links } = useNavbar();
</script>

<template>
  <div class="flex lg:hidden">
    <UButton icon="i-heroicons-bars-3" color="gray" @click="isOpen = true" />

    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1">
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Menu
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="">
          <UVerticalNavigation :links="links" />
        </div>
      </UCard>
    </USlideover>
  </div>
</template>
