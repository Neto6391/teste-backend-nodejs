import { HttpResponse, HttpRequest, Controller } from '../../presentation/controllers/signup/signup-protocols'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { CacheControllerDecorator } from './cache'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogErrorRepository
  private readonly cachedData?: CacheControllerDecorator

  constructor (controller: Controller, logErrorRepository: LogErrorRepository, cachedData?: CacheControllerDecorator) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
    this.cachedData = cachedData
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    let httpResponse
    if (this.cachedData) {
      const httpResponseEndereco = await this.cachedData.handle(httpRequest)

      if (httpResponseEndereco.statusCode === 500 || httpResponseEndereco.statusCode === 404) {
        await this.logErrorRepository.logError(httpResponse.body.message.stack)
      }
      httpRequest.body.endereco = httpResponseEndereco.body

      httpResponse = await this.controller.handle(httpRequest)

      if (httpResponse.statusCode === 500 || httpResponse.statusCode === 404) {
        await this.logErrorRepository.logError(httpResponse.body.message.stack)
      }
      return httpResponse
    } else {
      httpResponse = await this.controller.handle(httpRequest)
      if (httpResponse.statusCode === 500 || httpResponse.statusCode === 404) {
        await this.logErrorRepository.logError(httpResponse.body.message.stack)
      }
      return httpResponse
    }
  }
}
