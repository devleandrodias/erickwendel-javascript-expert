const { BaseRepository } = require("../repository/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  getRandomPositionFromArray(list) {
    return Math.floor(Math.random() * list.length);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    return carCategory.carIds[randomCarIndex];
  }

  async getAvaliableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    return await this.carRepository.find(carId);
  }
}

module.exports = { CarService };
