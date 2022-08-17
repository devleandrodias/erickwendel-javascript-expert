import { Duplex, Transform } from 'stream'

let count = 0;

const server = new Duplex({
  // Nao precisa trabalhar com buffer => Gasta mais memoria
  objectMode: true,
  encoding: 'utf8',
  read() {
    const everySecond = (internalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Leandro [${count}]\n`)
        return;
      }
      clearInterval(internalContext)
      this.push(null)
    }

    setInterval(function () {
      everySecond(this)
    });
  },
  // Eh como se fosse um objeto completamente diferente
  write(chunk, encoding, callback) {
    console.log(`[Writable] - Saving..`, chunk)
    callback()
  }
})

// * Provar que sao canais de comunicacao diferentes

// Write aciona o Writeable do Duplex
server.write(`[Duplex] - Hey this is a writable!\n`)

// On data => Loga o que rolou no push do readable
server.on('data', (msg) => console.log(`[Readable] - ${msg}`))

// Push deixa voce enviar mais dados
server.push(`[Duplex] - Hey this is alson a readable!\n`)

// Redireciona todos os dados de readable para o writable da duplex
// server.pipe(server)

const transformToUpperCase = new Transform({
  objectMode: true,
  transform(chunk, _, callback) {
    callback(null, chunk.toUpperCase())
  }
})

// O transform eh tambem um duplex, mas nao possuem comunicacao independente
transformToUpperCase.write('[Transform] Hello from write')
// O push vai ignorar o que vc tem na funcao transform
transformToUpperCase.push('[Transform] Hello from push')
server.pipe(transformToUpperCase).pipe(server)

// server.pipe(process.stdout)