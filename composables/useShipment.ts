export const useShipment = () => {
  const { cartShipment } = useCart();

  return { cartShipment };
};
