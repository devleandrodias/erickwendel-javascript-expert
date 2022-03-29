const { rejects, deepStrictEqual } = require("assert");

const { File } = require("./src/file");
const { error } = require("./src/constants");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";

    const result = await File.csvToJson(filePath);

    const expected = [
      {
        name: "Leandro Dias",
        id: 123,
        profession: "Desenvolvedor",
        birthDay: 2001,
      },
      {
        name: "Thaísa Castro",
        id: 245,
        profession: "Desenvolvedor",
        birthDay: 2000,
      },
      {
        name: "Beatriz Castro",
        id: 653,
        profession: "Desenvolvedor",
        birthDay: 2002,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
