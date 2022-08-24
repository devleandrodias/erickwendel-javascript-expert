const { evaluateRegex } = require("./util");
const Person = require("./person");

class TextProcessorFluentAPI {
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const mathPerson = evaluateRegex(
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
    );

    const onlyPerson = this.#content.match(mathPerson);

    this.#content = onlyPerson;

    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map((line) => line.split(splitRegex));
    return this;
  }

  removeEmptyCaracters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);

    this.#content = this.#content.map((line) =>
      line.map((item) => item.replace(trimSpaces, ""))
    );

    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((line) => new Person(line));
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
