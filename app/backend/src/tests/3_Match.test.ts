import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import { app } from '../app';
import matchesMock from './mocks/matches';
import { newMatchMock, createdMatchMock } from './mocks/matchTobeCreated';
import { Response } from 'superagent';
import matchModel from '../database/models/Match';
import tokenValidation from '../middlewares/tokenValidation';

const { expect } = chai;

const userMock = {
  email: 'user@user.com',
  password: 'secret_user'
};

describe('3 - Test /matches routes', async () => {

  const inProgressMock = matchesMock.filter((match) => match.inProgress);
  const notInProgressMock = matchesMock.filter((match) => !match.inProgress);

  describe('3.1 - Test /matches route with GET metod', async () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).get('/matches');
    });

    it('Should return status code 200', async () => {
      expect(response.status).to.be.equal(200);
    });

    it('with all matches data in the database including the ones in the Teams table', async () => {
      expect(response.body).to.be.a('array');
      expect(response.body).to.be.deep.equal(matchesMock);
    });
  });

  describe('3.2 - Test /matches route with GET method using query string with inProgress=true', async () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).get('/matches?inProgress=true');
    });

    it('Should return status code 200', async () => {
      expect(response.status).to.be.equal(200);
    });

    it('with all matches in progress in the database', async () => {
      expect(response.body).to.be.deep.equal(inProgressMock);
    });
  });

  describe('3.3 - Test /matches route with GET method using query string with inProgress=false', async () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).get('/matches?inProgress=false');
    });

    it('Should return status code 200', async () => {
      expect(response.status).to.be.equal(200);
    });

    it('with all finished matches', async () => {
      expect(response.body).to.be.a('array');
      expect(response.body).to.be.deep.equal(notInProgressMock);
    });
  });

  describe('3.4 - Test /matches/:id/finish route with PATCH method to update a match score', async () => {
    let response: Response;

    before(async () => {
      sinon.stub(matchModel, 'update').resolves([1] as any);
      response = await chai.request(app).patch('/matches/1/finish');
    });

    it('Should return status code 200', async () => {
      expect(response.status).to.be.equal(200);
    });

    it('with a message confirming the match has finished', async () => {
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });

  describe('3.5 - Test /matches route with POST method to create a match in the database', async () => {
    let response: Response;

    const login: Response = await chai.request(app).post('/login').send(userMock);
    sinon.stub(matchModel, 'create').resolves(createdMatchMock as matchModel);
    response = await chai.request(app).post('/matches').set('authorization', login.body.token).send(newMatchMock);
  
    it('Should return status code 201', async () => {
      expect(response.status).to.be.equal(201);
    });

    it('with the created match data', async () => {
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.deep.equal(createdMatchMock);
    });
  });

});

