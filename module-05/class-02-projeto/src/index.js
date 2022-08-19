"use strict";

const { join } = require("path");
const { readFile } = require("fs/promises");

const pdf = require("pdf-parse");

(async () => {
  const dataBuffer = await readFile(
    join(__dirname, "./../../docs/english2.pdf")
  );

  const data = await pdf(dataBuffer);

  console.log(data);
})();
