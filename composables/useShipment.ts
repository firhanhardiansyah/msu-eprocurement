export const useShipment = () => {
  const { cartShipment } = useCart();

  const ppn = useState<number>(() => 0);

  const totalShoppingProducts = computed(() => {
    let total = 0;
    cartShipment.value?.products.forEach((product) => {
      if (product.checked) {
        total += 1 * product.quantity;
      }
    });
    return total;
  });

  const totalShoppingPrice = computed(() => {
    let total = 0;
    cartShipment.value?.products.forEach((product) => {
      if (product.checked) {
        total += (product.standard_price ?? 0) * product.quantity;
      }
    });
    return total;
  });

  const totalPriceOfAllPurchases = computed(() => {
    return totalShoppingPrice.value + totalShoppingPrice.value * ppn.value;
  });

  return {
    cartShipment,
    totalShoppingProducts,
    totalShoppingPrice,
    totalPriceOfAllPurchases,
  };
};
