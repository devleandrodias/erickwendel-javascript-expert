import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import { RickAndMortyBRLAdpater } from "../../src/business/adapters/rickAndMortyBRLAdapter";
import { RickAndMortyBRL } from "../../src/business/integrations/rickAndMortyBRL";

describe("#RickAndMortyBRLAdpater", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharacters should be an adpater for RickAndMortyBRLAdpater.getCharacterJSON", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJson.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyBRLAdpater.getCharacters();

    expect(result).toEqual([]);
    expect(brlIntegration).toHaveBeenCalled();
  });
});
