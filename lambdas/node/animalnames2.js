"use strict";
const { Configuration, OpenAIApi} = require('openai');

module.exports.handler = async (event) => {
  // configure api key
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);

  // validate api key
  if (!configuration.apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "OpenAI API key not configured"
        }
      )
    }
  }

  // get qs parameter
  const { prompt } = event.queryStringParameters;

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.6,
    });

    //
    console.log(completion);
    console.log(completion.data.choices);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          result: completion.data.choices[0].text,
        }
      )
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return {
        statusCode: error.response.status,
        body: JSON.stringify(
          {
            message: error.response.data
          }
        )
      }
    }
  }
};
