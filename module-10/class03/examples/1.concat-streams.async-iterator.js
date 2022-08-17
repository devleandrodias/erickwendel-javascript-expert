import { pipeline } from 'stream/promises'

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

// Writable stream
async function* output(stream) {
  for await (const data of stream) {
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`);
  }
}

// Passthrough stream
async function* merge(streams) {
  for (const readable of streams) {
    readable.setEncoding('utf8')
    for await (const chunk of readable) {
      for (const line of chunk.trim().split(/\n/)) {
        yield line
      }
    }
  }
}

await pipeline(
  merge(results),
  output
)