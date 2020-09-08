import { HttpPostClient, HttpPostParams } from '../../presentation/protocols/http-post-client'
import { HttpResponse, HttpRequest } from '../../presentation/protocols/http'
import axios from 'axios'

export class AxiosPostGeocodingAdapter implements HttpPostClient {
  private readonly data: HttpPostParams

  constructor (url: string, body: any) {
    this.data = {
      url,
      body
    }
  }

  async post (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { latitude, longitude } = httpRequest.body

    const { url, body } = this.data

    body.location.latLng = {
      lat: latitude,
      lng: longitude
    }

    const { status, data } = await axios.post(url, body)

    return new Promise(resolve => resolve({
      statusCode: status,
      body: data.results
    }))
  }
}
