interface Category {
  id?: number;
  name?: string;
  url_slug?: string;
  parent?: ParentCategory;
}
interface ParentCategory {
  id?: number;
  name?: string;
  url_slug?: string;
  parent?: ParentCategory;
}

interface UOM {
  id?: number;
  name?: string;
}

interface Partner {
  id?: number;
  name?: string;
}

interface Currency {
  id?: number;
  name?: string;
}

interface ProductUOM {
  id?: number;
  name?: string;
}

interface Seller {
  id?: number;
  partner_id?: Partner;
  currency_id?: Currency;
  product_uom?: ProductUOM;
  price?: number;
  delay?: number;
}

interface Product {
  id?: number;
  name?: string;
  default_code?: string;
  type?: string;
  categ_id?: Category;
  standard_price?: number;
  uom_id?: UOM;
  uom_po_id?: UOM;
  qty_available?: number;
  factor_inv?: number;
  seller_ids?: Seller[];
  url_slug?: string;
  quantity: number = 0;
  attachment_ids?: ProductAttachment[];
}

interface ProductData {
  total_data?: number;
  product_list?: Product[];
}

interface ProductAttachment {
  attachment_id?: number;
  attachment_name?: string;
  attachment_url?: string;
  attachment_mimetype?: string;
}

interface ProductVendor {
  id?: number;
  name?: string;
  price?: number;
}
