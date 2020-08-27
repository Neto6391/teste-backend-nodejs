
import { HttpResponse } from '../protocols'
import { ServerError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    message: error,
    code: 1
  }
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: {
    message: new ServerError(),
    code: 0
  }
})
