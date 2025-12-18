/**
 * calculator.test.js
 * This file tests the calculation functions using Mocha and Chai.
 */

const { expect } = require('chai');
const { add, divide } = require('../utils/calculator');

describe('Calculator Functions', () => {

  it('should correctly add two positive numbers', () => {
    const result = add(4, 6);
    expect(result).to.equal(10);
  });

  it('should handle negative numbers correctly', () => {
    const result = add(-5, 3);
    expect(result).to.equal(-2);
  });

  it('should divide two numbers correctly', () => {
    const result = divide(10, 2);
    expect(result).to.equal(5);
  });

  it('should throw an error when dividing by zero', () => {
    expect(() => divide(5, 0)).to.throw('Division by zero is not allowed');
  });

});
