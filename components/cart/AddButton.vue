<script setup lang="ts">
const props = defineProps<{
  product?: Product;
}>();

// Auth
const { isAuthenticated } = useAuth();

// Device
const { isMobile, isTablet, isDesktop } = useHelper();

const isOpenSlideOver = ref(false);
const isOpenModal = ref(false);

const onOpenNextStep = () => {
  if (isMobile.value || isTablet.value) {
    isOpenSlideOver.value = !isOpenSlideOver.value;
    return;
  }
  if (isDesktop.value) {
    isOpenModal.value = !isOpenModal.value;
    return;
  }
};
</script>

<template>
  <div
    class="px-4 sm:px-6 lg:border lg:rounded-lg lg:dark:border-gray-700 lg:p-4 sticky top-28 z-auto"
  >
    <div class="flex gap-3 items-center justify-between lg:flex-col">
      <div class="hidden sm:flex sm:w-1/2 sm:flex-col md:w-2/3 lg:w-full">
        <p class="text-sm">Subtotal</p>
        <p class="text-xl font-bold">
          {{ currencyFormat(props.product?.standard_price ?? 0) }}
        </p>
      </div>
      <div class="w-full sm:w-1/2 md:w-1/3 lg:w-full">
        <UButton
          icon="i-heroicons-shopping-bag-solid"
          size="lg"
          :block="true"
          @click="onOpenNextStep"
        >
          <p v-if="isMobile || isTablet">Tambahkan ke keranjang</p>
          <p v-else>Keranjang</p>
        </UButton>
      </div>
    </div>
  </div>

  <!-- Mobile or Tablet -->
  <USlideover
    v-if="isMobile || isTablet"
    v-model="isOpenSlideOver"
    side="bottom"
    :ui="{
      base: 'rounded-t-2xl ',
      height: ' max-h-min',
    }"
  >
    <template v-if="isAuthenticated">
      <CartVendorForm :product="product" @close="isOpenSlideOver = false" />
    </template>
    <template v-else>
      <AuthSignInForm
        @validation="
          (value) => {
            if (value) {
              isOpenSlideOver = false;
              return;
            }
          }
        "
      />
    </template>
  </USlideover>

  <!-- Desktop -->
  <UModal v-model="isOpenModal">
    <template v-if="isAuthenticated">
      <CartVendorForm :product="product" @close="isOpenModal = false" />
    </template>
    <template v-else>
      <AuthSignInForm
        @validation="
          (value) => {
            if (value) {
              isOpenModal = false;
              return;
            }
          }
        "
      />
    </template>
  </UModal>
</template>
