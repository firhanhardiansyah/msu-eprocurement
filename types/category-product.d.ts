interface CategoryProduct {
  id?: int;
  name?: string;
  url_slug?: string;
  items?: CategoryProductItem[];

  label?: string;
  url?: string;
  bgColor?: string;
  isChildrend?: boolean;
  defaultOpen?: boolean;
}

interface CategoryProductItem {
  id?: int;
  name?: string;
  url_slug?: string;
}
