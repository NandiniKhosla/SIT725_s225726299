/**
 * api.test.js
 * This file tests REST API endpoints using Supertest.
 */

const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Math API Endpoint', () => {

  it('should return the correct sum for valid inputs', async () => {
    const response = await request(app)
      .get('/api/add?a=2&b=3');

    expect(response.status).to.equal(200);
    expect(response.body.result).to.equal(5);
  });

  it('should return 400 error for invalid inputs', async () => {
    const response = await request(app)
      .get('/api/add?a=hello&b=5');

    expect(response.status).to.equal(400);
    expect(response.body.error).to.exist;
  });

});
