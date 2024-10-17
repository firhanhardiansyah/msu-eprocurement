interface CartItem {
  category: string;
  subCategories: CartSubItem[];
  createdAt: number;
  checked: boolean;
}

interface CartSubItem {
  subCategory: string;
  products: Product[];
  checked?: boolean;
}
