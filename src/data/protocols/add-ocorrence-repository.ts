import { AddOcorrenceModel } from '../../domain/usecases/add-ocorrence'
import { OcorrenceModel } from '../../domain/models/ocorrence'

export interface AddOcorrenceRepository {
  add: (ocorrenceData: AddOcorrenceModel) => Promise<OcorrenceModel>
}
