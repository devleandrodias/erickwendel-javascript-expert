import { Readable, Writable } from 'stream'

// Fonte de dados
const readable = Readable({
  read() {
    this.push('Hello World 1.')
    this.push('Hello World 2.')
    this.push('Hello World 3.')

    // Informa que os dados acabaram
    this.push(null)
  }
})

// Saida de dados
const writable = Writable({
  write(chunk, encoding, callback) {
    console.log('msg => ', chunk.toString())
    callback()
  }
})

// Writable eh sempre a saida => Imprimir, Salvar, Ignorar
readable.pipe(writable)