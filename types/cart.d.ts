interface CartItem {
  category: string;
  subCategories: {
    subCategory: string;
    products: Product[];
    checked: boolean;
  }[];
  createdAt: number;
  checked: boolean;
}
