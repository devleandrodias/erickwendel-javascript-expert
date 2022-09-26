export class Order {
  constructor({ customerId, amount, products }) {
    this.amount = amount;
    this.products = products;
    this.customerId = customerId;
  }
}
