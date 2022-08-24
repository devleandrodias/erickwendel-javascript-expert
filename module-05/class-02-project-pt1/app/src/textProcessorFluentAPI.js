/**
 * O objetivo do Fluent API eh executar tarefas como
 * um pipeline step by step e chamar o build no final
 *
 * Muito similar ao padrao Builder, a diferenca eh que aqui eh sobre processos
 *
 * O builder eh sobre construcao de objetos
 */

class TextProcessorFluentAPI {
  // Propriedade privada!

  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    // ?<= fala que vai extrair os dados que virao depois desse grupo
    // [contratante|contratada] ou um ou outro, (e tem a flag no fim da expressao pra pegar maiusculo e minusculo)
    // :\s{1} vai procurar o caracter literal do dois pontos seguindo de um espaco
    // tudo acima fica dentro de um paranteses para falar "vamos pegar daí para frente"

    // (?!s) negative look around, vai ignorar os contratantes do fim do documento (que tem só espaco a frente deles)
    // .*\n pega qualquer coisa até o primeiro \n
    // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

    // $ informar que a pesquisa acaba no fim da linha
    // g -> global
    // m -> multiline
    // i -> insensitive

    const mathPerson = new RegExp(
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
    );

    // console.log("onlyPerson", mathPerson.test(this.#content));
    const onlyPerson = this.#content.match(mathPerson);

    this.#content = onlyPerson;

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
