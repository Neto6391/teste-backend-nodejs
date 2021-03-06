import { Express, Router } from 'express'
import { resolve } from 'path'
import * as fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/v1', router)
  fg.sync('**/src/main/routes/**routes.ts').map(async file => (await import(`${resolve('')}/${file}`)).default(router))
}
