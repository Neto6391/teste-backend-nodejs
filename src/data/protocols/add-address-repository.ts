import { AddAddressModel, GetAddressModel } from '../../domain/usecases/add-address'
import { AddressModel } from '../../domain/models/address'

export interface AddAddressRepository {
  add: (coordinatesKey: GetAddressModel, addressData: AddAddressModel) => Promise<AddressModel>
  get: (coordinatesKey: GetAddressModel) => Promise<AddressModel>
}
