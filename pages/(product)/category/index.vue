<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { t } = useI18n();

const { getCategories } = useCategory();
const { toProductCategory } = useProduct();

const links = useBreadcrumbItems({
  overrides: [
    undefined,
    {
      label: t("general.product_category"),
    },
  ],
});

const {
  data: categoriesData,
  status: categoriesStatus,
  error: categoriesError,
} = await useAsyncData("categories", () => getCategories());

const categoriesLinks = computed(() => {
  return categoriesData.value?.data?.map((item) => {
    return {
      label: item.name,
      items: item.items,
      slug: item.url_slug,
    };
  });
});
</script>

<template>
  <NuxtLayout name="product" :links="links">
    <UCard
      :ui="{
        divide: '',
        shadow: 'shadow-2xl',
        header: {
          padding: '',
        },
        body: {
          padding: 'py-2 px-0',
        },
      }"
    >
      <template #header>
        <ProductCardHeader :label="$t('general.product_category')" />
      </template>

      <!-- Mobile View -->
      <div class="flex md:hidden">
        <UAccordion variant="ghost" size="md" :items="categoriesLinks">
          <template #default="{ item, open }">
            <UButton
              color="gray"
              variant="ghost"
              class="border-b border-gray-100 hover:text-primary dark:text-primary dark:border-gray-700"
              :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
            >
              <span class="truncate">{{ item.label }}</span>

              <template #trailing v-if="item.items.length > 0">
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 ms-auto transform transition-transform duration-200"
                  :class="[open && 'rotate-90']"
                />
              </template>
            </UButton>
          </template>

          <!-- Accordion Item -->
          <template #item="{ item }">
            <NuxtLink
              v-for="childItem in item.items"
              :to="toProductCategory(item.slug, childItem.url_slug)"
            >
              <div
                class="text-gray-900 pl-6 py-2 hover:bg-gray-100 hover:text-primary dark:text-primary-500 dark:hover:bg-zinc-800"
              >
                {{ childItem.name }}
              </div>
            </NuxtLink>
          </template>
        </UAccordion>
      </div>

      <!-- Tablet View -->
      <div
        v-for="item in categoriesData?.data"
        class="hidden md:flex md:flex-col"
      >
        <NuxtLink :to="'/category/' +item.url_slug!">
          <h5
            class="font-semibold text-slate-800 text-lg py-2 hover:text-primary dark:text-primary"
          >
            {{ item.name }}
          </h5>
        </NuxtLink>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
          <div v-for="child in item.items">
            <NuxtLink :to="toProductCategory(item.url_slug!, child.url_slug!)">
              <p
                class="cursor-pointer text-slate-600 hover:text-primary dark:text-primary-100"
              >
                {{ child?.name }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </UCard>
  </NuxtLayout>
</template>
