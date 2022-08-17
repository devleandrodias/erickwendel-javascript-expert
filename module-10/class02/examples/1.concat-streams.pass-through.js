import { Writable, PassThrough } from 'stream'

import axios from 'axios';

const API_1 = 'http://localhost:4000';
const API_2 = 'http://localhost:5000';

const requests = await Promise.all([
  axios({
    method: 'get',
    url: API_1,
    responseType: 'stream'
  }),
  axios({
    method: 'get',
    url: API_2,
    responseType: 'stream'
  })
])

const results = requests.map(({ data }) => data)

const output = Writable({
  write(chunk, _, callback) {
    const data = chunk.toString().replace(/\n/, "")
    // ?=- => Faz procurar a partir do - e olhar para traz
    // :"(?<name>.*) => Procura pelo conteudo dentro das aspas apos os dois pontos e extrai somente o name

    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`);
    callback()
  }
})

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // impede que a stream feche sozinha
    current.pipe(prev, { end: false })

    // como colocamos end: false, vamos manipular manualmente quando o nosso current 
    // terminar. Quando ele terminar, vamos verificar se todos no pipeline se encerraram
    // ele vai então forcar a cadeia do anterior a se fechar
    current.on('end', () => items.every(s => s.ended) && prev.end())

    return prev

  }, new PassThrough())
}

merge(results).pipe(output)