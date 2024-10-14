<script setup lang="ts">
const { links } = useNavbar();
</script>

<template>
  <div class="hidden lg:flex">
    <UHorizontalNavigation :links="links" />
  </div>
</template>
