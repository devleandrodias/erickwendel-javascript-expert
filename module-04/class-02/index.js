const assert = require("assert");

// -- keys
const uniqueKey = Symbol("userName");

const user = {};

user["userName"] = "value for normal objects";
user[uniqueKey] = "value for symbol";

console.log(user);

console.log("getting normal objcts", user.userName);
console.log("getting normal objcts", user[Symbol("userName")]);
console.log("getting normal objcts", user[uniqueKey]);

assert.deepStrictEqual(user.userName, "value for normal objects");

// Sempre único em nível de endereço de memória
assert.deepStrictEqual(user[Symbol("userName")], undefined);

// Só consegue acessar propriedade caso o Symbol seja exportado
assert.deepStrictEqual(user[uniqueKey], "value for symbol");

// É difícil de pegar, mas não é secreto
console.log("symbols", Object.getOwnPropertySymbols(user));

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - Má prática (Não tem no codebase do Node)
user[Symbol.for("password")] = 123;
assert.deepStrictEqual(user[Symbol.for("password")], 123);

// Well Known Symbols

const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: [1, 2, 3],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.shift(),
      };
    },
  }),
};

for (value of obj) {
  console.log(value);
}

assert.deepStrictEqual([...obj], [1, 2, 3]);

// Criando um propriedade privada que só o MyDate tem acesso
const kItems = Symbol("kItems");

class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }

  [Symbol.toPrimitive](hint) {
    if (hint !== "string") throw new TypeError();

    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(item)
    );

    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction",
    }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }

  get [Symbol.toStringTag]() {
    return "WHAT?";
  }
}

const myDate = new MyDate(["2020-01-01"], ["2020-01-02"]);

const expectedDates = [new Date(2020, 01, 01), new Date(2020, 01, 02)];

assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  "[object WHAT?]"
);

assert.throws(() => myDate + 1, TypeError);

// Coerção explicita para chamar o toPrimitive
assert.deepStrictEqual(
  String(myDate),
  "31 de dezembro de 2019 e 01 de janeiro de 2020"
);

// Implementar o iterator
assert.deepStrictEqual([...myDate], expectedDates);

// (async () => {
//   for await (const item of myDate) {
//     console.log(item);
//   }
// })();

(async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepStrictEqual(dates, expectedDates);
})();
