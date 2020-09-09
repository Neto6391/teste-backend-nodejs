import { RedisHelper } from '../helpers/redis-helper'
import { AddAddressRepository } from '../../../../data/protocols/add-address-repository'
import { AddressModel } from '../../../../domain/models/address'
import { AddAddressModel, GetAddressModel } from '../../../../domain/usecases/add-address'

export class AddressRedisRepository implements AddAddressRepository {
  async add (coordinatesKey: GetAddressModel, addressData: AddAddressModel): Promise<AddressModel> {
    const addData = await RedisHelper.addKey(coordinatesKey, addressData)
    return addData
  }

  async get (key: GetAddressModel): Promise<AddressModel> {
    const addressData = await RedisHelper.getKey(key)
    return new Promise((resolve, reject) => {
      try {
        resolve(addressData)
      } catch (error) {
        reject(error)
      }
    })
  }
}
