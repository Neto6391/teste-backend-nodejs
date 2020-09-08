import { HttpResponse, HttpRequest } from './http'

export type HttpPostParams = {
  url: string
  body?: any
}

export interface HttpPostClient {
  post: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
