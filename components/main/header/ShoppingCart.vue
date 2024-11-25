<script setup lang="ts">
const isOpen = ref(false);

const { isLastIndex } = useHelper();

const {
  totalItems,
  sortedCart,
  totalPrice,
  removeFromCart,
  addToCart,
  toggleCategory,
  toggleSubCategory,
  toggleProduct,
  checkOutProduct,
} = useCart();

const checkOut = () => {
  const result = checkOutProduct();

  if (result) {
    isOpen.value = false;
    navigateTo("/cart/shipment");
  }
};
</script>

<template>
  <div>
    <UTooltip :text="$t('general.shopping_cart')" :popper="{ arrow: true }">
      <UChip :text="totalItems" size="2xl" :show="totalItems > 0">
        <UButton
          icon="i-heroicons-shopping-cart"
          color="gray"
          @click="isOpen = true"
        />
      </UChip>
    </UTooltip>

    <USlideover v-model="isOpen">
      <template #default>
        <div class="flex flex-col h-screen">
          <!-- Header -->
          <div class="p-4 border-b dark:border-zinc-800">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold dark:text-primary">
                {{ $t("general.shopping_cart") }}
                <span v-if="sortedCart.length > 0">({{ totalItems }})</span>
              </h3>
              <UButton
                color="gray"
                icon="i-heroicons-x-mark-20-solid"
                class="dark:text-primary"
                @click="isOpen = false"
              />
            </div>
          </div>

          <main
            class="flex-grow overflow-y-auto bg-gray-100 dark:bg-zinc-900"
            :class="[sortedCart.length == 0 && 'bg-white']"
          >
            <template v-if="sortedCart.length > 0">
              <div
                v-for="(categoryItem, categoryIndex) in sortedCart"
                class="bg-white dark:bg-neutral-900 px-4 py-3 mb-4"
              >
                <!-- Category Title -->
                <div class="">
                  <p class="text-base font-bold">{{ categoryItem.category }}</p>
                </div>
                <!-- End Category Title -->

                <!-- Sub Category -->
                <div
                  v-for="(
                    subCategoryItem, subCategoryIndex
                  ) in categoryItem.subCategories"
                  class="flex flex-col gap-3"
                >
                  <UCheckbox
                    :ui="{
                      label: 'font-semibold cursor-pointer',
                    }"
                    class="pt-3"
                    :label="subCategoryItem.subCategory"
                    v-model="subCategoryItem.checked"
                    @update:model-value="
                      toggleSubCategory(categoryItem, subCategoryItem, $event)
                    "
                  />

                  <div
                    v-for="product in subCategoryItem.products"
                    :key="product.id"
                  >
                    <div class="flex justify-between gap-3">
                      <div class="flex gap-3">
                        <!-- Select Product -->
                        <UCheckbox
                          v-model="product.checked"
                          @update:model-value="toggleProduct(product, $event)"
                        />

                        <!-- Image -->
                        <div class="bg-gray-500 h-12 w-12 rounded-md" />
                      </div>

                      <!-- Product Description -->
                      <div class="w-full">
                        <p
                          class="font-bold text-xs text-primary-500"
                          v-if="
                            (product.qty_available ?? 0) < 4 &&
                            product.type === ProductType.storableProduct
                          "
                        >
                          <span>
                            {{ $t("general.shopping_remainder") }}
                          </span>
                          {{ product.qty_available }}
                        </p>
                        <p
                          class="text-sm line-clamp-2 text-gray-500 text-ellipsis overflow-hidden dark:text-zinc-200"
                        >
                          {{ product.name }}
                        </p>
                        <!-- Price -->
                        <div class="flex justify-between mt-2">
                          <p class="font-medium text-sm">
                            {{ currencyFormat(product.standard_price ?? 0) }}
                          </p>

                          <ProductInputQty
                            :stock-available="product.qty_available || 0"
                            :qty="product.quantity"
                            :reduce-trash="true"
                            @add:item="(value) => addToCart(product, value)"
                            @reduce:item="(value) => addToCart(product, value)"
                            @remove:item="
                              removeFromCart(
                                product.id!,
                                subCategoryItem.subCategory,
                                categoryItem.category
                              )
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <UDivider
                    v-if="
                      !isLastIndex(categoryItem.subCategories, subCategoryIndex)
                    "
                  />
                </div>
              </div>
            </template>

            <template v-else>
              <div class="mx-4 mt-4 md:mt-10">
                <article class="prose prose-slate dark:prose-invert">
                  <NuxtImg
                    src="/images/illustration/empty_cart.svg"
                    class="w-64 md:w-72 dark:bg-primary-400 dark:p-4 dark:rounded-3xl"
                  />
                  <h1>Keranjang belanjamu masih kosong.</h1>
                  <p>
                    Yuk, isi keranjangmu dengan berbagai produk yang tersedia
                  </p>
                  <UButton
                    label="Mulai Belanja"
                    color="black"
                    size="lg"
                    :ui="{
                      color: {
                        black: {
                          solid: 'bg-black dark:bg-primary',
                        },
                      },
                    }"
                    @click="navigateTo('/category')"
                  />
                </article>
              </div>
            </template>
          </main>

          <div
            class="p-4 border-t dark:border-zinc-800"
            v-if="sortedCart.length > 0"
          >
            <div class="flex flex-col gap-3">
              <h2 class="text-base font-semibold">Ringkasan Belanja</h2>
              <div>
                <div class="mb-4 flex justify-between items-end">
                  <p class="text-base">Total</p>
                  <p class="text-base font-semibold">
                    {{ currencyFormat(totalPrice) }}
                  </p>
                </div>
                <UButton label="Checkout" size="lg" block @click="checkOut()" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </USlideover>
  </div>
</template>
