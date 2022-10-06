import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import { app } from '../app';
import { leaderboardMock } from './mocks/leaderboard';
import { Response } from 'superagent';


const { expect } = chai;

chai.use(chaiHttp);

describe('4 - Test /leaderboard routes', async () => {
  let response: Response;

  before(async () => {
    response = await chai.request(app).get('/leaderboard/home');
  });

  describe('4.1 - Test /leaderboard/home route', async () => {
    it('Should return status code 200', async () => {
      expect(response.status).to.be.equal(200);
    });
    it('with the expected data', async () => {
      expect(response.body).to.be.deep.equal(leaderboardMock);
    });
  });
});
