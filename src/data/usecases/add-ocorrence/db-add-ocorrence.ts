import { AddOcorrence, AddOcorrenceModel } from '../../../domain/usecases/add-ocorrence'
import { OcorrenceModel } from '../../../domain/models/ocorrence'
import { AddOcorrenceRepository } from './db-add-ocorrence-protocols'

export class DbAddOcorrence implements AddOcorrence {
  private readonly addOcorrenceRepository: AddOcorrenceRepository

  constructor (addOcorrenceRepository: AddOcorrenceRepository) {
    this.addOcorrenceRepository = addOcorrenceRepository
  }

  async add (ocorrenceData: AddOcorrenceModel): Promise<OcorrenceModel> {
    const ocorrence = await this.addOcorrenceRepository.add(ocorrenceData)
    return ocorrence
  }
}
