<script setup lang="ts">
const props = defineProps<{
  images?: ProductAttachment[];
}>();

const carouselRef = ref();

onMounted(() => {
  if (!carouselRef.value) return;

  if (carouselRef.value.page === carouselRef.value.pages) {
    return carouselRef.value.select(0);
  }

  carouselRef.value.next();
});

const onChangeImgProduct = (index: number) => {
  return carouselRef.value.select(index + 1);
};

// First Image
const { getFirstElement } = useHelper();

const productImage = ref();

productImage.value = getFirstElement<ProductAttachment>(
  props?.images
)?.attachment_url;
</script>

<template>
  <div class="sticky top-28 z-auto">
    <template v-if="productImage != null">
      <UCarousel
        ref="carouselRef"
        v-slot="{ item }"
        :items="props.images"
        :ui="{ item: 'basis-full' }"
        class="rounded-lg overflow-hidden mb-2"
      >
        <div class="relative w-full pb-[100%] bg-gray-200 rounded-lg">
          <img
            :src="item?.attachment_url"
            alt="Image Product"
            class="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
      </UCarousel>
      <UCarousel
        v-slot="{ item, index }"
        :items="props.images"
        :ui="{
          item: 'snap-start',
          container:
            'relative w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-2',
        }"
      >
        <div class="relative">
          <div
            :class="
              carouselRef?.page == index + 1 &&
              'absolute w-16 h-16 rounded-lg bg-black opacity-20'
            "
          />

          <img
            :src="item?.attachment_url"
            class="w-16 h-16 object-cover rounded-lg cursor-pointer"
            :class="[
              carouselRef?.page == index + 1 && 'border-2 border-primary',
            ]"
            alt="Image Product Detail"
            @click="onChangeImgProduct(index)"
          />
        </div>
      </UCarousel>
    </template>
    <template v-else>
      <div class="relative w-full pb-[100%] bg-amber-50 rounded-lg">
        <!-- Konten di dalam container -->
        <div
          class="absolute inset-0 flex items-center justify-center text-white font-bold"
        >
          <Icon
            name="i-heroicons-photo-solid"
            size="52"
            class="text-amber-500"
          />
        </div>
      </div>
    </template>
  </div>
</template>
