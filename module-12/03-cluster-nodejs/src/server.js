import { createServer } from 'http'
import { appendFile } from 'fs/promises'

export function initializeServer() {

  async function handler(_, response) {
    await appendFile('./log.txt', `processed ${process.pid}\n`)
    const result = Array
      .from({ length: 1e3 }, _ => Math.floor(Math.random() * 40))
      .reduce((prev, next) => prev + next, 0)

    response.end(result.toString())
  }

  createServer(handler)
    .listen(5000, () => { console.log(`Server is running on port 5000 | PID: ${process.pid}`) })

  setTimeout(() => process.exit(1), Math.random() * 1e4)
}