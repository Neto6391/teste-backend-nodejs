import { MongoHelper } from '../helpers/mongo-helper'
import { OcorrenceMongoRepository } from './ocorrence'

describe('Ocorrence Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const ocorrenceCollection = await MongoHelper.getCollection('ocorrences')
    await ocorrenceCollection.deleteMany({})
  })

  const makeSut = (): OcorrenceMongoRepository => {
    return new OcorrenceMongoRepository()
  }

  test('Should return an ocorrence on success', async () => {
    const sut = makeSut()
    const ocorrence = await sut.add({
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
    expect(ocorrence).toBeTruthy()
    expect(ocorrence.id).toBeTruthy()
    expect(ocorrence.latitude).toBe(-9.648198)
    expect(ocorrence.longitude).toBe(-36.76422)
    expect(ocorrence.denuncia).toEqual({
      titulo: 'any_titulo',
      descricao: 'any_descricao'
    })
    expect(ocorrence.endereco).toEqual({
      logradouro: 'any_logradouro',
      bairro: 'any_bairro',
      cidade: 'any_cidade',
      estado: 'any_estado',
      pais: 'any_pais',
      cep: 'any_cep'
    })
  })
})
