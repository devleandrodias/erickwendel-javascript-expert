import { createWriteStream } from 'fs'
import { Readable, Transform, Writable } from 'stream'


const readable = Readable({
  read() {
    for (let index = 0; index < 1e5; index++) {
      const person = { id: Date.now(), name: `Leandro-${index}` }
      const data = JSON.stringify(person)
      this.push(data)
    }

    this.push(null)
  }
})

const mapHeaders = Transform({
  transform(chunk, _, callback) {
    this.counter = this.counter ?? 0

    if (this.counter) {
      return callback(null, chunk)
    }

    this.counter++
    callback(null, "id,name\n".concat(chunk))
  }
})

const mapFields = Transform({
  transform(chunk, _, callback) {
    const person = JSON.parse(chunk)
    const result = `${person.id},${person.name.toUpperCase()}\n`
    callback(null, result)
  }
})

const writable = Writable({
  write(chunk, _, callback) {
    console.log('msg => ', chunk.toString())
    callback()
  }
})

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // .pipe(writable)
  // .pipe(process.stdout)
  .pipe(createWriteStream('output.csv'))

pipeline.on('end', () => console.log('Finished process'))