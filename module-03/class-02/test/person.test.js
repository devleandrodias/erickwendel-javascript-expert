import chai from "chai";
const { expect } = chai;

import mocha from "mocha";
const { describe, it } = mocha;

import Person from "../src/person.js";

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "2 Carro,Bicicleta 5235 2010-09-15 2021-12-23"
    );

    const expected = {
      from: "2010-09-15",
      to: "2021-12-23",
      vehicles: ["Carro", "Bicicleta"],
      kmTraveled: "5235",
      id: "2",
    };

    expect(person).to.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      from: "2010-09-15",
      to: "2021-12-23",
      vehicles: ["Carro", "Bicicleta"],
      kmTraveled: "5235",
      id: "2",
    });

    const result = person.formatted("pt-BR");

    const expected = {
      id: 2,
      vehicles: "Carro e Bicicleta",
      kmTraveled: "5.235 km",
      from: "15 de setembro de 2010",
      to: "23 de dezembro de 2021",
    };

    expect(result).to.deep.equal(expected);
  });
});
