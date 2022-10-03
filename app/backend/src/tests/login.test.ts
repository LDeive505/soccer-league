import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import { app } from '../app';


const { expect } = chai;

const loginMock = { email: 'user@user.com', password: 'secret_user' };
const invalidLoginMock = { email: 'zyzz@email', password: '123456' };

chai.use(chaiHttp);

describe('1 - Test /login routes', async () => {
  describe('1.1 - Test login route with valid credentials', async () => {
    it('Should return status code 200', async () => {
      const response = await chai.request(app).post('/login').send(loginMock);
      expect(response.status).to.be.equal(200);
    });
    it('with a valid token', async () => {
      const response = await chai.request(app).post('/login').send(loginMock);
      expect(response.body).to.haveOwnProperty('token');
      expect(response.body.token).to.be.a('string');
    });
  });

  describe('1.3 - Test login route without credentials', async () => {
    it('Should return status code 400', async () => {
      const response = await chai.request(app).post('/login');
      expect(response.status).to.be.equal(400);
    });
    it('with a message', async () => {
      const response = await chai.request(app).post('/login');
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body.message).to.be.a('string');
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('1.2 - Test login route with invalid credentials', async () => {
    it('Should return status code 401', async () => {
      const response = await chai.request(app).post('/login').send(invalidLoginMock);
      expect(response.status).to.be.equal(401);
    });
    it('with a message', async () => {
      const response = await chai.request(app).post('/login').send(invalidLoginMock);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body.message).to.be.a('string');
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });
  });
});
