"use strict";

const assert = require("assert");

// gerantir semântica e segurança em objetos

// -- apply
const myObject = {
  add(myBalue) {
    return this.arg1 + this.arg2 + myBalue;
  },
};

assert.deepStrictEqual(myObject.add.apply({ arg1: 1, arg2: 2 }, [3]), 6);

// Um problema que pode acontecer (Raro)
// Function.prototype.apply = () => {
//   throw new TypeError("Eita!");
// };

// Esse aqui pode acontecer!
myObject.add.apply = function () {
  throw new TypeError("Eita2!");
};

assert.throws(() => myObject.add.apply({}, []), {
  name: "TypeError",
  message: "Eita2!",
});

// usando reflect
const result = Reflect.apply(myObject.add, { arg1: 1, arg2: 2 }, [3]);
assert.deepStrictEqual(result, 6);

// -- apply

// -- defineProperty
function MyDate() {}

// Feio pra Kct, tudo é object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, "withObject", { value: () => "Hey object!" });

// Agora faz mais sentido
Reflect.defineProperty(MyDate, "withReflect", { value: () => "Hey reflect!" });

assert.deepStrictEqual(MyDate.withObject(), "Hey object!");
assert.deepStrictEqual(MyDate.withReflect(), "Hey reflect!");

// -- defineProperty

// -- deleteProperty

// Imperformático evitar ao máximo
const withDelete = { user: "Erick" };
delete withDelete.user;
assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

// Sempre que precisar deletear propriedades, usar Reflect
const withReflect = { user: "Erick" };
Reflect.deleteProperty(withReflect, "user");
assert.deepStrictEqual(withReflect.hasOwnProperty("user"), false);

// -- deleteProperty

// -- get

// Deveriamos fazer um get somente em instâncias de referência
assert.deepStrictEqual((1)["username"], undefined);

// com reflection, uma execeção é lançada
assert.throws(() => Reflect.get(1, "username"), TypeError);

// -- get

// -- has

// O in procura chave do objeto
assert.ok("superman" in { superman: "Clark" });

// Assim fica bem melhor
assert.ok(Reflect.has({ superman: "Clark" }, "superman"));

// -- has

// -- ownKeys

{
  const user = Symbol("user");

  const myObject = {
    id: 1,
    [Symbol.for("password")]: 123,
    [user]: "Erick",
  };

  const objectKeys = [
    ...Object.getOwnPropertyNames(myObject),
    ...Object.getOwnPropertySymbols(myObject),
  ];

  assert.deepStrictEqual(objectKeys, ["id", Symbol.for("password"), user]);

  // com reflection só um método
  assert.deepStrictEqual(Reflect.ownKeys(myObject), [
    "id",
    Symbol.for("password"),
    user,
  ]);
}
