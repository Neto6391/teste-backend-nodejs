
import { Router } from 'express'
import { makeOcorrenceController } from '../factories/ocorrence'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/ocorrence', adaptRoute(makeOcorrenceController()))
}
