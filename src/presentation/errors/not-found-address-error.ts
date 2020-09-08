export class NotFoundAddressError extends Error {
  constructor () {
    super('Endereco nao encontrado para essa localidade.')
    this.name = 'NotFoundAddressError'
  }
}
