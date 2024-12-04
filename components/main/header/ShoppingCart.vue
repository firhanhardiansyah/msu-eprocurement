<script setup lang="ts">
import { CartSlideoverItems, ModalSignInForm } from "#components";

// Auth
const { isAuthenticated } = useAuth();

const { totalItemsInCart } = useCartNew();

const slideover = useSlideover();
const modal = useModal();

const openSlideover = () => {
  if (isAuthenticated.value) {
    slideover.open(CartSlideoverItems, {
      onClose: slideover.close,
    });
    return;
  }

  modal.open(ModalSignInForm, {
    onValidation: (value: boolean) => (value ? modal.close() : null),
  });
};
</script>

<template>
  <LazyClientOnly>
    <UTooltip :text="$t('general.shopping_cart')" :popper="{ arrow: true }">
      <UChip :text="totalItemsInCart" size="2xl" :show="totalItemsInCart > 0">
        <UButton
          icon="i-heroicons-shopping-cart"
          color="gray"
          @click="openSlideover"
        />
      </UChip>
    </UTooltip>

    <template #fallback>
      <UButton icon="i-heroicons-shopping-cart" color="gray" disabled />
    </template>
  </LazyClientOnly>
</template>
