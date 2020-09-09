import { AddressModel } from '../models/address'

export interface AddAddressModel {
  logradouro: string
  bairro: string
  cidade: string
  estado: string
  pais: string
  cep: string
}

export interface GetAddressModel {
  key: string
}

export interface AddAddress {
  add: (Coordinates: GetAddressModel, Address: AddAddressModel) => Promise<AddressModel>
  get: (Coordinates: GetAddressModel) => Promise<AddressModel>
}
