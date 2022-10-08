import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import { app } from '../app';
import { leaderboardHomeMock } from './mocks/leaderboardHome';
import { leaderboardAwayMock } from './mocks/leaderboardAway';
import { leaderboardMock } from './mocks/leaderboard';
import { Response } from 'superagent';


const { expect } = chai;

chai.use(chaiHttp);

describe('4 - Test /leaderboard routes', async () => {
  describe('4.1 - Test /leaderboard/home route', async () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).get('/leaderboard/home');
    });

    it('Should return status code 200', async () => {
      expect(response.status).to.be.equal(200);
    });
    it('with the expected data', async () => {
      expect(response.body).to.be.deep.equal(leaderboardHomeMock);
    });
  });

  describe('4.2 - Test /leaderboard/away route', async () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).get('/leaderboard/away');
    });

    it('Should return status code 200', async () => {
      expect(response.status).to.be.equal(200);
    });
    it('with the expected data', async () => {
      expect(response.body).to.be.deep.equal(leaderboardAwayMock);
    });
  });

  describe('4.3 - Test /leaderboard route', async () => {
    let response: Response;

    before(async () => {
      response = await chai.request(app).get('/leaderboard');
    });

    it('Should return status code 200', async () => {
      expect(response.status).to.be.equal(200);
    });
    it('with the expected data', async () => {
      expect(response.body).to.be.deep.equal(leaderboardMock);
    });
  });
});
