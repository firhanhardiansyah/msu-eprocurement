<script setup lang="ts">
const { getCategories } = useCategory();

const { toCapitalCase } = useHelper();

const {
  data: categories,
  status,
  error,
} = await useAsyncData(() => getCategories(), {
  transform: (response) => {
    const movingCategory = <CategoryProduct[]>[
      {
        name: "Fast Moving",
        url: `/moving/fast-moving`,
      },
      {
        name: "Slow Moving",
        url: `/moving/slow-moving`,
      },
    ];

    const categories = response.data?.map((item) => {
      item.url = `/category/${item.url_slug}`;

      item.name = toCapitalCase(item.name || "");

      return item;
    });

    const resultCategories = movingCategory.concat(categories ?? []);

    return resultCategories;
  },
});
</script>

<template>
  <div
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-8 gap-4"
  >
    <NuxtLink
      v-for="(category, index) in categories"
      :key="index"
      :to="category.url"
    >
      <UCard :class="getBackgroundColor(index)" class="cursor-pointer">
        <h1 class="font-bold text-white">{{ category.name }}</h1>
      </UCard>
    </NuxtLink>
  </div>
</template>
