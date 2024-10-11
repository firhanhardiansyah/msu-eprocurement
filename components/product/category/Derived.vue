<script setup lang="ts">
const props = defineProps<{
  category: CategoryProduct | undefined;
}>();

const { toProductCategory } = useProduct();
</script>

<template>
  <UCard
    :ui="{
      divide: '',
      shadow: 'shadow-2xl',
      header: {
        padding: 'p-0 sm:p-0',
      },
    }"
  >
    <template #header>
      <ProductCardHeader :label="props.category?.name" />
    </template>

    <!-- Categories -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
      v-if="props.category?.items?.length ?? 0 > 0"
    >
      <div v-for="item in props.category?.items">
        <NuxtLink
          :to="
            toProductCategory(
              props.category?.url_slug ?? '',
              item?.url_slug ?? ''
            )
          "
        >
          <p class="cursor-pointer text-slate-600 hover:text-primary">
            {{ item?.name }}
          </p>
        </NuxtLink>
      </div>
    </div>

    <!-- Elese -->
    <template v-else>
      <div class="flex flex-col items-center justify-center">
        <article class="prose prose-slate flex flex-col items-center">
          <img
            src="/images/illustration/void.svg"
            alt="No Category"
            class="w-52"
          />
          <h2 class="m-0">Yah, gak ada</h2>
          <p class="m-0">Tidak ada pilihan kategori produk ini.</p>
        </article>
      </div>
    </template>
  </UCard>
</template>
