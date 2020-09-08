import { HttpResponse, HttpRequest, Controller } from '../../presentation/controllers/signup/signup-protocols'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { AxiosPostGeocodingAdapter } from '../../infra/axios/axios-post-geocoding-adapter'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogErrorRepository
  private readonly axiosPostGeocodingAdapter: AxiosPostGeocodingAdapter

  constructor (controller: Controller, logErrorRepository: LogErrorRepository, axiosPostGeocodingAdapter?: AxiosPostGeocodingAdapter) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
    this.axiosPostGeocodingAdapter = axiosPostGeocodingAdapter
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!this.axiosPostGeocodingAdapter) {
      const httpResponse = await this.controller.handle(httpRequest)
      if (httpResponse.statusCode === 500) {
        await this.logErrorRepository.logError(httpResponse.body.message.stack)
      }
      return httpResponse
    } else {
      const httResponseAxios = await this.axiosPostGeocodingAdapter.post(httpRequest)
      if (httResponseAxios.statusCode === 500) {
        await this.logErrorRepository.logError(httResponseAxios.body.message.stack)
      }

      const [{ locations = null }] = httResponseAxios.body
      let endereco
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
        httpRequest.body.endereco = endereco
      }
    }
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500 || httpResponse.statusCode === 404) {
      await this.logErrorRepository.logError(httpResponse.body.message.stack)
    }
    return httpResponse
  }
}
