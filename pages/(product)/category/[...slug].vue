<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { t } = useI18n();

const route = useRoute();
const slug = route.params.slug as [];

const { getFirstElement, getLastElement, removeEmptyElements } = useHelper();

const { getCategory } = useCategory();

const realSlug = removeEmptyElements(slug);
const firstSlug = getFirstElement(slug);
const lastSlug = getLastElement(slug);

const isCategoryProduct = computed(
  () => realSlug.length >= 1 && realSlug.length <= 1
);

const isProduct = computed(() => realSlug.length >= 2 && realSlug.length <= 2);

const {
  data: categoryData,
  status: categoryStatus,
  error: categoryError,
} = await useAsyncData("category_by_parent_slug", () =>
  getCategory(firstSlug!)
);

const categoryName = categoryData?.value?.data?.name;

const subCategoryName = getFirstElement(
  categoryData.value?.data?.items?.filter(
    (value) => value.url_slug == lastSlug
  ) || []
)?.name;

const links = useBreadcrumbItems({
  overrides: [
    undefined,
    {
      label: t("general.product_category"),
    },
    {
      label: categoryName ?? "404",
    },
    {
      label: subCategoryName ?? "404",
    },
  ],
});
</script>

<template>
  <NuxtLayout name="product" :links="links">
    <div v-if="isCategoryProduct">
      <ProductCategoryDerived
        v-if="categoryStatus === 'success'"
        :category="categoryData?.data"
      />
    </div>

    <div v-if="isProduct">
      <ProductCategoryMenu
        :category-slug="firstSlug!"
        :product-category-slug="lastSlug ?? ''"
      />
    </div>
  </NuxtLayout>
</template>
