<script setup lang="ts">
const isOpen = ref<boolean>(false);

const { cart, sortedCart, totalPrice, totalItems } = useCart();

const checkboxTest = ref(false);
const checkboxProductTest = ref(false);

const onSelectCategories = (value: any) => {
  checkboxTest.value = !checkboxTest.value;
};
const onSelectProduct = (value: any) => {
  checkboxProductTest.value = !checkboxProductTest.value;
};
</script>

<template>
  <UChip :text="totalItems" size="2xl" :show="cart.length > 0">
    <UButton
      icon="i-heroicons-shopping-cart"
      color="gray"
      @click="isOpen = true"
    />
  </UChip>

  <USlideover v-model="isOpen" size="lg">
    <template #default>
      <!-- Full height slideover with scrollable content -->
      <div
        class="fixed top-0 bottom-0 right-0 z-50 flex flex-col w-full max-w-md overflow-x-hidden bg-white"
      >
        <!-- Header -->
        <div class="p-4 border-b-[1px]">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold">
              Shopping Cart <span>({{ totalItems }})</span>
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              :padded="false"
              @click="isOpen = false"
            />
          </div>
        </div>

        <!-- Content -->
        <div
          class="flex flex-col flex-1 gap-4 overflow-y-scroll bg-gray-100"
          :class="[!sortedCart && 'px-4 py-8 bg-white']"
        >
          <div v-if="sortedCart">
            <div
              v-for="categoryItem in cart"
              :key="categoryItem.category"
              class="bg-white mb-2"
            >
              <UCheckbox
                :model-value="checkboxTest"
                name="notifications"
                v-on:change="onSelectCategories(categoryItem.category)"
                class="px-4 py-3"
              >
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
                >
                  <UCheckbox
                    :model-value="checkboxProductTest"
                    :ui="{
                      wrapper: 'px-4 py-3 ',
                      inner:
                        'flex flex-col w-full border-b-[1px] border-gray-100',
                    }"
                  >
                    <template #label>
                      <div class="flex justify-between gap-2 cursor-pointer">
                        <!-- Image -->
                        <div class="bg-gray-500 h-12 w-12 rounded-md" />

                        <!-- Content -->
                        <div class="flex-1">
                          <div class="flex justify-between">
                            <div>
                              <p
                                class="font-bold text-xs text-primary-500"
                                v-if="(product.qty_available ?? 0) < 4"
                              >
                                <span> Sisa </span>
                                {{ product.qty_available }}
                              </p>
                              <p class="text-sm text-gray-500">
                                {{ product.name }}
                              </p>
                            </div>
                            <div
                              class="flex flex-col justify-start gap-2 mb-2 pl-2 items-end"
                            >
                              <div class="font-semibold text-sm flex gap-1">
                                <p>
                                  {{ product.quantity }}
                                </p>
                                <p>x</p>
                                <p>
                                  {{
                                    currencyFormat(product.standard_price ?? 0)
                                  }}
                                </p>
                              </div>
                              <ProductInputQty
                                :stock-available="product.qty_available || 0"
                                :qty="product.quantity"
                                :reduce-trash="true"
                              />
                            </div>
                          </div>
                          <!-- <div class="flex justify-end py-2">
                            <ProductInputQty
                              :stock-available="product.qty_available || 0"
                              :qty="product.quantity"
                            />
                          </div> -->
                        </div>
                      </div>
                    </template>
                  </UCheckbox>
                </div>
              </div>
            </div>
          </div>

          <template v-else>
            <article class="prose prose-slate">
              <NuxtImg src="/images/illustration/empty_cart.svg" class="w-72" />
              <h1>Keranjang belanjamu masih kosong.</h1>
              <p>Yuk, isi keranjangmu dengan berbagai produk yang tersedia</p>
              <UButton label="Mulai Belanja" color="black" size="lg" />
            </article>
          </template>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t-[1px]" v-if="sortedCart">
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
</template>
