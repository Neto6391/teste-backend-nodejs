import { DbAddOcorrence } from './db-add-ocorrence'
import { AddOcorrenceModel, OcorrenceModel, AddOcorrenceRepository } from './db-add-ocorrence-protocols'

const makeOcorrenceRepository = (): AddOcorrenceRepository => {
  class AddOcorrenceRepositoryStub implements AddOcorrenceRepository {
    async add (OcorrenceData: AddOcorrenceModel): Promise<OcorrenceModel> {
      return new Promise(resolve => resolve(makeFakeOcorrence()))
    }
  }

  return new AddOcorrenceRepositoryStub()
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

const makeFakeOcorrenceData = (): AddOcorrenceModel => ({
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
  sut: DbAddOcorrence
  addOcorrenceRepositoryStub: AddOcorrenceRepository
}

const makeSut = (): SubTypes => {
  const addOcorrenceRepositoryStub = makeOcorrenceRepository()
  const sut = new DbAddOcorrence(addOcorrenceRepositoryStub)

  return {
    sut,
    addOcorrenceRepositoryStub
  }
}

describe('DbAddOcorrenceUsecase', () => {
  test('Should call AddOcorrenceRepository with correct values', async () => {
    const { sut, addOcorrenceRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addOcorrenceRepositoryStub, 'add')
    await sut.add(makeFakeOcorrenceData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeOcorrenceData())
  })
})
