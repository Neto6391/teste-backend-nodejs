export class ServerError extends Error {
  constructor () {
    super('Erro Interno no Servidor')
    this.name = 'ServerError'
  }
}
