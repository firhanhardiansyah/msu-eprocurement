export const useCart = () => {
  const cart = useState<CartItem[]>("cart", () => []);

  // Muat data dari session storage atau local storage ketika pertama kali composable dipanggil
  const loadCart = () => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      cart.value = JSON.parse(storedCart);
    }
  };

  // Function to add a product to the cart
  const addToCart = (product: Product, qty: number) => {
    const categoryIndex = cart.value.findIndex(
      (cat) => cat.category === product.categ_id?.name
    );

    // Ensure quantity is a valid number
    const productWithQuantity = {
      ...product,
      quantity: qty,
      addedAt: new Date(),
    };

    if (categoryIndex === -1) {
      // If category doesn't exist, create a new category and subCategory
      cart.value.push({
        category: product.categ_id?.name ?? "",
        subCategories: [
          {
            subCategory: product.categ_id?.name ?? "",
            products: [productWithQuantity],
          },
        ],
        createdAt: Date.now(),
      });
    } else {
      const subCategoryIndex = cart.value[
        categoryIndex
      ].subCategories.findIndex(
        (sub) => sub.subCategory === product.categ_id?.name
      );

      if (subCategoryIndex === -1) {
        // If subCategory doesn't exist, create a new subCategory
        cart.value[categoryIndex].subCategories.push({
          subCategory: product.categ_id?.name ?? "",
          products: [productWithQuantity],
        });
      } else {
        // If subCategory exists, add product to the subCategory
        const existingProductIndex = cart.value[categoryIndex].subCategories[
          subCategoryIndex
        ].products.findIndex((p) => p.id === product.id);

        if (existingProductIndex === -1) {
          // Add new product if it doesn't exist in the subCategory
          cart.value[categoryIndex].subCategories[
            subCategoryIndex
          ].products.push(productWithQuantity);
        } else {
          // If product already exists, update the quantity
          cart.value[categoryIndex].subCategories[subCategoryIndex].products[
            existingProductIndex
          ].quantity = qty;
        }
      }

      // Update createdAt to move this category to the top (LIFO)
      cart.value[categoryIndex].createdAt = Date.now();
      // Move this category to the front
      const movedCategory = cart.value.splice(categoryIndex, 1)[0];
      cart.value.unshift(movedCategory);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart.value));
  };

  // Function to remove a product from the cart
  const removeFromCart = (
    productId: number,
    subCategory: string,
    category: string
  ) => {
    const categoryIndex = cart.value.findIndex(
      (cat) => cat.category === category
    );

    if (categoryIndex !== -1) {
      const subCategoryIndex = cart.value[
        categoryIndex
      ].subCategories.findIndex((sub) => sub.subCategory === subCategory);

      if (subCategoryIndex !== -1) {
        const productIndex = cart.value[categoryIndex].subCategories[
          subCategoryIndex
        ].products.findIndex((p) => p.id === productId);

        if (productIndex !== -1) {
          // Remove the product
          cart.value[categoryIndex].subCategories[
            subCategoryIndex
          ].products.splice(productIndex, 1);

          // Clean up empty subCategories or categories
          if (
            cart.value[categoryIndex].subCategories[subCategoryIndex].products
              .length === 0
          ) {
            cart.value[categoryIndex].subCategories.splice(subCategoryIndex, 1);
          }

          if (cart.value[categoryIndex].subCategories.length === 0) {
            cart.value.splice(categoryIndex, 1);
          }
        }
      }
    }

    sessionStorage.setItem("cart", JSON.stringify(cart.value));
  };

  // Clear the entire cart
  const clearCart = () => {
    cart.value = [];

    sessionStorage.removeItem("cart");
  };

  // Function to calculate total items in the cart
  const totalItems = computed(() => {
    return cart.value.reduce((total, categoryItem) => {
      return (
        total +
        categoryItem.subCategories.reduce((subTotal, subCategoryItem) => {
          return (
            subTotal +
            subCategoryItem.products.reduce((productTotal, product) => {
              // Add the quantity of each product to the total
              return productTotal + (product.quantity || 0);
            }, 0)
          );
        }, 0)
      );
    }, 0);
  });

  // Function to calculate total price in the cart
  const totalPrice = computed(() => {
    return cart.value.reduce((total, categoryItem) => {
      return (
        total +
        categoryItem.subCategories.reduce((subTotal, subCategoryItem) => {
          return (
            subTotal +
            subCategoryItem.products.reduce((productTotal, product) => {
              // Calculate total price per product based on quantity and price
              return (
                productTotal +
                (product.quantity || 0) * (product.standard_price ?? 0)
              );
            }, 0)
          );
        }, 0)
      );
    }, 0);
  });

  // Sorting function LIFO dengan null safety dan handling string
  const sortedCart = computed(() => {
    return cart.value
      .map((category) => ({
        ...category,
        subCategories: category.subCategories.map((subCategory) => ({
          ...subCategory,
          products: [...subCategory.products].sort((a, b) => {
            // Ensure addedAt is a Date object before sorting
            const dateA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
            const dateB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
            return dateB - dateA;
          }),
        })),
      }))
      .sort((a, b) => {
        const dateA = a.subCategories[0]?.products[0]?.addedAt
          ? new Date(a.subCategories[0]?.products[0]?.addedAt).getTime()
          : 0;
        const dateB = b.subCategories[0]?.products[0]?.addedAt
          ? new Date(b.subCategories[0]?.products[0]?.addedAt).getTime()
          : 0;
        return dateB - dateA;
      });
  });

  return {
    cart,
    totalItems,
    totalPrice,
    sortedCart,
    loadCart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
