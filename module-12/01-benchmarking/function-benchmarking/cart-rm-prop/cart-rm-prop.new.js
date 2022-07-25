import Product from "../../src/entities/product.js"

export default class CartRmPropNew {
  constructor({ products }) {
    this.products = this.removeUndefinedProps(products)
  }

  removeUndefinedProps(products) {
    const result = []

    for (const product of products) {
      const keys = Reflect.ownKeys(product);
      if (keys.length) continue;


      // 01
      // keys.forEach(key => product[key] || delete product[key]);

      // 02
      keys.forEach(key => product[key] || Reflect.deleteProperty(product, key));

      // 03
      // let newObject = {}

      // keys.forEach(key => {
      //   if (!keys[key]) return;
      //   newObject[key] = product[key];
      // })

      result.push(new Product(product))
    }

    return result;
  }
}