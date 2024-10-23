<script setup lang="ts">
const props = defineProps<{
  categorySlug: string;
  productCategorySlug: string;
}>();

const { getProductByCategory, changeProductType } = useProduct();

const productCurrentPage = ref(1);

const limit = 12;
const offset = computed(() => (productCurrentPage.value - 1) * 12);

const {
  data: productsData,
  status: productsStatus,
  error: productsError,
} = await useAsyncData(
  () => getProductByCategory(props.productCategorySlug, offset.value, limit),
  {
    watch: [productCurrentPage],
  }
);

// Open Slide Over Filter Button
const isOpenFilterSlideover = ref(false);

// Go To Detail
const toProductDetail = (productSlug?: string) => {
  return navigateTo({
    path: `/product/${props.categorySlug}/${props.productCategorySlug}/${productSlug}`,
  });
};
</script>

<template>
  <div class="flex gap-3">
    <div class="hidden lg:flex lg:w-3/12">
      <ProductCategoryFilter />
    </div>
    <div class="w-full flex flex-col gap-3 lg:w-9/12">
      <!--  -->
      <div
        class="flex flex-col gap-2 md:flex-row md:justify-between md:items-center"
      >
        <div class="flex flex-row">
          <div
            class="text-sm md:text-base text-slate-600 flex gap-1 dark:text-primary"
          >
            <span class="text-slate-900 font-semibold dark:text-primary">
              {{ productsData?.data?.total_data }}
            </span>
            <span>{{ $t("general.product_found") }}</span>
          </div>
        </div>
        <div class="flex justify-between items-center md:gap-2">
          <UButton variant="outline" label="Short By: Price High to Low" />
          <UButton
            class="flex lg:hidden"
            variant="outline"
            icon="i-heroicons-funnel"
            label="Filters"
            @click="isOpenFilterSlideover = !isOpenFilterSlideover"
          />

          <USlideover v-model="isOpenFilterSlideover" prevent-close>
            <UCard
              class="flex flex-col flex-1"
              :ui="{
                body: { base: 'flex-1' },
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
              }"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    Slideover
                  </h3>
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1"
                    @click="isOpenFilterSlideover = false"
                  />
                </div>
              </template>
            </UCard>
          </USlideover>
        </div>
      </div>

      <!-- Products by Category -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <UiProductCard
          v-for="(product, index) in productsData?.data?.product_list"
          :title="product?.name"
          :subtitle="changeProductType(product?.type)"
          :price="product?.standard_price"
          @to="toProductDetail(product?.url_slug)"
        />
      </div>

      <div class="flex justify-center">
        <UPagination
          v-model="productCurrentPage"
          :page-count="10"
          :total="productsData?.data?.total_data ?? 100"
        />
      </div>
    </div>
  </div>
</template>
