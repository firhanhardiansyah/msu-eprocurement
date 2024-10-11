/**
 * Formats a number as currency.
 *
 * @param {number} amount - The number to format as currency.
 * @param {string} locale - The locale string, e.g., 'en-US', 'id-ID'.
 * @param {string} currency - The currency code, e.g., 'USD', 'IDR'.
 * @returns {string} - The formatted currency string.
 */
export function currencyFormat(
  amount: number | bigint | Intl.StringNumericLiteral,
  // locale = "en-US",
  // currency = "USD"
  locale = "id-ID",
  currency = "IDR"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0, // Rupiah usually does not use decimal places
  }).format(amount);
}
