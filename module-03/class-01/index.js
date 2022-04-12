"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    console.log("arguments", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename, "utf8")).toString());
  }
}

// watch(__filename, async () => {
//   console.log("index.js!", event, filename);
// });

const file = new File();

/**
 * Dessa forma, ele ignora o 'this' da classe File
 * herda o this do watch!
 */

// watch(__filename, file.watch);

// 1º Alternativa para não herdar o this da função (Fica feio!)
// watch(__filename, (event, filename) => file.watch(event, filename));

// 2º Alternativa para não herdar o this da função (Sênior!)
// watch(__filename, file.watch.bind(file));

/**
 * O bind retorna uma função com o 'this' que se
 * mantém de file ignorando o watch
 */

/**
 * A diferença entre um e outro, é que você passa os argumentos
 * como array e outro uma lista de argumentos
 */

file.watch.call(
  { showContent: () => console.log("call: hey sinon") },
  null,
  __filename
);

file.watch.apply({ showContent: () => console.log("apply: hey sinon") }, [
  null,
  __filename,
]);
