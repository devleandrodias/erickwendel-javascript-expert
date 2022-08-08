import { createServer } from "http";
import { statusCodes } from './utils/httpStatusCodes.js'
import { BusinessError } from "./errors/businessError.js";

function validateHero(hero) {
  if (Reflect.has(hero, 'connectionError')) {
    throw new Error('Erro connecting BD...')
  }

  if (hero.age < 20) {
    throw new BusinessError('Age must be greater than 20')
  }

  if (hero.name?.length < 3) {
    throw new BusinessError('Name must be at least 3 characters')
  }
}

async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data);
      validateHero(hero);
      console.log(hero);
      res.writeHead(statusCodes.OK)
      res.end()
    } catch (error) {
      if (error instanceof BusinessError) {
        res.writeHead(statusCodes.BAD_REQUEST)
        res.end(error.message)
        continue
      }

      res.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
      res.end()
    }
  }
}

createServer(handler).listen(4000, () => console.log("Server started"));