<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { t } = useI18n();

const { getFirstElement, toCapitalCase, removeEmptyElements, getLastElement } =
  useHelper();

const route = useRoute();
const slug = removeEmptyElements(route.params.slug as string[]);

const { getProductDetail } = useProduct();

const firstSlug = getFirstElement(slug);

const lastSlug = getLastElement(slug);

if (slug.length <= 1) {
  navigateTo({
    path: `/category/${slug[0]}`,
    force: true,
  });
}
if (slug.length <= 2) {
  navigateTo({
    path: `/category/${slug[0]}/${slug[1]}`,
  });
}

const breadcrumbItemOverides = computed(() => {
  const items: any[] = [undefined];

  items.push({
    label: t("general.product_category"),
    to: "/category",
  });

  slug.map((url_slug, index) => {
    let goToPage = "";
    switch (index) {
      case 0:
        goToPage = `/category/${firstSlug}`;
        break;
      case 1:
        goToPage = `/category/${firstSlug}/${slug[1]}`;
        break;
      case 2:
        goToPage = `/category/${firstSlug}/${slug[2]}`;
        break;
    }
    items.push({
      label: toCapitalCase(url_slug),
      to: goToPage,
    });
  });

  return items;
});

const links = useBreadcrumbItems({
  overrides: breadcrumbItemOverides.value,
});

const {
  data: productData,
  status: productStatus,
  error: productError,
} = await useAsyncData("product_detail", () =>
  getProductDetail(lastSlug ?? "")
);

// Sample Image
const images = [
  "https://mobile-dev.msulogistics.co.id/view-attachment/108343",

  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3",
  "https://picsum.photos/1920/1080?random=4",
  "https://picsum.photos/1920/1080?random=5",
  "https://picsum.photos/1920/1080?random=6",
  "https://picsum.photos/1920/1080?random=7",
];

const productAvailable = computed(() => {
  const item = productData?.value?.data;
  return (item?.qty_available ?? 0) > 0 ? true : false;
});

const productStock = computed(() => {
  const item = productData?.value?.data;
  return item?.type === "product" ? true : false;
});
const productNonStock = computed(() => {
  const item = productData?.value?.data;
  return item?.type === "consu" || item?.type === "service" ? true : false;
});

// QTY
const qtyProduct = ref<number>(
  productAvailable.value || productNonStock ? 1 : 0
);

const subTotal = computed(() => {
  const amount = productData?.value?.data?.standard_price ?? 0;
  return currencyFormat(qtyProduct.value * amount);
});

// Cart
const { addToCart } = useCart();

// Device
const { isMobile, isTablet, isDesktop } = useHelper();
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Content -->
    <NuxtLayout name="product" :links="links" padded bgCanvas>
      <template v-if="productStatus == 'success' && productData?.data != null">
        <div class="flex flex-col gap-3 lg:gap-0">
          <!-- Container -->
          <div class="bg-white dark:bg-black">
            <UContainer class="py-4">
              <div class="flex flex-col gap-4 lg:gap-6 xl:gap-8 sm:flex-row">
                <div class="sm:w-1/2 lg:w-1/4">
                  <ProductImageCarousel
                    :images="productData?.data?.attachment_ids"
                  />
                </div>

                <div class="sm:w-1/2 lg:w-2/4 md:flex md:flex-col md:gap-3">
                  <div class="md:flex md:flex-col-reverse">
                    <div class="font-bold text-2xl lg:text-3xl">
                      {{
                        currencyFormat(productData?.data?.standard_price ?? 0)
                      }}
                    </div>
                    <div class="text-base text-gray-600 dark:text-gray-300">
                      {{ productData?.data?.name }}
                    </div>
                  </div>

                  <!--  -->
                  <template v-if="isTablet || isDesktop">
                    <ProductDetailSpec :item="productData?.data" />
                  </template>
                </div>

                <div v-if="isDesktop" class="lg:w-1/4">
                  <CartAddButton :product="productData?.data" />
                </div>
              </div>
            </UContainer>
          </div>
          <!-- End Container -->

          <ProductDetailVendor :item="productData?.data" />
          <ProductDetailReview :item="productData?.data" />
          <template v-if="isMobile">
            <ProductDetailSpec :item="productData?.data" />
          </template>
        </div>
      </template>
    </NuxtLayout>

    <!-- Fixed Bottom Content -->
    <div
      class="fixed bottom-0 w-full bg-white dark:bg-gray-800 shadow-[0_35px_40px_10px_rgba(0,0,0,0.3)] py-4"
      v-if="isMobile || isTablet"
    >
      <CartAddButton :product="productData?.data" />
    </div>
  </div>
</template>
