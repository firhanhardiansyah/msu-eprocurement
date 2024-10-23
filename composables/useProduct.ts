export const useProduct = () => {
  const { $api } = useNuxtApp();

  function getProductByCategory(
    slug: string,
    offset: number = 0,
    limit: number = 12
  ) {
    return $api<ApiResponseGeneric<ProductData>>(
      `/product/${slug}/${offset}/${limit}`
    );
  }

  /**
   *
   * @returns Promise<ApiResponseGeneric<Product>>
   */
  function getProductDetail(slug: string) {
    return $api<ApiResponseGeneric<Product>>(`/product/${slug}`);
  }

  const toProductCategory = (parentSlug: string, childSlug: string) =>
    `/category/${parentSlug}/${childSlug}`;

  const changeProductType = (type?: string): string => {
    if (type === ProductType.nonStock) return "Non Stock";
    if (type === ProductType.service) return "Service";
    if (type === ProductType.storableProduct) return "Storable Product";

    return "-";
  };

  function getProductByMovingCategory(
    type: MovingType,
    slug: string,
    offset: number = 0,
    limit: number = 12
  ) {
    return $api<ApiResponseGeneric<ProductData>>(
      `/product-catmove/${type}/${slug}/${offset}/${limit}`
    );
  }

  return {
    getProductByCategory,
    getProductByMovingCategory,
    getProductDetail,
    toProductCategory,
    changeProductType,
  };
};

export enum ProductType {
  nonStock = "consu",
  service = "service",
  storableProduct = "product",
}

export enum MovingType {
  fastMove = "fast_move",
  slowMove = "slow_move",
  deadStock = "dead_stock",
}
