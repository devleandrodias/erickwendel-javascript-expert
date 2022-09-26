import { NotImplementedException } from "../../utils/execeptions.js";

export class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name);
  }

  _create(data) {
    throw new NotImplementedException(this._create.name);
  }

  /**
   * Padrao Martin Fowler
   *
   * A proposta do padrao eh garantir um fluxo de metodos, definando uma sequencia a ser executada
   *
   * Esse create eh a implementacao efetiva do Template Method
   */

  create(data) {
    const isValid = this._validateRequiredFields(data);

    if (!isValid) throw new Error("Invalid data!");

    return this._create(data);
  }
}
