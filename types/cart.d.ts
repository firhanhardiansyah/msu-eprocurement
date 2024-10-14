interface CartItem {
  category: string;
  subCategories: {
    subCategory: string;
    products: Product[];
  }[];
  createdAt: number;
}
