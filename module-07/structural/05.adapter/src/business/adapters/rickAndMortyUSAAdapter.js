import { RickAndMortyUSA } from "../integrations/rickAndMortyUSA.js";

export class RickAndMortyUSAAdpater {
  static async getCharacters() {
    return RickAndMortyUSA.getCharactersFromXML();
  }
}
