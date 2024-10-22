/**
 * Formats a numeric value into a string with the following format:
 *
 * - Separates thousands with dots: 1.234.567
 * - Uses commas for the decimal separator: 1.234,56
 *
 * This function handles values with different number of digits and ensures
 * that two decimal places are always displayed. It removes any non-numeric characters.
 *
 * @param {any} value - The value to format. It can be a number or a string.
 * @returns {string} The formatted value as a string.
 *
 * @example
 * formatAmount(1234567.89); // "1.234.567,89"
 * formatAmount(600);        // "600,00"
 * formatAmount("500a");     // "500,00"
 */
export function formatAmount(value: any) {
  let stringValue = String(value).replace(/[^\d]/g, "");

  if (stringValue.length > 2) {
    const integerPart = stringValue.substring(0, stringValue.length - 2) || "0";
    const decimalPart = stringValue.substring(stringValue.length - 2);
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    stringValue = `${formattedInteger},${decimalPart}`;
  } else if (stringValue.length === 1) {
    stringValue = `0,0${stringValue}`;
  } else if (stringValue.length === 2) {
    stringValue = `0,${stringValue}`;
  }

  stringValue = stringValue.replace(/^0\.00/, "");
  stringValue = stringValue.replace(/^0\.0/, "");
  stringValue = stringValue.replace(/^0\.0/, "");
  if (stringValue.length == 5) {
    stringValue = stringValue.replace(/^0/, "");
  } else if (stringValue.length > 5) stringValue = stringValue.replace(/^0/, "");

  if (stringValue.length > 6) {
    stringValue = stringValue.replace(/^0./, "");
    stringValue = stringValue.replace(/^0/, "");
  }

  if (stringValue.length == 6) {
    stringValue = stringValue.replace(/^0/, "");
  }

  return stringValue;
}

/**
 * Converts a formatted amount string back into a numeric value.
 *
 * This function removes thousand separators (dots) and replaces the decimal separator
 * (comma) with a period to return a valid floating-point number.
 *
 * @param {string} formattedValue - The formatted string to convert back to a number.
 * @returns {number} The numeric value after removing formatting.
 *
 * @example
 * formatAmount2("1.234.567,89"); // 1234567.89
 * formatAmount2("600,00");       // 600
 */

export function formatAmount2(formattedValue: any) {
  // Eliminar puntos de separación de miles
  let numericValue = formattedValue.replace(/\./g, "");

  // Reemplazar la coma por un punto decimal
  numericValue = numericValue.replace(/,/g, ".");

  // Convertir la cadena resultante a un número
  return parseFloat(numericValue);
}

/**
 * Formats a number or a string representing a number with the following format:
 *
 * - Commas to separate thousands: 600.000
 * - Two decimal places separated by a comma: 600,00
 *
 * @param {number | string} number - The number to format. It can be a number or a string representing a number.
 * @returns {string} The formatted number as a string with two decimal places.
 *
 * @example
 * formatAmountB(600.000000); // "600,00"
 * formatAmountB("1234567.89"); // "1.234.567,89"
 * formatAmountB(null); // "0,00"
 */

export function formatAmountB(number: any) {
  if (!number) return "0,00";
  // Convierte el número en un string y separa la parte entera de la parte decimal
  let [integerPart, decimalPart] = number.toString().split(".");

  // Si no hay parte decimal, agrega '00' como la parte decimal
  if (!decimalPart) {
    decimalPart = "00";
  } else {
    // Si hay parte decimal, toma solo los dos primeros dígitos
    decimalPart = decimalPart.substring(0, 2);
    // Si solo hay un dígito decimal, agrega un '0' al final
    if (decimalPart.length === 1) {
      decimalPart += "0";
    }
  }

  // Utiliza expresiones regulares para formatear la parte entera con comas
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${integerPart},${decimalPart}`;
}
