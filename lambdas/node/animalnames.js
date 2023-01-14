/* eslint-disable no-console */
const { Configuration, OpenAIApi } = require('openai');

function generatePrompt(animal) {
  const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.
    Animal: Cat
    Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
    Animal: Dog
    Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
    Animal: ${capitalizedAnimal}
    Names:`;
}

module.exports.handler = async (event) => {
  // configure api key
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // valid api key
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

  // get qs parameter
  const { animal } = event.queryStringParameters;

  let completion;
  try {
    completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
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

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        animal,
        result: completion.data.choices[0].text,
      },
    ),
  };
};
