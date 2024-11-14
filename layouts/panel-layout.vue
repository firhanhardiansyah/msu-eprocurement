<script setup lang="ts">
const { isMobile, isTablet } = useHelper();
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden">
    <PanelSideBar />

    <div class="flex flex-1 w-full min-w-0">
      <div class="flex-col items-stretch relative w-full flex-1 flex">
        <PanelHeader />

        <!-- Content -->
        <div class="flex-1 flex flex-col overflow-y-auto">
          <slot />
        </div>
        <!-- End Content -->
      </div>
    </div>
  </div>
</template>
