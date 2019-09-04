import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Gabriel Lima',
        email: 'gabriellfsouza@gmail.com',
        password_hash: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Gabriel Lima',
        email: 'gabriellfsouza@gmail.com',
        password_hash: '123456',
      });

    expect(response.status).toBe(400);
  });
});
