export const useHelper = () => {
  // Screen Size
  const isMobile = ref<boolean>(false);
  const isTablet = ref<boolean>(false);

  onMounted(() => {
    const checkScreenSize = () => {
      isMobile.value = window.innerWidth < 640;
      isTablet.value = window.innerWidth >= 640 && window.innerWidth < 1024;
    };

    // Periksa ukuran layar saat komponen dimuat
    checkScreenSize();

    // Tambahkan event listener untuk menangani resize
    window.addEventListener("resize", checkScreenSize);

    // Bersihkan event listener saat komponen di-unmount
    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenSize);
    });
  });

  /**
   * Converts a given string to kebab case.
   * Example: "Hello World" => "hello-world"
   *
   * @param input - The string to be converted to kebab case.
   * @returns The kebab case version of the input string.
   */
  function toKebabCase(input: string): string {
    return input
      .replace(/([a-z])([A-Z])/g, "$1-$2") // Add hyphen between camelCase words
      .replace(/[\s_]+/g, "-") // Replace spaces or underscores with hyphens
      .toLowerCase(); // Convert the entire string to lowercase
  }

  /**
   * Converts a given string to Capital Case and removes hyphens.
   * Example: "hello-world" => "Hello World"
   *
   * @param {string} input - The string to be converted to Capital Case.
   * @returns {string} - The Capital Case version of the input string with hyphens removed.
   */
  function toCapitalCase(input: string): string {
    return input
      .toLowerCase() // Convert the whole string to lowercase first
      .replace(/-/g, " ") // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  }

  /**
   * Checks if a given value is of type string.
   *
   * This function acts as a type guard to ensure the given value is a string.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} `true` if the value is a string, otherwise `false`.
   */
  function isString(value: any): value is string {
    return typeof value === "string";
  }

  /**
   * Returns the last element of the array or undefined if the array is empty.
   * @param array - The array from which to retrieve the last element.
   * @returns The last element of the array or undefined if the array is empty.
   */
  function getLastElement<T>(array: T[]): T | undefined {
    // Check if the array is empty
    if (array.length === 0) {
      return undefined; // Return undefined for an empty array
    }

    array = removeEmptyElements(array);

    // Return the last element of the array
    return array[array.length - 1];
  }

  /**
   * Returns the first element of the array or undefined if the array is empty.
   * @param array - The array from which to retrieve the first element.
   * @returns The first element of the array or undefined if the array is empty.
   */
  function getFirstElement<T>(array: T[]): T | undefined {
    // Check if the array is empty
    if (array.length === 0) {
      return undefined; // Return undefined if the array is empty
    }
    // Return the first element of the array
    return array[0];
  }

  /**
   * Removes empty elements (null, undefined, or an empty string) from an array.
   * @param array - The array to clean.
   * @returns A new array with all empty elements removed.
   */
  function removeEmptyElements<T>(array: T[]): T[] {
    // Filter out elements that are null, undefined, or an empty string
    return array.filter(
      (item) => item !== null && item !== undefined && item !== ""
    );
  }

  /**
   * This function splits a string into an array based on a given delimiter
   * and removes the last element from the resulting array.
   *
   * @param str - The input string to be split and modified
   * @param separator - The delimiter used for splitting the string (default is '-')
   * @returns The modified array with the last element removed
   */
  function slugOverride(
    str: string,
    separator: string = "-",
    separatorJoin = " "
  ): string {
    // 1. Split the input string into an array using the provided separator or default '-'
    let arr: string[] = str.split(separator);

    // 2. Remove the last element from the array
    arr.pop();

    // 3. Join the array back into a string using '-' as the separator
    return arr.join(separatorJoin);
  }

  function slugOverrides(slugs: string[]): any[] {
    const items: any[] = [undefined];

    slugs.map((slug) => {
      items.push({
        label: toCapitalCase(slugOverride(slug)),
      });
    });

    return items;
  }

  return {
    isMobile,
    isTablet,
    toKebabCase,
    toCapitalCase,
    isString,
    getFirstElement,
    getLastElement,
    removeEmptyElements,
    slugOverride,
    slugOverrides,
  };
};
