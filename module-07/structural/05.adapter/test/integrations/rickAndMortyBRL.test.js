import axios from "axios";

import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import { Character } from "../../src/entities/character";

import fs from "fs/promises";
import { RickAndMortyBRL } from "../../src/business/integrations/rickAndMortyBRL";

describe("#RickAndMortyBRL", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("#getCharactersJSON should return a list of Character Entity", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/rick-and-morty-characters.json")
    );

    const expected = response.results.map((char) => new Character(char));

    jest.spyOn(axios, "get").mockReturnValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJson();
    expect(result).toStrictEqual(expected);
  });

  test("#getCharactersJSON should return an empty list if the API returns nothing", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/rick-and-morty-characters-empty.json")
    );

    const expected = response.results;

    jest.spyOn(axios, "get").mockReturnValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJson();
    expect(result).toStrictEqual(expected);
  });
});
