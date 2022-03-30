class Transaction {
  constructor({ customer, car, amount, dueDate }) {
    this.car = car;
    this.amount = amount;
    this.dueDate = dueDate;
    this.customer = customer;
  }
}

module.exports = { Transaction };
