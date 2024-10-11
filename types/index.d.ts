interface DefaultConfig {
  site: {
    name: string;
    description: string;
    ogImage: string;
  };

  header: {
    showLoadingIndicator: boolean;
    title: string;
    showTitle: boolean;
    border: boolean;
    logo: {
      light: string;
      dark: string;
    };
    showTitleInMobile: boolean;
    darkModeToggle: boolean;
    nav: {
      title: string;
      to: string;
      target: string;
      links: {
        title: string;
        to: string;
        target: string;
        description: string;
      }[];
    }[];
    links: {
      icon: string;
      to: string;
      target: string;
    }[];
  };

  aside: {
    useLevel: boolean;
    collapse: boolean;
  };

  main: {
    breadCrumb: boolean;
    showTitle: boolean;
    codeCopyToast: boolean;
    codeCopyToastText: string;
    fieldRequiredText: string;
    codeIcon: {
      [key: string]: string;
    };
    padded: boolean;
  };

  footer: {
    credits: string;
    links: {
      icon: string;
      title: string;
      to: string;
      target: string;
    }[];
  };

  search: {
    enable: boolean;
    inAside: boolean;
    style: "input" | "button";
    placeholder: string;
    placeholderDetailed: string;
  };
}

// Interface for Sign In
interface SignInCredentials {
  username: string;
  password: string;
}

interface ApiResponse {
  code: int;
  data?: any;
  message?: string;
  error?: {
    message?: string;
  };
}
interface ApiResponseGeneric<T> {
  code: int;
  data?: T;
  message?: string;
  error?: {
    message?: string;
  };
}

interface ApiResponseError {
  error?: {
    message?: string;
  };
}

// Interface for Review
interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

// Interface for Product Dimensions
interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

// Interface for Product Meta Information
interface Meta {
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  barcode: string;
  qrCode: string;
}

// Main Interface for Product
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}
