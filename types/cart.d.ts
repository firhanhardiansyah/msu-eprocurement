interface CartItem {
  category: string;
  subCategories: CartSubItem[];
  createdAt: Date | string | null;
  checked: boolean;
}

interface CartSubItem {
  subCategory: string;
  products: ProductFormState[];
  checked?: boolean;
}

interface ProductFormState {
  product?: Product;
  unit_price?: number;
  qty?: number;
  total_price?: number;
  // estimate_price?: string;
  vendor?: GeneralResponse;
  analytic_project?: GeneralResponse;
  analytic_location?: GeneralResponse;
  analytic_category?: GeneralResponse;
  analytic_unit?: GeneralResponse;
  analytic_type?: GeneralResponse;
  analytic_department?: GeneralResponse;
  createdAt?: Date | string | null;
  checked?: boolean;

  slugs?: (string | undefined)[];
}

interface CheckoutProductItem {
  id?: number;
  name?: string;
}
