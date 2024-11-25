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
  })
    .format(amount)
    .replace(/^(\D+)/, "$1 ")
    .replace(/\s+/, "");
}

export function parseCurrency(currency: string | null | undefined): number {
  if (currency === null || currency === undefined) {
    return 0; // Nilai default jika input null atau undefined
  }

  // Hapus simbol mata uang, koma, atau spasi
  const sanitized = currency.replace(/[^0-9]/g, "");
  return parseFloat(sanitized);
}
