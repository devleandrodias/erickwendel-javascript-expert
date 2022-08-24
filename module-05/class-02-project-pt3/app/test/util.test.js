const { expect } = require("chai");
const { describe, it } = require("mocha");
const { InvalidRegexError, evaluateRegex } = require("../src/util");

describe("Util", () => {
  it("#evaluateRegex should throw an error using an unsafe regex", () => {
    const unsafeRegex = new RegExp(/^([a-z|A-Z|0-9]+\s?)+$/);

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
