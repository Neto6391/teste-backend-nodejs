import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { OcorrenceController } from './ocorrence'
import { AddOcorrence, AddOcorrenceModel } from '../../../domain/usecases/add-ocorrence'
import { OcorrenceModel } from '../../../domain/models/ocorrence'

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
})
