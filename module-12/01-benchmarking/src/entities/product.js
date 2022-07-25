export default class Product {
  constructor({ description, name, price, tmpProperty, activePromoId }) {
    this.name = name
    this.price = price
    this.description = description
    this.tmpProperty = tmpProperty
    this.activePromoId = activePromoId ?? 0
  }
}