/* eslint-disable no-console */

const { Configuration, OpenAIApi } = require('openai');

module.exports.handler = async (event) => {
  // configure api key
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // validate api key
  if (!configuration.apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'OpenAI API key not configured',
        },
      ),
    };
  }

  // get prompt from request
  const { prompt } = event.queryStringParameters;

  let completion;
  try {
    completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.6,
    });
  } catch (error) {
    if (error.response) {
      // send to CloudWatch logs
      console.error(error.response.status, error.response.data);

      // send error response
      return {
        statusCode: error.response.status,
        body: JSON.stringify(
          {
            message: error.response.data,
          },
        ),
      };
    }
  }

  // send response
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        result: completion.data.choices,
      },
    ),
  };
};
