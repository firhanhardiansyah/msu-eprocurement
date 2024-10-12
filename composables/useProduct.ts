export const useProduct = () => {
  const { $api } = useNuxtApp();

  const _productKey = "product";

  function getProductByCategoryFinally(
    slug: string,
    offset: number = 0,
    limit: number = 12
  ) {
    return $api<ApiResponseGeneric<ProductData>>(
      `/${_productKey}/${slug}/${offset}/${limit}`
    );
  }

  /**
   *
   * @returns Promise<ApiResponseGeneric<Product>>
   */
  function getProductDetail(slug: string) {
    return $api<ApiResponseGeneric<Product>>(`/${_productKey}/${slug}`);
  }

  const toProductCategory = (parentSlug: string, childSlug: string) =>
    `/category/${parentSlug}/${childSlug}`;

  const changedNameProductType = (type?: string): string => {
    if (type === "consu") return "Non Stock";
    if (type === "service") return "Service";
    if (type === "product") return "Storable Product";

    return "-";
  };

  return {
    getProductByCategoryFinally,
    getProductDetail,
    toProductCategory,
    changedNameProductType,
  };
};