const assert = require("assert");

const myMap = new Map();

// podem ter qualquer coisa como chave
myMap
  .set(1, "one")
  .set("Erick", { text: "two" })
  .set(true, () => "hello");

// Usando um constructor
const myMapWithConstructor = new Map([
  [1, "one"],
  ["Erick", { text: "two" }],
  [true, () => "hello"],
]);

// console.log(myMap.get(1));
// console.log(myMap.get(true));

assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Erick"), { text: "two" });
assert.deepStrictEqual(myMap.get(true)(), "hello");

// Em objects a chave só pode ser string ou symbol (number é coergido para string)
const onlyReferenceWorks = { id: 1 };

myMap.set(onlyReferenceWorks, { name: "Erick" });

console.log("get", myMap.get(onlyReferenceWorks));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: "Erick" });

// Utilitários

// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4);

// - Para verificar se um item existe no objeto
// item.key = se não existir, retorna undefined
// if() coerção para boolean e retorna false
// O jeito certo em object é ({name: 'Erick'}).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// - Para remover um item do objeto
// delete item.id
// Imperformático para o JavaScript
assert.ok(myMap.delete(onlyReferenceWorks));

// - Não dá para iterar em Objects diretamente
// Tem que transformar com o Object.entries(item)
for (const [key, value] of myMap) {
  console.log({ key, value });
}

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento

// ({}).toString() === '[object Object]'
// ({toString: () => 'Hey!'}).toString() === 'Hey!'

// Qualquer chave pode colidir com as propriedades herdadas do objeto como constructor, toString, valueOf, etc

const actor = {
  name: "Xuxa",
  toString: "Queen: Xuxa da Silva",
};

// Não tem restrição de nome de chave
myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Não da para limpar um obj sem reassina-lo
myMap.clear();

assert.deepStrictEqual([...myMap.keys()], []);

/**
 * Quando usar um Map ao invés do Objet
 *
 * - Quando precisar adicionar chaves com frequência
 * - Quando precisar verificar se chave existe de forma semântica
 * - Quando você precisa que o objeto vai servir de 'Banco de Dados'
 * - Quando você precisa limpar a referência após o uso
 */

// -- WeakMap

// Pos ser coletado após perder as referências
// Usado usado em casos beeem específicos
// Tem a maioria dos benefícios do Map
// MAS não é iterável
// Só chaves de referência e que você já conheça
// Mais leve e prevê leak de memória, pq depois que as instâncias saem da memória, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: "Flash" };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.has(hero);
// weakMap.delete(hero);
