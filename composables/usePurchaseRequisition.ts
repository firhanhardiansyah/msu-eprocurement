export const usePurchaseRequisition = () => {
  const { $apiAuthorized } = useNuxtApp();

  const listForm = () =>
    $apiAuthorized<ApiResponseGeneric<PurchaseRequisition>>(`/pr-form`);

  const getVendors = () => {
    const { data, status, error, refresh, clear } = useAsyncData(
      "master_vendor",
      () => listForm()
    );

    const vendors = data?.value?.data?.vendor_ids;

    return { vendors, status, error, refresh, clear };
  };

  return { getVendors };
};
