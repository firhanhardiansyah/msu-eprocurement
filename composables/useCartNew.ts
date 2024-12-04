export const useCartNew = () => {
  // Use State Cart Item
  const cartItems = useState<CartItem[]>("cart-items", () => []);

  // Use State Cart Item in Checkout
  const checkoutItems = useState<CartItem[]>("checkout-items", () => []);

  // Toast
  const toast = useToast();

  // Load cart items
  const loadItemsInCart = (): void => {
    try {
      const cartStoredCart = sessionStorage.getItem("cart-items");
      const checkOutStoredCart = sessionStorage.getItem("checkout-items");
      if (cartStoredCart) {
        cartItems.value = JSON.parse(cartStoredCart);
      }
      if (checkOutStoredCart) {
        checkoutItems.value = JSON.parse(checkOutStoredCart);
      }
    } catch (error) {
      toast.add({
        title: `Error load items in cart : ${error}`,
        color: "red",
      });
    }
  };

  const onAddToCart = (cartItemForm: ProductFormState): void => {
    const productItem = cartItemForm.product;

    const categoryItem = productItem?.categ_id?.parent;
    const subCategoryItem = productItem?.categ_id;

    // Cek produk di keranjang berdasarkan
    let categoryEntry = cartItems.value.find(
      (entry) => entry.category === categoryItem?.name
    );

    if (!categoryEntry) {
      categoryEntry = {
        category: categoryItem?.name ?? "",
        subCategories: [],
        createdAt: new Date(),
        checked: false,
      };

      cartItems.value.push(categoryEntry);
    } else {
      categoryEntry.createdAt = new Date();
      categoryEntry.checked = false;
    }

    // ---------------------------------------------------
    // Category > Sub Category
    // ---------------------------------------------------
    // Temukan subkategori dalam kategori
    let subCategoryEntry = categoryEntry.subCategories.find(
      (sub) => sub.subCategory === subCategoryItem?.name
    );

    if (!subCategoryEntry) {
      // Tambahkan subkategori baru jika belum ada
      subCategoryEntry = {
        subCategory: subCategoryItem?.name ?? "",
        products: [],
        checked: false,
      };

      categoryEntry.subCategories.push(subCategoryEntry);
    } else {
      subCategoryEntry.checked = subCategoryEntry.products.every(
        (item) => item.checked
      );
    }

    // ---------------------------------------------------
    // Category > Sub Category > Product
    // ---------------------------------------------------
    // Temukan produk dalam subkategori
    let productEntry = subCategoryEntry.products.find((p) => {
      // Product Id
      const productId = p.product?.id === productItem?.id;

      // Analytic Project
      const analyticProject =
        p.analytic_project?.id === cartItemForm.analytic_project?.id;

      // Vendor
      const vendor = p.vendor?.id === cartItemForm.vendor?.id;

      // Analytic Location
      const analyticLocation =
        p.analytic_location?.id === cartItemForm.analytic_location?.id;

      // Analytic Category
      const analyticCategory =
        p.analytic_category?.id === cartItemForm.analytic_category?.id;

      // Analytic Unit
      const analyticUnit =
        p.analytic_unit?.id === cartItemForm.analytic_unit?.id;

      // Analytic Type
      const analyticType =
        p.analytic_type?.id === cartItemForm.analytic_type?.id;

      // Analytic Department
      const analyticDepartment =
        p.analytic_department?.id === cartItemForm.analytic_department?.id;

      return (
        productId &&
        analyticProject &&
        vendor &&
        analyticLocation &&
        analyticCategory &&
        analyticUnit &&
        analyticType &&
        analyticDepartment
      );
    });

    console.log("productEntry");
    console.log(!productEntry);

    if (!productEntry) {
      const categorySlug = categoryItem?.url_slug;
      const subCategorySlug = subCategoryItem?.url_slug;
      const productSlug = productItem?.url_slug;

      const slugs = [categorySlug, subCategorySlug, productSlug];

      // Tambahkan produk baru ke subkategori
      subCategoryEntry.products.push({
        ...cartItemForm,
        createdAt: new Date(),
        slugs: slugs,
        checked: false,
      });
      subCategoryEntry.checked = false;
    } else {
      subCategoryEntry.checked = false;
      productEntry.checked = false;
      productEntry.qty = cartItemForm.qty;
      productEntry.total_price = cartItemForm.total_price;
    }

    sessionStorage.setItem("cart-items", JSON.stringify(cartItems.value));
  };

  const onChangeProductQty = (product: ProductFormState, increment: number) => {
    cartItems.value = cartItems.value.map((category) => ({
      ...category,
      subCategories: category.subCategories.map((subCategory) => ({
        ...subCategory,
        products: subCategory.products.map((p) => {
          // Check same data
          const isSame = () => {
            // Product Id
            const productId = p.product?.id === product?.product?.id;

            // Analytic Project
            const analyticProject =
              p.analytic_project?.id === product?.analytic_project?.id;

            // Vendor
            const vendor = p.vendor?.id === product?.vendor?.id;

            // Analytic Location
            const analyticLocation =
              p.analytic_location?.id === product?.analytic_location?.id;

            // Analytic Category
            const analyticCategory =
              p.analytic_category?.id === product?.analytic_category?.id;

            // Analytic Unit
            const analyticUnit =
              p.analytic_unit?.id === product?.analytic_unit?.id;

            // Analytic Type
            const analyticType =
              p.analytic_type?.id === product?.analytic_type?.id;

            // Analytic Department
            const analyticDepartment =
              p.analytic_department?.id === product?.analytic_department?.id;

            return (
              productId &&
              analyticProject &&
              vendor &&
              analyticLocation &&
              analyticCategory &&
              analyticUnit &&
              analyticType &&
              analyticDepartment
            );
          };
          return isSame() ? { ...p, qty: increment } : p;
        }),
      })),
    }));

    sessionStorage.setItem("cart-items", JSON.stringify(cartItems.value));
  };

  const onDeleteProductItem = (product: ProductFormState): any => {
    cartItems.value = cartItems.value
      .map((category) => ({
        ...category,
        subCategories: category.subCategories
          .map((subCategory) => ({
            ...subCategory,
            products: subCategory.products.filter((p) => {
              // Product Id
              const productId = p.product?.id !== product?.product?.id;

              // Analytic Project
              const analyticProject =
                p.analytic_project?.id !== product?.analytic_project?.id;

              // Vendor
              const vendor = p.vendor?.id !== product?.vendor?.id;

              // Analytic Location
              const analyticLocation =
                p.analytic_location?.id !== product?.analytic_location?.id;

              // Analytic Category
              const analyticCategory =
                p.analytic_category?.id !== product?.analytic_category?.id;

              // Analytic Unit
              const analyticUnit =
                p.analytic_unit?.id !== product?.analytic_unit?.id;

              // Analytic Type
              const analyticType =
                p.analytic_type?.id !== product?.analytic_type?.id;

              // Analytic Department
              const analyticDepartment =
                p.analytic_department?.id !== product?.analytic_department?.id;

              return (
                productId ||
                analyticProject ||
                vendor ||
                analyticLocation ||
                analyticCategory ||
                analyticUnit ||
                analyticType ||
                analyticDepartment
              );
            }),
          }))
          .filter((subCategory) => subCategory.products.length > 0),
      }))
      .filter((category) => category.subCategories.length > 0);

    sessionStorage.setItem("cart-items", JSON.stringify(cartItems.value));
  };

  const sortedCart = (items: CartItem[]): CartItem[] => {
    return items
      .map((category) => ({
        ...category,
        subCategories: category.subCategories.map((subCategory) => ({
          ...subCategory,
          products: [...subCategory.products].sort((a, b) => {
            // Ensure addedAt is a Date object before sorting
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          }),
        })),
      }))
      .sort((a, b) => {
        const dateA = a.subCategories[0]?.products[0]?.createdAt
          ? new Date(a.subCategories[0]?.products[0]?.createdAt).getTime()
          : 0;
        const dateB = b.subCategories[0]?.products[0]?.createdAt
          ? new Date(b.subCategories[0]?.products[0]?.createdAt).getTime()
          : 0;
        return dateB - dateA;
      });
  };

  // Calculate items in the cart
  const totalItemsInCart = computed<number>(() => {
    try {
      return cartItems.value.reduce((total, category) => {
        return (
          total +
          category.subCategories.reduce((subTotal, subCategory) => {
            return (
              subTotal +
              subCategory.products.reduce((productTotal, product) => {
                return productTotal + (product.qty ?? 0);
              }, 0)
            );
          }, 0)
        );
      }, 0);
    } catch (error) {
      return 0;
    }
  });

  // Method to update products and check whether all products in a subcategory are checked.
  const toggleProduct = (item: ProductFormState, isChecked: boolean): void => {
    cartItems.value.map((cartItem: CartItem) =>
      cartItem.subCategories
        .filter((sub) => sub.subCategory === item?.product?.categ_id?.name)
        .map((sub) => {
          sub.checked = sub.products.every((item) => item.checked);

          sub.products
            .filter((p) => {
              // Product Id
              const productId = p.product?.id === item.product?.id;

              // Analytic Project
              const analyticProject =
                p.analytic_project?.id === item.analytic_project?.id;

              // Vendor
              const vendor = p.vendor?.id === item.vendor?.id;

              // Analytic Location
              const analyticLocation =
                p.analytic_location?.id === item.analytic_location?.id;

              // Analytic Category
              const analyticCategory =
                p.analytic_category?.id === item.analytic_category?.id;

              // Analytic Unit
              const analyticUnit =
                p.analytic_unit?.id === item.analytic_unit?.id;

              // Analytic Type
              const analyticType =
                p.analytic_type?.id === item.analytic_type?.id;

              // Analytic Department
              const analyticDepartment =
                p.analytic_department?.id === item.analytic_department?.id;

              return (
                productId &&
                analyticProject &&
                vendor &&
                analyticLocation &&
                analyticCategory &&
                analyticUnit &&
                analyticType &&
                analyticDepartment
              );
            })
            .map((item) => (item.checked = isChecked));
          return sub;
        })
    );

    sessionStorage.setItem("cart-items", JSON.stringify(cartItems.value));
  };

  // Method to update all products and subcategories when a category is checked
  const toggleSubCategory = (item: CartSubItem, isChecked: boolean): void => {
    try {
      cartItems.value.map((category) =>
        category.subCategories
          .filter((entry) => entry.subCategory === item.subCategory)
          .map((subCategory) => {
            subCategory.checked = isChecked;
            subCategory.products.map(
              (product) => (product.checked = isChecked)
            );

            return subCategory;
          })
      );

      sessionStorage.setItem("cart-items", JSON.stringify(cartItems.value));
    } catch (error) {
      console.error(`Error toggle sub category items in cart : ${error}`);
    }
  };

  // Calculate total price in the cart
  const totalPrice = computed<number>({
    set: () => {},
    get: (_) => {
      let total = 0;

      cartItems.value.forEach((category) => {
        category.subCategories.forEach((subCategory) => {
          subCategory.products.forEach((product) => {
            if (product.checked) {
              total += (product.total_price ?? 0) * (product.qty ?? 0);
            }
          });
        });
      });
      return total;
    },
  });

  const onCheckOutProduct = (): boolean => {
    try {
      toast.clear();

      const checkout: CartItem[] = getCheckedStructure(cartItems.value);

      if (checkout.length === 0) {
        throw "Pilih produk terlebih dahulu sebelum di checkout.";
      }

      checkoutItems.value = checkout;
      sessionStorage.setItem("checkout-items", JSON.stringify(checkout));

      return true;
    } catch (error) {
      toast.add({
        title: `${error}`,
        color: "red",
      });
      return false;
    }
  };

  const getCheckedProducts = (categories: CartItem[]): ProductFormState[] =>
    categories.flatMap((category) =>
      category.subCategories.flatMap((subCategory) =>
        subCategory.products.filter((product) => product.checked)
      )
    );

  const getCheckedStructure = (categories: CartItem[]): CartItem[] => {
    return categories
      .map((category) => ({
        ...category,
        subCategories: category.subCategories
          .map((subCategory) => ({
            ...subCategory,
            products: subCategory.products.filter((product) => product.checked),
          }))
          .filter((subCategory) => subCategory.products.length > 0), // Hapus subCategory kosong
      }))
      .filter((category) => category.subCategories.length > 0); // Hapus category kosong
  };

  const calculateTotalPrice = (products: ProductFormState[]): number => {
    return products.reduce(
      (total, product) => total + (product.total_price ?? 0),
      0
    );
  };

  return {
    onAddToCart,
    onChangeProductQty,
    onDeleteProductItem,
    onCheckOutProduct,

    loadItemsInCart,

    // Checked
    toggleProduct,
    toggleSubCategory,

    // Sorted
    sortedCart,

    cartItems,
    totalItemsInCart,
    totalPrice,

    checkoutItems,

    getCheckedProducts,
    calculateTotalPrice,
  };
};
