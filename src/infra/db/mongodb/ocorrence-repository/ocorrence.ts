import { AddOcorrenceRepository } from '../../../../data/protocols/add-ocorrence-repository'
import { AddOcorrenceModel } from '../../../../domain/usecases/add-ocorrence'
import { OcorrenceModel } from '../../../../domain/models/ocorrence'
import { MongoHelper } from '../helpers/mongo-helper'

export class OcorrenceMongoRepository implements AddOcorrenceRepository {
  async add (ocorrenceData: AddOcorrenceModel): Promise<OcorrenceModel> {
    const ocorrenceCollection = await MongoHelper.getCollection('ocorrences')
    const result = await ocorrenceCollection.insertOne(ocorrenceData)
    return MongoHelper.map(result.ops[0])
  }
}
