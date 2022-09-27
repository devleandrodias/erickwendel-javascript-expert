import { RickAndMortyBRLAdpater } from "./business/adapters/rickAndMortyBRLAdapter.js";
import { RickAndMortyUSAAdpater } from "./business/adapters/rickAndMortyUSAAdapter.js";

const data = [RickAndMortyUSAAdpater, RickAndMortyBRLAdpater].map(
  (integration) => integration.getCharacters()
);

const all = await Promise.allSettled(data);

const successes = all
  .filter(({ status }) => status === "fulfilled")
  .map(({ value }) => value)
  .reduce((pv, cv) => pv.concat(cv), []);

const errors = all.filter(({ status }) => status === "rejected");

console.table(successes);
console.table(errors);
