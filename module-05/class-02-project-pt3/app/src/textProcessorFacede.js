const TextProcessorFluentAPI = require("./textProcessorFluentAPI");

class TextProcessorFacede {
  #textProcessorFluentAPI;

  constructor(content) {
    this.#textProcessorFluentAPI = new TextProcessorFluentAPI(content);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyCaracters()
      .mapPerson()
      .build();
  }
}

module.exports = TextProcessorFacede;
