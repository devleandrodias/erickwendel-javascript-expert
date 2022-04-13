const assert = require("assert");

// Maioria das vezes para Listas de itens únicos

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "1", "3"];

const arrConcat = arr1.concat(arr2);

// console.log(arrConcat.sort());

assert.deepStrictEqual(arrConcat.sort(), ["0", "1", "1", "2", "2", "3"]);

const mySet = new Set();

arr1.map((i) => mySet.add(i));
arr2.map((i) => mySet.add(i));

// console.log(mySet);
assert.deepStrictEqual(Array.from(mySet), ["0", "1", "2", "3"]);

// rest operators
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  "0",
  "1",
  "2",
  "3",
]);

// console.log("set.keys", mySet.keys());
// console.log("set.values", mySet.values()); // Só existe por conta do Map

// No array comum, para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes(0)

assert.ok(mySet.has("0"));

// Mesma teoria do Map, mas você sempre trabalha com a lista toda
// Não tem get, então você pode saber se o item está ou não no array e é isso
// Na documentação tem exemplos sobre como fazer uma inserção,
// saber o que tem em uma lista e não tem na outra e assim por diante

// tem nos dois arrays

const users1 = new Set(["Erick", "Mariazinha", "Xuxa da Silva"]);
const users2 = new Set(["Joãozinho", "Erick", "Júlio"]);

const intersection = new Set([...users1].filter((user) => users2.has(user)));
const diference = new Set([...users1].filter((user) => !users2.has(user)));

// console.log(intersection);
// console.log(diference);

assert.deepStrictEqual(Array.from(intersection), ["Erick"]);
assert.deepStrictEqual(Array.from(diference), ["Mariazinha", "Xuxa da Silva"]);

// WeakSet

// Mesma ideia do Weak
// Não é enumerável (itarável)
// Só trabalha com chaves como referência
// Só tem método simples

const user1 = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user1]);

weakSet.add(user2);
weakSet.has(user2);
weakSet.delete(user2);
