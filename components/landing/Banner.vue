<script setup lang="ts">
const items = [
  "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/8/22/72174d2b-6c37-4cc3-b5f6-5b5da7ff0c42.jpg.webp?ect=4g",
  "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/6/27/d00dbb58-ecca-456f-97ac-8eca1f30aeb5.jpg.webp?ect=4g",
];

const carouselRef = ref();

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 3000);
});
</script>

<template>
  <UCarousel
    ref="carouselRef"
    v-slot="{ item }"
    :items="items"
    :ui="{ item: 'basis-full' }"
    class="rounded-lg overflow-hidden shadow-lg my-5"
    indicators
  >
    <img
      :src="item"
      class="w-full object-fill sm:object-cover lg:object-cover h-24 sm:h-48 lg:h-72"
      draggable="false"
    />
  </UCarousel>
</template>
