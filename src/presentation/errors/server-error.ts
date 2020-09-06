export class ServerError extends Error {
  constructor (stack: string) {
    super('Erro Interno no Servidor')
    this.name = 'ServerError'
    this.stack = stack
  }
}
