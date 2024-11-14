/**
 * Converts a given string to kebab case.
 * Example: "Hello World" => "hello-world"
 *
 * @param input - The string to be converted to kebab case.
 * @returns The kebab case version of the input string.
 */
export function toKebabCase(input: string): string {
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
export function toCapitalCase(input: string): string {
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
export function isString(value: any): value is string {
  return typeof value === "string";
}
