import { promisify } from 'util'
import { createServer } from 'http'
import { MongoClient } from 'mongodb'

async function dbConnect() {
  const client = new MongoClient('mongodb://localhost:27018', { useNewUrlParser: true })

  await client.connect()

  console.log('MongoDB connected...')

  const db = client.db('comics')

  return {
    collections: { heroes: db.collection('heroes') },
    client
  }
}

const { collections, client } = await dbConnect()

async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data);

      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString()
      })

      const heroes = await collections.heroes.find().toArray();

      res.writeHead(200)
      res.write(JSON.stringify(heroes))
    } catch (error) {
      console.error('**ERROR**', error)
      res.writeHead(500)
      res.write(JSON.stringify({ message: 'Internal server error' }))
    } finally {
      res.end()
    }
  }
}


/**
 * $ curl localhost:6000 -X POST --data '{"name": "Flash"}' | jq
 */

/**
  ["SIGINT", "SIGFPE", "SIGKILL", "SIGILL", "SIGSEGV", "SIGTERM", "SIGCHLD"]
  ["SIGABRT", "SIGBREAK", "CTRL_C_EVENT", "CTRL_CLOSE_EVENT", "CTRL_BREAK_EVENT"]
  ["SIGUSR1", "SIGPIPE", "SIGSTOP", "SIGBUS", "SIGHUP", "SIGWINCH", "SIGFPE"]
 */

const server = createServer(handler).listen(6000, () => {
  console.log('Server listening on port 6000', process.pid)
})

const onStop = async (signal) => {
  console.info(`\n${signal} received.`)

  console.log('Closing http server...');
  await promisify(server.close.bind(server))()
  console.log('Http server has closed')

  console.log('Closing mongo client...');
  await client.close()
  console.log('Mongo client has closed')

  process.exit(0)
}

['SIGINT', 'SIGTERM'].forEach(event => { process.on(event, onStop) })

// SIGINT => CTRL + C
// process.on('SIGINT', (signal) => {
//   console.info(`\n${signal} received.`)
// })

// Kill
// process.on('SIGTERM', (sigterm) => {
//   console.info(`\n${sigterm} received.`)
// })
