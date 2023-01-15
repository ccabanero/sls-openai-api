/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');

jest.setTimeout(30000);

test('a valid GET request returns a 200 status code', async () => {
  const response = await request(process.env.API_BASEURL)
    .get('/api/openai/completions?model=text-ada-001&prompt=write a hello world function in python&temperature=0.1&max_tokens=258');

  // confirm expected status code
  const expectedStatusCode = 200;
  const actualStatusCode = response.status;
  expect(actualStatusCode).toEqual(expectedStatusCode);
});

test('a valid GET request returns a response body with the expcted data structure', async () => {
  const response = await request(process.env.API_BASEURL)
    .get('/api/openai/completions?model=text-ada-001&prompt=write a hello world function in python&temperature=0.1&max_tokens=258');

  // confirm the response body returns the expected data structure
  expect('data' in response.body);
  expect('id' in response.body.data).toBe(true);
  expect('object' in response.body.data).toBe(true);
  expect('created' in response.body.data).toBe(true);
  expect('choices' in response.body.data).toBe(true);
  expect('usage' in response.body.data).toBe(true);
});

test('an invalid GET request with no query string parameters returns a 400 status code and informative message', async () => {
  const response = await request(process.env.API_BASEURL)
    .get('/api/openai/completions');

  // confirm expected status code
  const expectedStatusCode = 400;
  const actualStatusCode = response.status;
  expect(actualStatusCode).toEqual(expectedStatusCode);

  // confirm message to client
  const expectedMessage = 'Query string parameters "prompt", "model", and "temperature" are required';
  const actualMessage = response.body;
  expect(actualMessage).toEqual(expectedMessage);
});

test('a GET request with NO MODEL query string parameter returns a 400 status code and informative message', async () => {
  const response = await request(process.env.API_BASEURL)
    .get('/api/openai/completions?prompt=write a hello world function in python&temperature=0.1&max_tokens=258');

  // confirm expected status code
  const expectedStatusCode = 400;
  const actualStatusCode = response.status;
  expect(actualStatusCode).toEqual(expectedStatusCode);

  // confirm message to client
  const expectedMessage = 'The model query string parameter is required. Valid options are: text-davinci-003,text-babbage-001,text-ada-001,text-davinci-002,text-davinci-001,davinci-instruct-beta,davinci,curie-instruct-beta,curie,babbage,ada,code-davinci-002,code-cushman-001';
  const actualMessage = response.body.message;
  expect(actualMessage).toEqual(expectedMessage);
});

test('a GET request with an INVALID MODEL query string parameter returns a 400 status code and informative message', async () => {
  const invalidModel = 'INVALID-MODE-NAME';
  const response = await request(process.env.API_BASEURL)
    .get(`/api/openai/completions?model=${invalidModel}&prompt=write a hello world function in python&temperature=0.1&max_tokens=258`);

  // confirm expected status code
  const expectedStatusCode = 400;
  const actualStatusCode = response.status;
  expect(actualStatusCode).toEqual(expectedStatusCode);

  // confirm message to client
  const expectedMessage = `The model query string parameter is required. The provided model: ${invalidModel} is not valid. Valid options are: text-davinci-003,text-babbage-001,text-ada-001,text-davinci-002,text-davinci-001,davinci-instruct-beta,davinci,curie-instruct-beta,curie,babbage,ada,code-davinci-002,code-cushman-001`;
  const actualMessage = response.body.message;
  expect(actualMessage).toEqual(expectedMessage);
});

test('a GET request with NO PROMPT query string parameter returns a 400 status code and informative message', async () => {
  const response = await request(process.env.API_BASEURL)
    .get('/api/openai/completions?model=text-ada-001&temperature=0.1&max_tokens=258');

  // confirm expected status code
  const expectedStatusCode = 400;
  const actualStatusCode = response.status;
  expect(actualStatusCode).toEqual(expectedStatusCode);

  // confirm message to client
  const expectedMessage = 'The "prompt" query string parameter is required. Length of prompt must be greater than zero';
  const actualMessage = response.body.message;
  expect(actualMessage).toEqual(expectedMessage);
});

test('a GET request with NO TEMPERATURE query string parameter returns a 400 status code and informative message', async () => {
  const response = await request(process.env.API_BASEURL)
    .get('/api/openai/completions?model=text-ada-001&prompt=write a hello world function in python&max_tokens=258');

  // confirm expected status code
  const expectedStatusCode = 400;
  const actualStatusCode = response.status;
  expect(actualStatusCode).toEqual(expectedStatusCode);

  // confirm message to client
  const expectedMessage = 'The "temperature" query string parameter is required.  It must be between 0 and 1';
  const actualMessage = response.body.message;
  expect(actualMessage).toEqual(expectedMessage);
});

test('a GET request with INVALID TEMPERATURE query string parameter returns a 400 status code and informative message', async () => {
  const response = await request(process.env.API_BASEURL)
    .get('/api/openai/completions?model=text-ada-001&prompt=write a hello world function in python&temperature=2.2&max_tokens=258');

  // confirm expected status code
  const expectedStatusCode = 400;
  const actualStatusCode = response.status;
  expect(actualStatusCode).toEqual(expectedStatusCode);

  // confirm message to client
  const expectedMessage = 'The "temperature" query string parameter must be between 0 and 1';
  const actualMessage = response.body.message;
  expect(actualMessage).toEqual(expectedMessage);
});
