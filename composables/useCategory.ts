export const useCategory = () => {
  const { $api } = useNuxtApp();

  /**
   * Get product category from '/product-category/{offset}/{limit}'
   * @param offset default 0
   * @param limit default 100
   * @returns Promise
   */
  const getCategories = (offset: number = 0, limit: number = 100) => {
    return $api<ApiResponseGeneric<CategoryProduct[]>>(
      `/product-category/${offset}/${limit}`
    );
  };

  const getCategory = (slug: string) => {
    return $api<ApiResponseGeneric<CategoryProduct>>(
      `/product-category/${slug}`
    );
  };
  return {
    getCategories,
    getCategory,
  };
};
