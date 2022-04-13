const assert = require("assert");

/**
 * Generators, Iterators e Async Iterators
 *
 * Generators: Fazer com que as funções virem listas e que entreguem os dados sob demanda
 */

function* calcualte(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield "Hello";
  yield "-";
  yield "Advance JavaScript!";
  yield* calcualte(20, 10);
}

const generator = main();

assert.deepStrictEqual(generator.next(), { value: "Hello", done: false });

assert.deepStrictEqual(generator.next(), { value: "-", done: false });

assert.deepStrictEqual(generator.next(), {
  value: "Advance JavaScript!",
  done: false,
});

assert.deepStrictEqual(generator.next(), { value: 200, done: false });

assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), [
  "Hello",
  "-",
  "Advance JavaScript!",
  200,
]);

assert.deepStrictEqual([...main()], ["Hello", "-", "Advance JavaScript!", 200]);

// async interators

const { readFile, stat, readdir } = require("fs/promises");

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname);
  yield { dir };
}

// function* promisify() {
//   yield readFile(__filename);
//   yield Promise.resolve("Hey dude!");
// }

// console.log("promisify()", [...promisify()]);

// Promise.all([...promisify()]).then(([file, name]) => {
//   console.log("Promise.all()", file.toString(), name);
// });

(async () => {
  for await (const value of systemInfo()) {
    console.log(value);
  }
})();
