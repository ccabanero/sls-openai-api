/* eslint-disable camelcase */
/* eslint-disable no-console */

const { Configuration, OpenAIApi } = require('openai');
const { createAPIGatewayResponse } = require('./utils/createAPIGatewayResponse');
const {
  qsParamExists,
  modelIsValid,
  validModels,
  temperatureIsValid,
} = require('./utils/qsValidation');

module.exports.handler = async (event) => {
  // validate query string parameters exist
  if (event.queryStringParameters === undefined) {
    return createAPIGatewayResponse(400, 'Query string parameters "prompt", "model", and "temperature" are required');
  }

  // validate required qs parameter "model"
  if (!qsParamExists(event.queryStringParameters.model)) {
    return createAPIGatewayResponse(400, {
      message: `The model query string parameter is required. Valid options are: ${validModels.join(',')}`,
    });
  }

  // validate "model" name
  if (!modelIsValid(event.queryStringParameters.model)) {
    return createAPIGatewayResponse(400, {
      message: `The model query string parameter is required. The provided model: ${event.queryStringParameters.model} is not valid. Valid options are: ${validModels.join(',')}`,
    });
  }

  // validate required qs parameter "prompt"
  if (!qsParamExists(event.queryStringParameters.prompt)) {
    return createAPIGatewayResponse(400, {
      message: 'The "prompt" query string parameter is required. Length of prompt must be greater than zero',
    });
  }

  // validate required qs parameter "temperature"
  if (!qsParamExists(event.queryStringParameters.prompt)) {
    return createAPIGatewayResponse(400, {
      message: 'The "temperature" query string parameter is required.  It must be between 0 and 1',
    });
  }

  // validate "temperature" value
  const temp = parseFloat(event.queryStringParameters.prompt);
  if (!temperatureIsValid(temp)) {
    return createAPIGatewayResponse(400, {
      message: 'The "temperature" query string parameter must be between 0 and 1',
    });
  }

  // validate optional qs parameter "max_tokens"
  let maxtok = 16; // default
  if (qsParamExists(event.queryStringParameters.prompt.max_tokens)) {
    // override default
    maxtok = parseInt(event.queryStringParameters.prompt.max_tokens, 10);
  }

  // create a config using your OpenAI API key
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  if (!configuration.apiKey) {
    return createAPIGatewayResponse(500, 'OpenAI API key not configured');
  }

  // create OpenAI instance
  const openai = new OpenAIApi(configuration);

  // use OpenAI API completions endpoint
  let completion;
  try {
    completion = await openai.createCompletion({
      model: event.queryStringParameters.model,
      prompt: event.queryStringParameters.prompt,
      temperature: temp,
      max_tokens: maxtok,
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
  return createAPIGatewayResponse(200, {
    data: completion.data,
  });
};
