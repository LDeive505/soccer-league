import * as sinon from 'sinon';
import { expect } from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http'); 
import { app } from '../app';
import userModel from '../database/models/User';
import { User } from '../types/UserTypes';
import { Response } from 'superagent';

chai.use(chaiHttp);
const userMock = { 
  id: 1, username: 'Admin', role: 'Admin', email: 'admin@email.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' 
};

describe('1 - Test login route', () => {

  beforeAll(async () => {
     sinon.stub(userModel, "findOne").resolves(userMock as User);
   });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
