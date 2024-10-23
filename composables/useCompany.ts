export const useCompany = () => {
  const { $api } = useNuxtApp();

  /**
   * Get product category from '/product-category/{offset}/{limit}'
   * @param offset default 0
   * @param limit default 100
   * @returns Promise
   */
  const getCompanies = () => {
    return $api<ApiResponseGeneric<GeneralResponse[]>>(`/list-company`).then(
      (response) => {
        response.data = response.data?.map((val, index, values) => {
          if (index === 0) {
            values[0].checked = true;
          }

          return val;
        });
        return response;
      }
    );
  };

  return { getCompanies };
};
