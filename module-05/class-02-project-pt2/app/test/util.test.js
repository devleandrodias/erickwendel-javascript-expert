const { expect } = require("chai");
const { describe, it } = require("mocha");
const { InvalidRegexError, evaluateRegex } = require("../src/util");

describe("Util", () => {
  it("#evaluateRegex should throw an error using an unsafe regex", () => {
    const unsafeRegex = new RegExp(/^([a-z|A-Z|0-9]+\s?)+$/);

    // Fica rodando em loop e quebra tudo!

    // Catastrophic Backtracking!

    // time node --eval "new RegExp(/^([a-z|A-Z|0-9]+\s?)+$/).test('Eaeeee man como vai voce e como vai voce e como vai voce?') && console.log('Legalzin')"

    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `This ${unsafeRegex} is unsafe dude!`
    );
  });

  it("#evaluateRegex should not throw an error using safe regex", () => {
    const sageRegex = new RegExp(/^([a-z])$/);
    expect(evaluateRegex(sageRegex)).to.be.ok;
  });
});
