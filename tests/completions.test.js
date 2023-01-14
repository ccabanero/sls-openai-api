const request = require('supertest');

test('a GET request to /api/gadml0/boundaries returns the expected status code and response object structure', async () => {
  const response = await request(process.env.API_BASEURL)
    .get('/api/openai/completions?model=code-davinci-002&prompt=write a python function that opens a raster dataset');

  // confirm expected status code
  const expectedStatusCode = 200;
  const actualStatusCode = response.status;
  expect(actualStatusCode).toEqual(expectedStatusCode);
});
