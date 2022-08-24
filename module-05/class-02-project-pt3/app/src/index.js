"use strict";

const { join } = require("path");
const { readFile } = require("fs/promises");

const pdf = require("pdf-parse");

const TextProcessorFacede = require("./textProcessorFacede");

(async () => {
  const path = join(__dirname, "./../../../docs/contract.pdf");

  const dataBuffer = await readFile(path);

  const data = await pdf(dataBuffer);

  const instance = new TextProcessorFacede(data.text);
  const people = instance.getPeopleFromPDF();
  console.log({ people });
})();
