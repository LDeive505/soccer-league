import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import { app } from '../app';
import userModel from '../database/models/User';
import { User } from '../types/UserTypes';
import { Response } from 'superagent';

const { expect } = chai;

/* const userMock = { 
  id: 1, username: 'Admin', role: 'Admin', email: 'admin@email.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' 
}; */

const loginMock = { email: 'user@user.com', password: 'secret_user' };

chai.use(chaiHttp);

describe('1 - Test login route', async () => {
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
