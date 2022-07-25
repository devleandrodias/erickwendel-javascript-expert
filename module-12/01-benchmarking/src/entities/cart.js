import { v4 as uuid } from 'uuid'
import { randomUUID } from 'crypto'

import Product from "./product.js"

export class CartBad {
  constructor({ at, products }) {
    this.id = uuid()
    this.at = at
    this.products = this.removeUndefinedProps(products)
    this.total = this.getCartPrice()
  }

  removeUndefinedProps(products) {
    const productEntities = products
      .filter(product => !!Reflect.ownKeys(product).length)
      .map(product => new Product(product))

    // Remove undefined properties
    return JSON.parse(JSON.stringify(productEntities));
  }

  getCartPrice() {
    return this.products
      .map(product => product.price)
      .reduce((prev, next) => prev + next, 0)
  }
}

export class CartGood {
  constructor({ at, products }) {
    this.id = randomUUID()
    this.at = at
    this.products = this.removeUndefinedProps(products)
    this.total = this.getCartPrice()
  }

  removeUndefinedProps(products) {
    const result = []

    for (const product of products) {
      const keys = Reflect.ownKeys(product);
      if (keys.length) continue;
      keys.forEach(key => product[key] || Reflect.deleteProperty(product, key));
      result.push(new Product(product))
    }

    return result;
  }


  getCartPrice() {
    let price = 0;
    for (product of this.products) {
      price += product.price;
    }
    return price;
  }
}