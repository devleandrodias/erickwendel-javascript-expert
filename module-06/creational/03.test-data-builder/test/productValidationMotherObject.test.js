const { expect } = require("chai");
const { it, describe } = require("mocha");

const { productValidator } = require("./../src");
const ProductMotherObject = require("./model/productMotherObject");

describe("Test Mother Object", () => {
  it("shouldn't return error with valid product", () => {
    const product = ProductMotherObject.valid();
    const result = productValidator(product);

    const expected = { result: true, errors: [] };

    expect(result).to.be.deep.equal(expected);
  });

  describe("Product validation rules", () => {
    it("should return an object error when creating a Product with invalid id", () => {
      const product = ProductMotherObject.withInvalidId();
      const result = productValidator(product);

      const expected = {
        result: false,
        errors: [
          "id: invalid length, current [1] expected to be between 2 and 20 characters",
        ],
      };

      expect(result).to.be.deep.equal(expected);
    });

    it("should return an object error when creating a Product with invalid name", () => {
      const product = ProductMotherObject.withInvalidName();
      const result = productValidator(product);

      const expected = {
        result: false,
        errors: [
          "name: invalid format, current [abc123] expected to be only words",
        ],
      };

      expect(result).to.be.deep.equal(expected);
    });

    it("should return an object error when creating a Product with invalid price", () => {
      const product = ProductMotherObject.withInvalidPrice();
      const result = productValidator(product);

      const expected = {
        result: false,
        errors: [
          "price: invalid format, current [2000] expected to be between 1 and 1000",
        ],
      };

      expect(result).to.be.deep.equal(expected);
    });

    it("should return an object error when creating a Product with invalid category", () => {
      const product = ProductMotherObject.withInvalidCategory();

      const result = productValidator(product);

      const expected = {
        result: false,
        errors: [
          "category: invalid format, current [pets] expected to be eletronic or organic",
        ],
      };

      expect(result).to.be.deep.equal(expected);
    });
  });
});
