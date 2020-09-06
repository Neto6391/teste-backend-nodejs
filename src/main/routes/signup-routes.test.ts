import * as request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Test',
        email: 'test@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})