<template>
  <div
    class="flex-col items-stretch relative w-full border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 lg:w-[--width] flex-shrink-0 hidden lg:flex"
    style="--width: 300px"
  >
    <!-- Panel Header -->
    <div
      class="h-14 bg-white dark:bg-black border-b border-gray-200 px-4 flex items-center justify-center"
    >
      <PanelSideBarHeader />
    </div>

    <PanelSideBarMenu />
  </div>
</template>
