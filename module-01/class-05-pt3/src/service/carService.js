const { Tax } = require("../entities/tax");
const { Transaction } = require("../entities/transaction");
const { BaseRepository } = require("../repository/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.carRepository = new BaseRepository({ file: cars });
    this.currencyFormat = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  getRandomPositionFromArray(list) {
    return Math.floor(Math.random() * list.length);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    return carCategory.carIds[randomCarIndex];
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;

    const { then: tax } = this.taxesBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );

    const finalPrice = tax * price * numberOfDays;

    return this.currencyFormat.format(finalPrice);
  }

  async getAvaliableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    return await this.carRepository.find(carId);
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvaliableCar(carCategory);

    const finalPrice = this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);

    const dueDate = today.toLocaleDateString("pt-br", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const transaction = new Transaction({
      car,
      dueDate,
      customer,
      amount: finalPrice,
    });

    return transaction;
  }
}

module.exports = { CarService };
