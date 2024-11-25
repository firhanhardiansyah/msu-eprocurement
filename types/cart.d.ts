interface CartItem {
  category: string;
  subCategories: CartSubItem[];
  createdAt: Date | string | null;
  checked: boolean;
}

interface CartSubItem {
  subCategory: string;
  products: Product[];
  checked?: boolean;
}
