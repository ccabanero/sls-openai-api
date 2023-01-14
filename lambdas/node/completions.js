/* eslint-disable no-console */

const { Configuration, OpenAIApi } = require('openai');

/**
 * Utility for creating an API response object
 * @param {*} statusCode
 * @param {*} body
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

// Main Lambda function handler
module.exports.handler = async (event) => {
  // configure api key
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // validate api key
  if (!configuration.apiKey) {
    return createAPIGatewayResponse(500, 'OpenAI API key not configured');
  }

  // validate prompt
  const { queryStringParameters } = event;
  if (queryStringParameters === undefined) {
    return createAPIGatewayResponse(400, 'Query string parameters "prompt" and "model" are required');
  }

  // validate model qs parameter
  const { model } = queryStringParameters;
  const validModels = [
    'text-davinci-003',
    'text-babbage-001',
    'text-ada-001',
    'text-davinci-002',
    'text-davinci-001',
    'davinci-instruct-beta',
    'davinci',
    'curie-instruct-beta',
    'curie',
    'babbage',
    'ada',
    'code-davinci-002',
    'code-cushman-001',
  ];
  if (!validModels.includes(model)) {
    return createAPIGatewayResponse(400, {
      message: `The model query string parameter is required. Valid options are: ${validModels.join(',')}`,
    });
  }

  // validate prompt qs parameter
  const { prompt } = queryStringParameters;
  if (prompt.length === 0) {
    return createAPIGatewayResponse(400, {
      message: 'The prompt query string parameter is required. Length of prompt must be greater than zero',
    });
  }

  // use OpenAI API completions endpoint
  let completion;
  try {
    completion = await openai.createCompletion({
      model,
      prompt,
      temperature: 0.6,
    });
  } catch (error) {
    if (error.response) {
      // send to CloudWatch logs
      console.error(error.response.status, error.response.data);

      // send error response
      return createAPIGatewayResponse(error.response.status, error.response.data);
    }
  }

  // send response
  return createAPIGatewayResponse(200, completion.data);
};
