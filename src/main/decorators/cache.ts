import { HttpResponse, HttpRequest, Controller } from '../../presentation/controllers/signup/signup-protocols'
import { AxiosPostGeocodingAdapter } from '../../infra/axios/axios-post-geocoding-adapter'
import { AddressRedisRepository } from '../../infra/db/redis/address-repository/address-repository'
import { ok } from '../../presentation/helpers/http-helper'

export class CacheControllerDecorator implements Controller {
  private readonly addressRedisRepository: AddressRedisRepository
  private readonly axiosPostGeocodingAdapter: AxiosPostGeocodingAdapter

  constructor (addressRedisRepository: AddressRedisRepository, axiosPostGeocodingAdapter: AxiosPostGeocodingAdapter) {
    this.addressRedisRepository = addressRedisRepository
    this.axiosPostGeocodingAdapter = axiosPostGeocodingAdapter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { latitude, longitude } = httpRequest.body
    const keyData: string = `${String(latitude)}-${String(longitude)}`
    const key: any = { key: keyData }

    const cacheData = await this.addressRedisRepository.get(key)
    let endereco
    if (!cacheData) {
      const httResponseAxios = await this.axiosPostGeocodingAdapter.post(httpRequest)

      if (httResponseAxios.statusCode === 500) return httResponseAxios

      const [{ locations = null }] = httResponseAxios.body

      if (!locations) {
        endereco = {
          logradouro: '',
          bairro: '',
          cidade: '',
          estado: '',
          pais: '',
          cep: ''
        }
      } else {
        const [{
          street,
          adminArea6,
          adminArea5,
          adminArea3,
          adminArea1,
          postalCode
        }] = locations

        endereco = {
          logradouro: street,
          bairro: adminArea6,
          cidade: adminArea5,
          estado: adminArea3,
          pais: adminArea1,
          cep: postalCode
        }
      }
      await this.addressRedisRepository.add(key, endereco)

      return ok(endereco)
    } else {
      const { id, ...data } = cacheData
      endereco = Object.assign({}, data)
      return ok(endereco)
    }
  }
}
