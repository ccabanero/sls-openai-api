/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

beforeEach(() => {
  jest.setTimeout(30000);
});

test('a valid GET request returns a 200 status code', async () => {
  const response = await request(process.env.API_BASEURL)
    .get('/api/openai/completions?model=code-davinci-002&prompt=write a hello world function in python&temperature=0.1&max_tokens=258');

  // confirm expected status code
  const expectedStatusCode = 200;
  const actualStatusCode = response.status;
  expect(actualStatusCode).toEqual(expectedStatusCode);
});

test('a valid GET request returns a response body with the expcted data structure', async () => {
  const response = await request(process.env.API_BASEURL)
    .get('/api/openai/completions?model=code-davinci-002&prompt=write a hello world function in python&temperature=0.1&max_tokens=258');

  // confirm the response body returns the expected data structure
  expect('data' in response.body);
  expect('id' in response.body.data).toBe(true);
  expect('object' in response.body.data).toBe(true);
  expect('created' in response.body.data).toBe(true);
  expect('choices' in response.body.data).toBe(true);
  expect('usage' in response.body.data).toBe(true);
});

// TODO INVALID WITHOUT REQUIRED PARAMETERS
// TODO INVALID WITH OPTIONAL PARAMETERES
