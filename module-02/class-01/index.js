const { deepStrictEqual } = require("assert");

let counter = 0;
let counter2 = counter;

counter2++;

const item = { counter: 0 };
const item2 = item;

item2.counter++;

console.log({ counter });
console.log({ counter2 });

console.log(item.counter);
console.log(item2.counter);

// tipo primitivo gera uma cópia em memória (Callstack)
deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

/**
 * tipo de referência, copia o endereço de memória,
 * e aponta para o mesmo lugar (Memory Heap)
 */

item2.counter++;
deepStrictEqual(item, { counter: 1 });

item.counter++;
deepStrictEqual(item2, { counter: 2 });
