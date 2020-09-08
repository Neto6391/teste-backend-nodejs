import { badRequest, ok, serverError, notFoundAddress } from '../../helpers/http-helper'
import { MissingParamError, ServerError } from '../../errors'
import { OcorrenceController } from './ocorrence'
import { AddOcorrence, AddOcorrenceModel } from '../../../domain/usecases/add-ocorrence'
import { OcorrenceModel } from '../../../domain/models/ocorrence'
import { HttpRequest } from '../../protocols/http'
import { NotFoundAddressError } from '../../errors/not-found-address-error'

const makeAddOcorrence = (): AddOcorrence => {
  class AddOcorrenceStub implements AddOcorrence {
    async add (ocorrence: AddOcorrenceModel): Promise<OcorrenceModel> {
      return new Promise(resolve => resolve(makeFakeOcorrence()))
    }
  }
  return new AddOcorrenceStub()
}

const makeFakeOcorrence = (): OcorrenceModel => ({
  id: 'any_id',
  latitude: -9.648198,
  longitude: -36.76422,
  denunciante: {
    nome: 'any_nome',
    cpf: 'any_cpf'
  },
  denuncia: {
    titulo: 'any_titulo',
    descricao: 'any_descricao'
  },
  endereco: {
    logradouro: 'any_logradouro',
    bairro: 'any_bairro',
    cidade: 'any_cidade',
    estado: 'any_estado',
    pais: 'any_pais',
    cep: 'any_cep'
  }
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    latitude: -9.648198,
    longitude: -36.76422,
    denunciante: {
      nome: 'any_nome',
      cpf: 'any_cpf'
    },
    denuncia: {
      titulo: 'any_titulo',
      descricao: 'any_descricao'
    }
  }
})

interface SubTypes {
  sut: OcorrenceController
  addOcorrenceStub: AddOcorrence
}

const makeSut = (): SubTypes => {
  const addOcorrenceStub = makeAddOcorrence()
  const sut = new OcorrenceController(addOcorrenceStub)
  return {
    sut,
    addOcorrenceStub
  }
}

describe('Ocorrence Controller', () => {
  test('Should return 400 if no latitude is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        longitude: -36.76422,
        denunciante: {
          nome: 'any_nome',
          cpf: 'any_cpf'
        },
        denuncia: {
          titulo: 'any_titulo',
          descricao: 'any_descricao'
        }
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('latitude')))
  })

  test('Should return 400 if no longitude is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        denunciante: {
          nome: 'any_nome',
          cpf: 'any_cpf'
        },
        denuncia: {
          titulo: 'any_titulo',
          descricao: 'any_descricao'
        }
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('longitude')))
  })

  test('Should return 400 if no denunciante is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -36.76422,
        denuncia: {
          titulo: 'any_titulo',
          descricao: 'any_descricao'
        }
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('denunciante')))
  })

  test('Should return 400 if no denuncia is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -36.76422,
        denunciante: {
          nome: 'any_nome',
          cpf: 'any_cpf'
        },
        endereco: {
          logradouro: 'any_logradouro',
          bairro: 'any_bairro',
          cidade: 'any_cidade',
          estado: 'any_estado',
          pais: 'any_pais',
          cep: 'any_cep'
        }
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('denuncia')))
  })

  test('Should return 400 if no endereco is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        latitude: -9.648198,
        longitude: -36.76422,
        denunciante: {
          nome: 'any_nome',
          cpf: 'any_cpf'
        },
        denuncia: {
          titulo: 'any_titulo',
          descricao: 'any_descricao'
        }
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('endereco')))
  })

  test('Should call AddOcorrence with correct values', async () => {
    const { sut, addOcorrenceStub } = makeSut()
    const addSpy = jest.spyOn(addOcorrenceStub, 'add')
    const request = makeFakeRequest()
    request.body.endereco = {
      logradouro: 'any_logradouro',
      bairro: 'any_bairro',
      cidade: 'any_cidade',
      estado: 'any_estado',
      pais: 'any_pais',
      cep: 'any_cep'
    }
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith({
      latitude: -9.648198,
      longitude: -36.76422,
      denunciante: {
        nome: 'any_nome',
        cpf: 'any_cpf'
      },
      denuncia: {
        titulo: 'any_titulo',
        descricao: 'any_descricao'
      },
      endereco: {
        logradouro: 'any_logradouro',
        bairro: 'any_bairro',
        cidade: 'any_cidade',
        estado: 'any_estado',
        pais: 'any_pais',
        cep: 'any_cep'
      }
    })
  })

  test('Should return 500 if AddOcorrence throws', async () => {
    const { sut, addOcorrenceStub } = makeSut()
    jest.spyOn(addOcorrenceStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const request = makeFakeRequest()
    request.body.endereco = {
      logradouro: 'any_logradouro',
      bairro: 'any_bairro',
      cidade: 'any_cidade',
      estado: 'any_estado',
      pais: 'any_pais',
      cep: 'any_cep'
    }

    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if logradouro is not found', async () => {
    const { sut } = makeSut()

    const request = makeFakeRequest()
    request.body.endereco = {
      logradouro: '',
      bairro: 'any_bairro',
      cidade: 'any_cidade',
      estado: 'any_estado',
      pais: 'any_pais',
      cep: 'any_cep'
    }

    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(notFoundAddress(new NotFoundAddressError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const request = makeFakeRequest()
    request.body.endereco = {
      logradouro: 'any_logradouro',
      bairro: 'any_bairro',
      cidade: 'any_cidade',
      estado: 'any_estado',
      pais: 'any_pais',
      cep: 'any_cep'
    }

    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(makeFakeOcorrence()))
  })
})
