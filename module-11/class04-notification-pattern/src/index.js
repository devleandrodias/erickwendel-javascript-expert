import { createServer } from "http";
import { HeroEntity } from './heroEntity.js'
import { statusCodes } from './utils/httpStatusCodes.js'

async function handler(req, res) {
  for await (const data of req) {
    try {
      const parsedData = JSON.parse(data);

      if (Reflect.has(parsedData, 'connectionError')) {
        throw new Error('Erro connecting BD...')
      }

      const hero = new HeroEntity(parsedData);

      if (!hero.isValid()) {
        res.writeHead(statusCodes.BAD_REQUEST)
        res.end(hero.notifications.join('\n'))
        continue
      }

      res.writeHead(statusCodes.OK)
      res.end()
    } catch (error) {
      res.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
      res.end()
    }
  }
}

createServer(handler).listen(4000, () => console.log("Server started"));