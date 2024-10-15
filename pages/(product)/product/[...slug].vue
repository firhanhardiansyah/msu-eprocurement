<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { t } = useI18n();

const {
  getFirstElement,
  slugOverride,
  toCapitalCase,
  removeEmptyElements,
  getLastElement,
} = useHelper();

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
      label: toCapitalCase(slugOverride(url_slug)),
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
const items = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3",
  "https://picsum.photos/1920/1080?random=4",
  "https://picsum.photos/1920/1080?random=5",
  "https://picsum.photos/1920/1080?random=6",
  "https://picsum.photos/1920/1080?random=7",
  "https://picsum.photos/1920/1080?random=8",
];

// Image
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

// Tabs
const tabs = [
  {
    slot: "detail",
    label: "Detail",
  },
  {
    slot: "attachments",
    label: "Lampiran",
  },
  {
    slot: "reviews",
    label: "Ulasan",
  },
  {
    slot: "discussions",
    label: "Diskusi",
  },
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
</script>

<template>
  <NuxtLayout name="product" :links="links">
    <template v-if="productStatus == 'success' && productData?.data != null">
      <div class="flex flex-col gap-2 md:flex-row md:gap-5">
        <!-- Carousel -->
        <div class="w-full md:w-1/2 lg:w-1/3">
          <UCarousel
            ref="carouselRef"
            v-slot="{ item }"
            :items="items"
            :ui="{ item: 'basis-full' }"
            class="rounded-lg overflow-hidden mb-2"
          >
            <img
              :src="item"
              class="w-full h-56 cursor-pointer"
              draggable="false"
            />
          </UCarousel>
          <UCarousel
            v-slot="{ item, index }"
            :items="items"
            :ui="{ item: 'snap-start' }"
          >
            <div class="relative">
              <div
                :class="
                  carouselRef?.page == index + 1 &&
                  'absolute w-16 h-16 rounded-lg bg-black opacity-20'
                "
              />

              <img
                :src="item"
                class="w-16 h-16 rounded-lg cursor-pointer mr-2"
                :class="[
                  carouselRef?.page == index + 1 && 'border-2 border-primary',
                ]"
                @click="onChangeImgProduct(index)"
              />
            </div>
          </UCarousel>
        </div>

        <!-- Product Detail -->
        <div class="w-full md:w-1/2 lg:w-2/3">
          <div class="lg:flex lg:flex-row">
            <div class="flex flex-col gap-2 mb-2 lg:mb-0 lg:w-2/3">
              <div>
                <div class="text-xl">{{ productData?.data?.name }}</div>
                <div class="text-base text-slate-500 dark:text-zinc-400">
                  {{ productData?.data?.default_code }}
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="seller in productData?.data?.seller_ids"
                  color="primary"
                  variant="outline"
                >
                  {{ seller.partner_id?.name }}
                </UBadge>
              </div>

              <div class="font-bold text-xl md:text-2xl lg:text-3xl">
                {{ currencyFormat(productData?.data?.standard_price ?? 0) }}
              </div>
            </div>

            <!-- QTY -->
            <div
              class="border-y-[1px] md:border-b-0 border-gray-200 dark:border-zinc-800 py-4 lg:w-1/3 lg:border-[1px] lg:p-4 lg:rounded-lg"
            >
              <div class="flex flex-col gap-2">
                <template v-if="productAvailable && productStock">
                  <div
                    class="flex items-center gap-4 lg:flex-row xl:items-end lg:mb-0 lg:justify-between lg:gap-3"
                  >
                    <ProductInputQty
                      v-model:qty="qtyProduct"
                      :stock-available="productData?.data?.qty_available ?? 0"
                      class="lg:w-24"
                    />
                    <div class="text-sm">
                      <span class="text-slate-600 dark:text-zinc-400">
                        Stok :
                      </span>
                      <span>{{ productData?.data?.qty_available }}</span>
                    </div>
                  </div>
                </template>

                <template v-if="productAvailable || productNonStock">
                  <div
                    class="flex flex-row justify-between items-end lg:flex-col lg:items-start xl:flex-row xl:items-end"
                  >
                    <span class="text-sm">Sub Total</span>
                    <span class="font-bold text-xl">{{ subTotal }}</span>
                  </div>
                  <UButton
                    label="+ Keranjang"
                    size="lg"
                    block
                    @click="addToCart(productData?.data, qtyProduct)"
                  />
                </template>

                <!-- Product Not Available -->
                <template v-if="!productAvailable && !productNonStock">
                  <div class="text-sm">
                    <span class="text-slate-600 dark:text-zinc-400">
                      Stok tidak tersedia
                    </span>
                  </div>
                  <UButton label="+ Keranjang" block disabled />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <UTabs :items="tabs" :default-index="0">
        <template #detail="{ item }">
          <ProductTabDetail :item="productData?.data" />
        </template>
        <template #attachments="{ item }">
          {{ item }}
        </template>
        <template #reviews="{ item }">
          {{ item }}
        </template>
        <template #discussions="{ item }">
          {{ item }}
        </template>
      </UTabs>
    </template>
  </NuxtLayout>
</template>
