
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'
import { RedisHelper } from '../infra/db/redis/helpers/redis-helper'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    return RedisHelper.connect(env.redisPort, env.redisHost).then(async () => {
      const app = (await import('./config/app')).default
      app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    })
      .catch((err) => console.log(err))
  })
  .catch((err) => console.error(err))
