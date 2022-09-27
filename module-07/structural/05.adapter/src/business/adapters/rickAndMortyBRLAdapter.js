import { RickAndMortyBRL } from "../integrations/rickAndMortyBRL.js";

export class RickAndMortyBRLAdpater {
  static async getCharacters() {
    return RickAndMortyBRL.getCharactersFromJson();
  }
}
