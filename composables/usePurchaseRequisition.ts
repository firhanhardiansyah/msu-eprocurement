export enum SelectionType {
  Vendor = "vendor",
  AnalyticLocation = "analytic_location",
  AnalyticAccount = "analytic_account",
  AnalyticCategory = "analytic_category",
  AnalyticUnit = "analytic_unit",
  AnalyticType = "analytic_type",
  AnalyticDepartment = "analytic_department",
  Company = "company",
  Warehouse = "warehouse",
  RfqCriteria = "kriteria_rfq",
}

export const usePurchaseRequisition = () => {
  const { $apiAuthorized } = useNuxtApp();

  const getSelectionData = (
    selection: SelectionType,
    search?: String,
    offset: number = 0,
    limit: number = 12
  ) => {
    return $apiAuthorized<ApiResponseGeneric<PurchaseRequisition>>(
      `/ecatalog/form/${selection}`,
      {
        params: {
          search: search,
          offset: offset,
          limit: limit,
        },
      }
    );
  };

  const getVendors = () => {
    const { data, status, error, refresh, clear } = useAsyncData(
      "master_vendor",
      () => getSelectionData(SelectionType.Vendor)
    );

    const vendors = data?.value?.data;

    return { vendors, status, error, refresh, clear };
  };

  const cretePR = async (request: any) =>
    $apiAuthorized<ApiResponseGeneric<GeneralResponse>>(`/ecatalog/checkout`, {
      method: "POST",
      body: request,
    });

  return { getSelectionData, getVendors, cretePR };
};
