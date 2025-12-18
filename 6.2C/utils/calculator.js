/**
 * calculator.js
 * This file contains calculation-related business logic.
 * The functions defined here are independent of Express,
 * making them easy to test.
 */

/**
 * Adds two numbers and returns the result.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Divides two numbers.
 * Throws an error when attempting to divide by zero.
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Division result
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

module.exports = { add, divide };
