<script setup lang="ts">
import { MovingType } from "~/composables/useProduct";

const route = useRoute();
const moveType = route.params.type;

const { getCompanies } = useCompany();
const { getProductByMovingCategory, changeProductType } = useProduct();

const { isMobile, isTablet } = useHelper();

const moving = ref();

if (moveType === "fast-moving") {
  moving.value = MovingType.fastMove;
}

if (moveType === "slow-moving") {
  moving.value = MovingType.slowMove;
}

if (moveType === "dead-stock") {
  moving.value = MovingType.deadStock;
}

const {
  data: companiesData,
  error: companiesError,
  status: companiesStatus,
} = await useAsyncData(() => getCompanies());

const companySelected = ref<string>("-");

// Product
const currentPage = ref(1);
const limit = ref(20);
const offset = computed(() => (currentPage.value - 1) * limit.value);

const {
  data: productsData,
  error: productsError,
  status: productsStatus,
} = useAsyncData(
  () =>
    getProductByMovingCategory(
      moving.value,
      companySelected.value,
      offset.value,
      limit.value
    ),
  {
    watch: [companySelected, currentPage, limit],
  }
);

onMounted(() => {
  const filter = companiesData?.value?.data?.filter(
    (data) => data.checked === true
  );

  if (filter !== null) {
    companySelected.value = filter![0].slug ?? "";
  }
});

watch(isTablet, () => {
  limit.value = isTablet.value ? 21 : 20;
});

// Option moving type
const movingOptions = [
  {
    slug: "fast-moving",
    name: "Fast Moving",
  },
  {
    slug: "slow-moving",
    name: "Slow Moving",
  },
  {
    slug: "dead-stock",
    name: "Dead Stock",
  },
];

const movingSelected = ref(moveType);

watch(movingSelected, () => {
  return navigateTo(`/moving/${movingSelected.value}`);
});

// Filter Mov
const isOpenFilter = ref(false);
</script>

<template>
  <div class="py-4 flex flex-col gap-3">
    <MovingHeader />
    <template v-if="companiesStatus === 'success'">
      <div class="flex justify-end sm:justify-between items-center gap-3">
        <p class="text-base hidden sm:flex">
          <span class="font-bold">
            {{ productsData?.data?.total_data }}
          </span>
          <span class="ml-1">{{ $t("general.product") }}</span>
        </p>

        <div class="flex justify-end gap-2 w-full sm:w-auto">
          <USelectMenu
            placeholder="Select Company"
            :options="companiesData?.data"
            v-model="companySelected"
            value-attribute="slug"
            option-attribute="name"
            class="w-full md:w-auto"
          />

          <UButton
            icon="i-heroicons-adjustments-horizontal"
            color="gray"
            square
            @click="isOpenFilter = true"
          />

          <USlideover v-model="isOpenFilter">
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
                    Filter
                  </h3>
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1"
                    @click="isOpenFilter = false"
                  />
                </div>
              </template>

              <div>
                <UFormGroup label="Moving Type">
                  <USelectMenu
                    placeholder="Select Moving Type"
                    v-model="movingSelected"
                    :options="movingOptions"
                    value-attribute="slug"
                    option-attribute="name"
                  />
                </UFormGroup>
              </div>
            </UCard>
          </USlideover>
        </div>
      </div>
    </template>

    <!-- ? Chore  -->
    <!-- ? navigasi ke halaman detail produk masih menunggu penambahan slug category & slug sub category dari RESTapi -->
    <template
      v-if="
        productsStatus === 'success' && productsData?.data?.total_data !== 0
      "
    >
      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
      >
        <UiProductCard
          v-for="product in productsData?.data?.product_list"
          :title="product?.name"
          :subtitle="changeProductType(product?.type)"
          :price="product?.standard_price"
          @to="
            navigateTo(
              `/product/${product?.categ_id?.parent?.url_slug}/${product?.categ_id?.url_slug}/${product?.url_slug}`
            )
          "
        />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center">
        <UPagination
          v-model="currentPage"
          :page-count="10"
          :total="productsData?.data?.total_data ?? 100"
        />
      </div>
    </template>

    <!-- Empty Item -->
    <template
      v-if="
        productsStatus === 'success' && productsData?.data?.total_data === 0
      "
    >
      <div class="flex flex-col items-center justify-center py-10">
        <article
          class="prose dark:prose-invert prose-h2:mb-0 flex flex-col items-center"
        >
          <img
            src="/images/illustration/empty_item.svg"
            alt="No Category"
            class="w-52"
          />
          <h2>Yah, gak ada</h2>
          <p>Tidak ada produk ini.</p>
        </article>
      </div>
    </template>

    <!-- Chore -->
    <template v-if="productsStatus === 'pending'"> </template>
  </div>
</template>
