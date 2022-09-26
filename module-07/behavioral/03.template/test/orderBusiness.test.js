import { describe, expect, test, jest, beforeEach } from "@jest/globals";

import { Order } from "../src/entities/order.js";
import { OrderBusiness } from "../src/business/orderBusiness.js";

describe("Test suite for Template Method design pattern", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("#OrderBusiness", () => {
    test("execution Order Business without Template Method", () => {
      const order = new Order({
        customerId: 1,
        amount: 10000,
        products: [{ describe: "Macbook Air" }],
      });

      /**
       * Todos os devs devem obrigatoriamente seguir a risca esse fluxo de execucao
       * Se algum chamar a funcao de validacao porde quebrar todo o sistema
       */

      const orderBusiness = new OrderBusiness();

      const isValid = orderBusiness._validateRequiredFields(order);
      expect(isValid).toBeTruthy();

      const result = orderBusiness._create(order);
      expect(result).toBeTruthy();
    });

    test("execution Order Business whit Template Method", () => {
      const order = new Order({
        customerId: 1,
        amount: 10000,
        products: [{ describe: "Macbook Air" }],
      });

      const orderBusiness = new OrderBusiness();

      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      );
      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      );

      /**
       * Com template method, a sequencia de passos eh sempre executada
       * evita a replica de logica
       */

      const result = orderBusiness.create(order);

      expect(result).toBeTruthy();
      expect(calledValidationFn).toHaveBeenCalled();
      expect(calledCreateFn).toHaveBeenCalled();
    });
  });
});
