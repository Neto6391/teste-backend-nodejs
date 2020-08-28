import { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: string
  email: string
  cpf: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
