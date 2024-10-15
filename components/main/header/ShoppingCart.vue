<script setup lang="ts">
const isOpen = ref(false);

const { totalItems, sortedCartFinally, totalPrice, removeFromCart, addToCart } =
  useCart();

const addToCartTest = (value: any) => {
  console.log("addToCartTest");
  console.log(value);
};
</script>

<template>
  <div>
    <UChip :text="totalItems" size="2xl" :show="totalItems > 0">
      <UButton
        icon="i-heroicons-shopping-cart"
        color="gray"
        @click="isOpen = true"
      />
    </UChip>

    <USlideover v-model="isOpen">
      <template #default>
        <div class="flex flex-col h-screen">
          <!-- Header -->
          <div class="p-4 border-b-[1px] dark:border-zinc-800">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold dark:text-primary">
                Shopping Cart
                <span v-if="sortedCartFinally.length > 0"
                  >({{ totalItems }})</span
                >
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
            :class="[sortedCartFinally.length == 0 && 'bg-white']"
          >
            <div v-if="sortedCartFinally.length > 0">
              <div
                v-for="categoryItem in sortedCartFinally"
                :key="categoryItem.category"
                class="bg-white dark:bg-neutral-900 mb-3"
              >
                <UCheckbox class="px-4 py-3">
                  <template #label>
                    <span class="font-semibold cursor-pointer">
                      {{ categoryItem.category }}
                    </span>
                  </template>
                </UCheckbox>
                <div
                  v-for="subcategoryItem in categoryItem.subCategories"
                  :key="subcategoryItem.subCategory"
                >
                  <div
                    v-for="product in subcategoryItem.products"
                    :key="product.id"
                    class="px-4"
                  >
                    <div class="py-2 flex justify-between gap-2">
                      <div class="flex gap-3">
                        <!-- Select Product -->
                        <UCheckbox />

                        <!-- Image -->
                        <div class="bg-gray-500 h-12 w-12 rounded-md" />

                        <!-- Product Description -->
                        <div class="flex-1">
                          <p
                            class="font-bold text-xs text-primary-500"
                            v-if="(product.qty_available ?? 0) < 4"
                          >
                            <span> Sisa </span>
                            {{ product.qty_available }}
                          </p>
                          <p
                            class="text-sm text-gray-500 text-ellipsis overflow-hidden max-w-52 dark:text-zinc-200"
                          >
                            {{ product.name }}
                          </p>
                        </div>
                      </div>

                      <div class="flex flex-col items-end justify-between">
                        <!-- Price -->
                        <div class="font-semibold text-sm flex gap-1 mb-2">
                          <p>
                            {{ product.quantity }}
                          </p>
                          <p>x</p>
                          <p>
                            {{ currencyFormat(product.standard_price ?? 0) }}
                          </p>
                        </div>

                        <!-- Quantity -->
                        <ProductInputQty
                          :stock-available="product.qty_available || 0"
                          :qty="product.quantity"
                          :reduce-trash="true"
                          @add:item="(value) => addToCart(product, value)"
                          @reduce:item="(value) => addToCart(product, value)"
                          @remote:item="
                            removeFromCart(
                              product.id!,
                              subcategoryItem.subCategory,
                              categoryItem.category
                            )
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
            class="p-4 border-t-[1px] dark:border-zinc-800"
            v-if="sortedCartFinally.length > 0"
          >
            <div class="mb-4 flex justify-between items-end">
              <p class="text-base">Total</p>
              <p class="text-base font-semibold">
                {{ currencyFormat(totalPrice) }}
              </p>
            </div>
            <UButton label="Checkout" size="lg" block />
          </div>
        </div>
      </template>
    </USlideover>
  </div>
</template>
