<script setup lang="ts">
const emits = defineEmits(["close"]);

const closeSlideover = () => {
  emits("close");
};

const {
  totalItemsInCart,
  cartItems,
  toggleProduct,
  toggleSubCategory,
  sortedCart,
  onChangeProductQty,
  onDeleteProductItem,
  totalPrice,
  onCheckOutProduct,
} = useCartNew();
const { isLastIndex, getFirstElement } = useHelper();

const redirectProduct = (slugs: (string | undefined)[] = []): void => {
  const slugUrl = slugs.join("/");

  navigateTo(`/product/${slugUrl}`);
  emits("close");
};

const onCheckOut = (): void => {
  const feedback: boolean = onCheckOutProduct();

  if (feedback) {
    emits("close");
    navigateTo("/cart/shipment");
    return;
  }
};
</script>

<template>
  <USlideover>
    <template #default>
      <div class="flex flex-col h-screen">
        <!-- Header -->
        <div class="p-4 border-b dark:border-zinc-800">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold dark:text-primary">
              {{ $t("general.shopping_cart") }}
            </h3>
            <UButton
              color="gray"
              icon="i-heroicons-x-mark-20-solid"
              class="dark:text-primary"
              @click="closeSlideover"
            />
          </div>
        </div>

        <main
          class="flex-grow overflow-y-auto bg-gray-100 dark:bg-zinc-900"
          :class="[cartItems.length == 0 && 'bg-white']"
        >
          <template v-if="cartItems.length > 0">
            <div
              v-for="category in sortedCart(cartItems)"
              class="bg-white dark:bg-neutral-900 p-4 mb-3 flex flex-col gap-3"
            >
              <!-- Category Title -->
              <p class="text-base font-bold">{{ category.category }}</p>
              <!-- End Category Title -->
              <div
                v-for="(
                  subCategory, subCategoriesIndex
                ) in category.subCategories"
                class="flex flex-col gap-4"
              >
                <UCheckbox
                  :ui="{
                    label: 'font-semibold cursor-pointer',
                  }"
                  :label="subCategory.subCategory"
                  v-model="subCategory.checked"
                  @update:model-value="toggleSubCategory(subCategory, $event)"
                />

                <div v-for="product in subCategory.products">
                  <div class="flex justify-between gap-3">
                    <div class="flex gap-3">
                      <UCheckbox
                        v-model="product.checked"
                        @update:model-value="toggleProduct(product, $event)"
                      />

                      <!-- Image -->
                      <div
                        @click="redirectProduct(product.slugs)"
                        class="cursor-pointer"
                      >
                        <template
                          v-if="
                            getFirstElement(product?.product?.attachment_ids)
                              ?.attachment_url
                          "
                        >
                          <div class="h-16 w-16 rounded-lg">
                            <img
                              :src="product?.product?.attachment_ids![0]?.attachment_url"
                              alt=""
                              srcset=""
                              class="h-16 w-16 rounded-lg shadow-sm"
                            />
                          </div>
                        </template>
                        <template v-else>
                          <div
                            class="h-16 w-16 bg-amber-100 rounded-lg flex items-center justify-center shadow-sm"
                          >
                            <Icon
                              name="i-heroicons-photo-solid"
                              size="24"
                              class="text-amber-500"
                            />
                          </div>
                        </template>
                      </div>
                      <!-- End Image -->
                    </div>

                    <div class="flex-1">
                      <div class="flex justify-between text-sm">
                        <div>
                          <p
                            class="line-clamp-1 text-gray-500 text-ellipsis overflow-hidden dark:text-zinc-200 max-w-56 cursor-pointer"
                            @click="redirectProduct(product.slugs)"
                          >
                            {{ product.product?.name }}
                          </p>
                        </div>

                        <div class="flex flex-col gap-2 items-end">
                          <div class="flex gap-1 font-bold">
                            <p>{{ product?.qty }}</p>
                            <p>x</p>
                            <p>{{ currencyFormat(product.unit_price ?? 0) }}</p>
                          </div>

                          <ProductInputQty
                            :stock-available="999"
                            :qty="product.qty"
                            :reduce-trash="true"
                            @add:item="
                              (value) => onChangeProductQty(product, value)
                            "
                            @reduce:item="
                              (value) => onChangeProductQty(product, value)
                            "
                            @remove:item="onDeleteProductItem(product)"
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <UDivider
                  class="py-3"
                  v-if="
                    !isLastIndex(category.subCategories, subCategoriesIndex)
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
                <p>Yuk, isi keranjangmu dengan berbagai produk yang tersedia</p>
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
          v-if="totalItemsInCart > 0"
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
              <UButton size="lg" block @click="onCheckOut">
                <p>
                  Check Out
                  <span v-if="totalItemsInCart > 0">
                    ({{ totalItemsInCart }})
                  </span>
                </p>
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>
