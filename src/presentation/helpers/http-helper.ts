
import { HttpResponse } from '../protocols'
import { ServerError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    message: error,
    code: 1
  }
})

export const notFoundAddress = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: {
    message: error,
    code: 2
  }
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: {
    message: new ServerError(error.stack),
    code: 0
  }
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
