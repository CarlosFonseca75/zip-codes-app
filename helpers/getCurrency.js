/**
 * @name getCurrency
 * @description Formats a number to a local currency string.
 * @param {number} number - Number to be formatted.
 * @returns {string} - The formatted currency string, e.g. '$1,000.00'.
 */
module.exports = function getCurrency(number) {
  try {
    const formattedNumber = number.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });

    return formattedNumber;
  } catch (error) {
    console.error(`Error:  ${error.message}`);
    return "";
  }
};
