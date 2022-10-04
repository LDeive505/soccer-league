import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import { app } from '../app';
import matchesMock from './mocks/matches';
import { Response } from 'superagent';
// import matchModel from '../database/models/Match';

const { expect } = chai;

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
      expect(response.body).to.be.a('array');
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

});

