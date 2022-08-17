import http, { request } from 'http'
import { Readable } from 'stream'

// Request => ReadableStream
// Response => WritableStream

function api1(request, response) {
  // response.write('teste01\n')
  // response.write('teste02\n')
  // response.write('teste03\n')
  // request.pipe(response)

  let count = 0;
  const maxItems = 99;
  const readable = Readable({
    read() {
      const everySecond = (internalContext) => {
        if (count++ <= maxItems) {
          this.push(JSON.stringify({ id: Date.now() + count, name: `Leandro-${count}` }) + "\n")
          return;
        }

        clearInterval(internalContext)
        this.push(null)
      }

      setInterval(function () { everySecond(this) })
    }
  })

  readable.pipe(response)
}

function api2(request, response) {
  let count = 0;
  const maxItems = 99;
  const readable = Readable({
    read() {
      const everySecond = (internalContext) => {
        if (count++ <= maxItems) {
          this.push(JSON.stringify({ id: Date.now() + count, name: `Thaisa-${count}` }) + "\n")
          return;
        }

        clearInterval(internalContext)
        this.push(null)
      }

      setInterval(function () { everySecond(this) })
    }
  })

  readable.pipe(response)
}

http.createServer(api1).listen(4000, () => {
  console.log('Server is running on port 4000')
})

http.createServer(api2).listen(5000, () => {
  console.log('Server is running on port 5000')
})