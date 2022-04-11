console.log(true + 2);
console.log(true - 2);
console.log(true * 2);
console.log("21" + true);
console.log("21" - true);
console.log(9999999999999999);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
console.log(3 > 2);
console.log(2 > 1);
console.log(3 > 2 > 1);
console.log("21" - -1);
console.log("1" == 1);
console.log("1" === 1);
console.log("B" + "a" + +"a" + "a");

// ------------------------------------------------------------

console.log(String(123), typeof String(123));

console.assert(String(123) === "123", "explicit convertion to string");
console.assert(123 + "" === "123", "implicit convertion to string");

if (null || 1) console.log("ae!");
if ("hello" || 1) console.log("ae2!");

const r1 = "hello" || 1;
const r2 = null || 1;
console.log({ r1, r2 });

console.assert(("hello" || 123) === "hello", "|| returns first element");
console.assert(("hello" && 123) === 123, "&& returns the last element");

// ------------------------------------------------------------

const person1 = {
  name: "John",
  age: 30,
};

console.log("P1", person1 + 1);

const person2 = {
  name: "John",
  age: 30,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
};

console.log("P2", person2 + 1);

const person3 = {
  name: "John",
  age: 30,
  // string: 1 se não for primitivo, chama o valueOf()
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  // number: 1 se não for primitivo, chama o toString()
  valueOf() {
    return 007;
  },
};

console.log("P3", person3 + 1); // valueOf()
console.log("P3", "".concat(person3)); // toString()

console.log("toString()", String(person3));
console.log("valueOf()", Number(person3));

const person4 = {
  name: "John",
  age: 30,
  toString() {
    console.log("hey!");
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return { hey: "dude" };
  },
};

console.log("toString()", String(person4));

// vai retornar NaN pois o toString retornou a string
console.log("valueOf()", Number(person4));

const person5 = {
  name: "John",
  age: 30,
  toString() {
    console.log("hey!");
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return { hey: "dude" };
  },

  // ele tem prioridade na parada!!
  [Symbol.toPrimitive](coercionType) {
    console.log(`try to convert to ${coercionType}`);
    const types = {
      string: JSON.stringify(this),
      number: "0007",
    };
    return types[coercionType] || types.string;
  },
};

// depois de adicionar o toPrimitive
console.log("String", String(person5));
console.log("Number", Number(person5));

// chama a conversão default! (Boolean)
console.log("Date", new Date(person5));
console.assert(person5 + 0 === `{"name":"John","age":30}${0}`, "toString()");

console.log("!!item is true?", !!person5);
console.assert(!!person5);

console.log("string.concat", "Ae".concat(person5));
console.assert("Ae".concat(person5) === 'Ae{"name":"John","age":30}');

console.log(
  "implicit + explicit coercion (using ==)",
  person5 == String(person5)
);

console.assert(person5 == String(person5));

const person6 = { ...person5, name: "Zézin", age: 20 };
console.log(person6);
console.assert(person6.name === "Zézin" && person6.age === 20);
