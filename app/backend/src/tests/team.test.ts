import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import { app } from '../app';
// import teamModel from '../database/models/Team';


const { expect } = chai;

const teamMock = { id: 1, teamName: 'Avaí/Kindermann' };

describe('2 - Test /team routes', async () => {
  describe('2.1 - Test /team route with get metod', async () => {
    it('Should return status code 200', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.be.equal(200);
    });
    it('with all teams data in the database', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.body).to.be.a('array');
      expect(response.body[0]).to.be.deep.equal(teamMock);
    });
  });

  describe('2.2 - Test /team:id route with get metod', async () => {
    it('Should return status code 200', async () => {
      const response = await chai.request(app).get('/teams/1');
      expect(response.status).to.be.equal(200);
    });
    it('with all teams data in the database', async () => {
      const response = await chai.request(app).get('/teams/1');
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.deep.equal(teamMock);
    });
  });
});

