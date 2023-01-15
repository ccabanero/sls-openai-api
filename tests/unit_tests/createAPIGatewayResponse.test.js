const { createAPIGatewayResponse } = require('../../lambdas/utils/createAPIGatewayResponse');

test('createAPIGatewayResponse() creates the expected response object', () => {
  const statusCode = 200;
  const body = { message: 'This is a test' };
  const response = createAPIGatewayResponse(statusCode, body);

  expect(response).toEqual({
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
    body: '{"message":"This is a test"}', // json string
  });
});
