import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../src/app';

import User from '../../src/app/models/User';
import truncate from '../util/truncate';

describe('User', async () => {
  beforeAll(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create({
      name: 'Gabriel Lima',
      email: 'gabriellfsouza@gmail.com',
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

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
