import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import { RickAndMortyUSAAdpater } from "../../src/business/adapters/rickAndMortyUSAAdapter";
import { RickAndMortyUSA } from "../../src/business/integrations/rickAndMortyUSA";

describe("#RickAndMortyUSAAdpater", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharacters should be an adpater for RickAndMortyUSAAdpater.getCharacterJSON", async () => {
    const usaIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyUSAAdpater.getCharacters();

    expect(result).toEqual([]);
    expect(usaIntegration).toHaveBeenCalled();
  });
});
