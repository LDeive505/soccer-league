import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import { app } from '../app';
import matchesMock from './mocks/matches';
// import matchModel from '../database/models/Match';

const { expect } = chai;

describe('3 - Test /match routes', async () => {

  const inProgressMock = matchesMock.filter((match) => match.inProgress);
  const notInProgressMock = matchesMock.filter((match) => !match.inProgress);

  describe('2.1 - Test /match route with GET metod', async () => {
    it('Should return status code 200', async () => {
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.be.equal(200);
    });
    it('with all matches data in the database including the ones in the Teams table', async () => {
      const response = await chai.request(app).get('/matches');
      expect(response.body).to.be.a('array');
      expect(response.body).to.be.deep.equal(matchesMock);
    });
  });

  describe('2.2 - Test /match route with GET metod using query string', async () => {
    it('Should return status code 200', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');
      expect(response.status).to.be.equal(200);
    });
    it('with all matches in progress in the database', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');
      expect(response.body).to.be.a('array');
      expect(response.body).to.be.deep.equal(inProgressMock);
    });
    it('Should return status code 200', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false');
      expect(response.status).to.be.equal(200);
    });
    it('with all finished matches', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false');
      expect(response.body).to.be.a('array');
      expect(response.body).to.be.deep.equal(notInProgressMock);
    });
  });
});

