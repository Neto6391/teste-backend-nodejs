export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Esqueceu o Parametro: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
