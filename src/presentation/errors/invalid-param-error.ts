export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Parametro Invalido: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
