"use strict";

const { join } = require("path");
const { readFile } = require("fs/promises");

const pdf = require("pdf-parse");

(async () => {
  const path = join(__dirname, "./../../../docs/contract.pdf");

  const dataBuffer = await readFile(path);

  const data = await pdf(dataBuffer);

  console.log(data.text);
})();
