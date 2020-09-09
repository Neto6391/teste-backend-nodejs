
import { createClient, RedisClient } from 'redis'
import { GetAddressModel, AddAddressModel } from '../../../../domain/usecases/add-address'

export const RedisHelper = {
  client: null as RedisClient,
  host: null as string,
  port: null as number,

  async connect (port: number, host: string): Promise<void> {
    this.port = port
    this.host = host
    this.client = createClient(port, host)
  },

  async disconnect (): Promise<void> {
    await this.client.quit()
    this.client = null
  },

  async getKey (keyData: GetAddressModel): Promise<any> {
    if (!this.client?.ping()) {
      await this.connect(this.port, this.host)
    }

    return new Promise((resolve, reject) => {
      this.client.hgetall(keyData.key, (err, reply) => {
        if (err) reject(err)
        else if (reply) resolve(reply)
        else resolve(null)
      })
    })
  },

  async addKey (keyData: GetAddressModel, data: AddAddressModel): Promise<any> {
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const cachedData = Object.assign({}, data, { id: hash })
    return new Promise((resolve) => {
      this.client.hmset(keyData.key, cachedData)
      resolve(cachedData)
    })
  }
}
