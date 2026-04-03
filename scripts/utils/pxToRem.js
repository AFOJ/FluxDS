/**
 * Converts a pixel value (Without the suffix) to rem based on the provided configuration.
 *
 * @param {number|string} px - The pixel value to convert.
 * @param {Object} config - The configuration object.
 * @param {number} config.baseFontSize - The base font size in pixels.
 * @param {number} config.decimalPrecision - The number of decimal places to round to.
 * @returns {number} The converted rem value.
 */
export function pxToRem(px, config) {
  const { baseFontSize = 16, decimalPrecision = 2 } = config || {}
  const exponent = 10 ** decimalPrecision
  const remValue = Math.round((+px / baseFontSize) * exponent) / exponent
  return remValue
}
