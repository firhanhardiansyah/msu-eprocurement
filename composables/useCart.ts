export const useCart = () => {
  const toast = useToast();

  const cart = useState<CartItem[]>("cart", () => []);
  const cartShipment = useState<CartSubItem | null>(
    "cart-shipment",
    () => null
  );

  // Load data from session storage or local storage when the composable is first called.
  const loadCart = () => {
    const storedCart = sessionStorage.getItem("cart");
    const storedCartShipment = sessionStorage.getItem("cart-shipment");

    if (storedCart) {
      cart.value = JSON.parse(storedCart);
    }

    if (storedCartShipment) {
      cartShipment.value = JSON.parse(storedCartShipment);
    }
  };

  // Function to add a product to the cart
  const addToCart = (product: Product, qty: number) => {
    // ---------------------------------------------------
    // Category
    // ---------------------------------------------------
    // Temukan kategori dalam keranjang
    // let categoryEntry = cart.value.find(
    //   (entry) => entry.category === product.categ_id?.parent?.name
    // );
    // if (!categoryEntry) {
    //   // Tambahkan kategori baru jika belum ada
    //   categoryEntry = {
    //     category: product.categ_id?.parent?.name ?? "",
    //     subCategories: [],
    //     createdAt: new Date(),
    //     checked: false,
    //   };
    //   cart.value.push(categoryEntry);
    // } else {
    //   // Perbarui datetime jika sudah ada
    //   categoryEntry.createdAt = new Date();
    // }
    // // ---------------------------------------------------
    // // Category > Sub Category
    // // ---------------------------------------------------
    // // Temukan subkategori dalam kategori
    // let subCategoryEntry = categoryEntry.subCategories.find(
    //   (sub) => sub.subCategory === product.categ_id?.name
    // );
    // if (!subCategoryEntry) {
    //   // Tambahkan subkategori baru jika belum ada
    //   subCategoryEntry = {
    //     subCategory: product.categ_id?.name ?? "",
    //     products: [],
    //   };
    //   categoryEntry.subCategories.push(subCategoryEntry);
    // }
    // // ---------------------------------------------------
    // // Category > Sub Category > Product
    // // ---------------------------------------------------
    // // Temukan produk dalam subkategori
    // let productEntry = subCategoryEntry.products.find(
    //   (p) => p.id === product.id
    // );
    // if (!productEntry) {
    //   const categorySlug = product?.categ_id?.parent?.url_slug;
    //   const subCategorySlug = product?.categ_id?.url_slug;
    //   const productSlug = product?.url_slug;
    //   // Menambahkan url path untuk redirect ke produk item
    //   const urlProduct = `/product/${categorySlug}/${subCategorySlug}/${productSlug}`;
    //   // Tambahkan produk baru ke subkategori
    //   subCategoryEntry.products.push({
    //     ...product,
    //     quantity: qty,
    //     addedAt: new Date(),
    //     checked: false,
    //     url_product: urlProduct,
    //   });
    // } else {
    //   // Perbarui jumlah jika produk sudah ada
    //   productEntry.quantity = qty;
    // }
    // sessionStorage.setItem("cart", JSON.stringify(cart.value));
  };

  // Function to remove a product from the cart
  const removeFromCart = (
    productId: number,
    subCategory: string,
    category: string
  ) => {
    // const categoryIndex = cart.value.findIndex(
    //   (cat) => cat.category === category
    // );
    // const subCategoryIndex = cart.value[categoryIndex].subCategories.findIndex(
    //   (sub) => sub.subCategory === subCategory
    // );
    // const productIndex = cart.value[categoryIndex].subCategories[
    //   subCategoryIndex
    // ].products.findIndex((p) => p.id === productId);
    // if (categoryIndex === -1 || subCategoryIndex === -1 || productIndex === -1)
    //   return;
    // // Remove the product
    // cart.value[categoryIndex].subCategories[subCategoryIndex].products.splice(
    //   productIndex,
    //   1
    // );
    // // Clean up empty subCategories or categories
    // if (
    //   cart.value[categoryIndex].subCategories[subCategoryIndex].products
    //     .length === 0
    // ) {
    //   cart.value[categoryIndex].subCategories.splice(subCategoryIndex, 1);
    // }
    // if (cart.value[categoryIndex].subCategories.length === 0) {
    //   cart.value.splice(categoryIndex, 1);
    // }
    // sessionStorage.setItem("cart", JSON.stringify(cart.value));
  };

  // Clear the entire cart
  const clearCart = () => {
    cart.value = [];

    sessionStorage.removeItem("cart");
  };

  // Function to calculate total items in the cart
  const totalItems = computed(() => {
    // return cart.value.reduce(
    //   (total, categoryItem) =>
    //     total +
    //     categoryItem.subCategories.reduce(
    //       (subTotal, subCategoryItem) =>
    //         subTotal +
    //         subCategoryItem.products.reduce((productTotal, product) => {
    //           // Add the quantity of each product to the total
    //           return productTotal + (product.quantity || 0);
    //         }, 0),
    //       0
    //     ),
    //   0
    // );

    return 0;
  });

  // Method to update all products and subcategories when a category is checked
  const toggleCategory = (category: CartItem, isChecked: boolean) => {
    // category.checked = isChecked || false;
    // category.subCategories.forEach((subCategory) => {
    //   subCategory.products.forEach((product) => {
    //     product.checked = isChecked || false;
    //   });
    // });
  };

  // Method to update all products and subcategories when a category is checked
  const toggleSubCategory = (
    category: CartItem,
    subCategory: CartSubItem,
    isChecked: boolean
  ) => {
    // const categoryIndex = cart.value.findIndex(
    //   (cat) => cat.category === category.category
    // );
    // const subCategoryIndex = cart.value[categoryIndex].subCategories.findIndex(
    //   (sub) => sub.subCategory === subCategory.subCategory
    // );
    // cart.value[categoryIndex].subCategories[subCategoryIndex].checked =
    //   isChecked ?? false;
    // cart.value[categoryIndex].subCategories[subCategoryIndex].products.forEach(
    //   (product) => {
    //     product.checked = isChecked || false;
    //   }
    // );
    // sessionStorage.setItem("cart", JSON.stringify(cart.value));
  };

  // Method to update products and check whether all products in a subcategory are checked.
  const toggleProduct = (product: Product, isChecked: boolean) => {
    // cart.value.map((cartItem: CartItem) =>
    //   cartItem.subCategories
    //     // Filter berdasarkan sub category dengan nama yang sama
    //     .filter((sub) => sub.subCategory === product.categ_id?.name)
    //     .map((sub) => {
    //       sub.checked = sub.products.every((item) => item.checked);
    //       sub.products
    //         .filter((item) => item.id === product.id)
    //         .map((item) => (item.checked = isChecked ?? false));
    //       return sub;
    //     })
    // );
    // sessionStorage.setItem("cart", JSON.stringify(cart.value));
  };

  // Function to calculate total price in the cart
  const totalPrice = computed<number>(() => {
    // let total = 0;
    // cart.value.forEach((category) => {
    //   category.subCategories.forEach((subCategory) => {
    //     subCategory.products.forEach((product) => {
    //       if (product.checked) {
    //         total += (product.standard_price ?? 0) * product.quantity;
    //       }
    //     });
    //   });
    // });
    // return total;

    return 0;
  });

  // Sorting function LIFO dengan null safety dan handling string
  const sortedCart = computed<CartItem[]>(() => {
    // return cart.value
    //   .map((category) => ({
    //     ...category,
    //     subCategories: category.subCategories.map((subCategory) => ({
    //       ...subCategory,
    //       products: [...subCategory.products].sort((a, b) => {
    //         // Ensure addedAt is a Date object before sorting
    //         const dateA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
    //         const dateB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
    //         return dateB - dateA;
    //       }),
    //     })),
    //   }))
    //   .sort((a, b) => {
    //     const dateA = a.subCategories[0]?.products[0]?.addedAt
    //       ? new Date(a.subCategories[0]?.products[0]?.addedAt).getTime()
    //       : 0;
    //     const dateB = b.subCategories[0]?.products[0]?.addedAt
    //       ? new Date(b.subCategories[0]?.products[0]?.addedAt).getTime()
    //       : 0;
    //     return dateB - dateA;
    //   });

    return [];
  });

  const checkOutProduct = (): boolean => {
    // toast.clear();
    // let isCheckOut = false;
    // let selectedSubcategory: CartSubItem | null = null;
    // let subCategoryName: String | null = null;
    // const checkedProducts: Product[] = [];
    // cart.value.forEach((category) => {
    //   category.subCategories.forEach((subCategory) => {
    //     const subCategoryCheckedProducts = subCategory.products.filter(
    //       (product) => product.checked
    //     );
    //     if (subCategoryCheckedProducts.length === 0) return [];
    //     // Jika ini adalah subkategori pertama dengan produk yang dicentang, simpan subkategori tersebut
    //     if (!selectedSubcategory) {
    //       selectedSubcategory = subCategory;
    //       subCategoryName = subCategory.subCategory;
    //     }
    //     // Jika sudah ada subkategori yang berbeda dengan produk yang dicentang, batalkan checkout
    //     if (selectedSubcategory !== subCategory) {
    //       toast.add({
    //         title: "Pilih produk yang sama dalam satu kategori",
    //       });
    //       // Tidak bisa melakukan checkout produk
    //       isCheckOut = false;
    //       return [];
    //     }
    //     // Bisa melakukan checkout produk
    //     isCheckOut = true;
    //     // Tambahkan produk yang dicentang ke array checkedProducts
    //     checkedProducts.push(...subCategoryCheckedProducts);
    //   });
    // });
    // if (checkedProducts.length === 0) {
    //   toast.add({ title: "Pilih produk terlebih dahulu sebelum di checkout" });
    //   return false;
    // }
    // if (!isCheckOut) return false;
    // cartShipment.value = {
    //   subCategory: subCategoryName || "",
    //   products: checkedProducts,
    // };
    // sessionStorage.setItem("cart-shipment", JSON.stringify(cartShipment.value));
    return true;
  };

  return {};
};
