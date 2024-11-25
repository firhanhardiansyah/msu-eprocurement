<script setup lang="ts">
const props = defineProps<{
  item: Product;
}>();
</script>

<template>
  <div class="bg-white dark:bg-black">
    <div class="flex flex-col gap-1">
      <UContainer class="container mx-auto py-4">
        <div class="flex items-center justify-between mb-2">
          <div class="text-lg font-bold">Ulasan Produk</div>
          <UButton variant="ghost" label="Lihat Semua" :padded="false" />
        </div>

        <div class="flex items-center gap-2">
          <Icon
            name="i-heroicons-star-solid"
            size="28"
            class="text-amber-400"
          />
          <p>
            <span class="text-lg font-bold mr-1">5.0</span>
            <span class="text-xs text-gray-500"
              >dari 321 rating • 190 ulasan</span
            >
          </p>
        </div>
      </UContainer>
      <div
        class="overflow-x-scroll whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <UContainer>
          <UBadge
            v-for="item in props.item.seller_ids"
            :label="item.partner_id?.name"
            color="gray"
            class="inline-block mr-3 mb-2"
          />
        </UContainer>
      </div>

      <UContainer class="container mx-auto py-4">
        <div class="flex gap-3">
          <UAvatar
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div>
            <h1 class="text-base font-medium">Steven</h1>
            <p class="text-sm text-gray-400 line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates beatae labore, harum unde, voluptatum recusandae nobis
              voluptate assumenda, aspernatur corrupti iste ipsa a nemo laborum
              vel. Nihil odio corporis eligendi.
            </p>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>
