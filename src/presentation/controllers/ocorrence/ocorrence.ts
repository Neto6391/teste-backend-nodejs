import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { AddOcorrence } from '../../../domain/usecases/add-ocorrence'
import { serverError, badRequest, ok } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'

export class OcorrenceController implements Controller {
  private readonly addOcorrence: AddOcorrence

  constructor (addOcorrence: AddOcorrence) {
    this.addOcorrence = addOcorrence
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['latitude', 'longitude', 'denunciante', 'denuncia', 'endereco']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { latitude, longitude, denunciante, denuncia, endereco } = httpRequest.body

      const account = await this.addOcorrence.add({
        latitude, longitude, denunciante, denuncia, endereco
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
