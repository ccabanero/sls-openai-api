/**
 * Utility for creating an API response object as expected by API Gateway
 * @param {*} statusCode required argument for an HTTP status code.
 * @param {*} body an object representing the data that will be sent back to the client
 * @returns API response object
 */
const createAPIGatewayResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

module.exports = {
  createAPIGatewayResponse,
};
