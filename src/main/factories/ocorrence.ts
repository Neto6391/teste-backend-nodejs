import { DbAddOcorrence } from '../../data/usecases/add-ocorrence/db-add-ocorrence'
import { OcorrenceMongoRepository } from '../../infra/db/mongodb/ocorrence-repository/ocorrence'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { Controller } from '../../presentation/controllers/signup/signup-protocols'
import { LogControllerDecorator } from '../decorators/log'
import { OcorrenceController } from '../../presentation/controllers/ocorrence/ocorrence'
import { AxiosPostGeocodingAdapter } from '../../infra/axios/axios-post-geocoding-adapter'
import { CacheControllerDecorator } from '../decorators/cache'
import { AddressRedisRepository } from '../../infra/db/redis/address-repository/address-repository'
import env from '../config/env'

export const makeOcorrenceController = (): Controller => {
  const urlGeocoding = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${env.keyGeocoding}`
  const bodyRequestAxios = {
    location: {
      latLng: {
        lat: null,
        lng: null
      }
    },
    options: {
      thumbMaps: false
    },
    includeNearestIntersection: true,
    includeRoadMetadata: true
  }

  const ocorrenceMongoRepository = new OcorrenceMongoRepository()
  const dbAddOcorrence = new DbAddOcorrence(ocorrenceMongoRepository)
  const axiosPostGeocodingAdapter = new AxiosPostGeocodingAdapter(urlGeocoding, bodyRequestAxios)
  const addressRedisRepository = new AddressRedisRepository()
  const cacheControllerDecorator = new CacheControllerDecorator(addressRedisRepository, axiosPostGeocodingAdapter)
  const ocorrenceController = new OcorrenceController(dbAddOcorrence)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(ocorrenceController, logMongoRepository, cacheControllerDecorator)
}
