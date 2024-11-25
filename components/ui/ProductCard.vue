<script setup lang="ts">
const props = defineProps<{
  title?: string | boolean;
  subtitle?: string | boolean;
  price?: number;
  image?: any;
}>();

const { getFirstElement } = useHelper();

const emits = defineEmits(["to"]);

const goTo = () => {
  emits("to");
};

const productImage = ref();

const imageRef = toRef(props, "image");

onMounted(() => {
  productImage.value = getFirstElement<ProductAttachment>(
    props?.image
  )?.attachment_url;
});

watch(imageRef, () => {
  productImage.value = getFirstElement<ProductAttachment>(
    props?.image
  )?.attachment_url;
});
</script>

<template>
  <UCard
    :ui="{
      header: {
        padding: 'p-0 sm:p-0',
      },
      body: {
        padding: '',
      },
    }"
    class="cursor-pointer"
    @click="goTo()"
  >
    <template #header>
      <template v-if="productImage != null">
        <div class="relative w-full pb-[100%] bg-gray-200 rounded-t-lg">
          <img
            :src="productImage"
            alt="Image Product"
            class="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
      </template>
      <template v-else>
        <div class="relative w-full pb-[100%] bg-amber-50 rounded-t-lg">
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
    </template>

    <div class="px-3 pt-2 pb-3">
      <div class="text-sm line-clamp-2 min-h-8">{{ props.title }}</div>
      <div class="text-sm text-gray-500 min-h-8">
        <p>{{ props.subtitle !== false ? props.subtitle : "-" }}</p>
      </div>
      <div class="text-base md:text-lg font-semibold text-primary">
        {{ currencyFormat(props.price ?? 0) }}
      </div>
    </div>
  </UCard>
</template>
