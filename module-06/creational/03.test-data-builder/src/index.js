/**
 * ProductId: shoud be between 2 and 20 characters
 * Name: should be only words
 * Price: should be from zero to a tousand
 * Category: should be eletronic or organic
 */

function productValidator(product) {
  const errors = [];

  if (!(product.id && product.id.length >= 2 && product.id.length <= 20)) {
    errors.push(
      `id: invalid length, current [${product.id}] expected to be between 2 and 20 characters`
    );
  }

  if (/(\W|\d)/.test(product.name)) {
    errors.push(
      `name: invalid format, current [${product.name}] expected to be only words`
    );
  }

  if (!(product.price >= 1 && product.price <= 1000)) {
    errors.push(
      `price: invalid format, current [${product.price}] expected to be between 1 and 1000`
    );
  }

  if (!["eletronic", "organic"].includes(product.category)) {
    errors.push(
      `category: invalid format, current [${product.category}] expected to be eletronic or organic`
    );
  }

  return {
    result: errors.length === 0,
    errors,
  };
}

module.exports = { productValidator };
