import database from "../database.js";

import { CartGood, CartBad } from "./entities/cart.js";

const cartBad = new CartBad(database);
const cartGood = new CartGood(database);

console.log(cartBad);
console.log(cartGood);
