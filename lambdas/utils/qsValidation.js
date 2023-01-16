/**
 * Utility to evaluate if the input 'temperature' is a decimal number between 0 and 1
 * @param {*} temp value of temperature
 */
const temperatureIsValid = (temp) => {
  if (typeof temp === 'number' && temp >= 0.0 && temp <= 1.0) {
    return true;
  }
  return false;
};

/**
 * Utility to evaluate if the input 'modelName' is in the valid list of models.
 * @param {*} modelName name of model
 * @returns Boolean returns true if model name is in list of validModels
 */
const validModels = [
  'text-davinci-003',
  'text-curie-001',
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
const modelIsValid = (modelName) => validModels.includes(modelName);

/**
 * Utility to evaluate if the input query string parameter is both defined and not empty
 * @param {*} qsParam a value from API Gateway event.queryStringParameters.{name}
 * @returns Boolean if defined and not empty returns true
 */
const qsParamExists = (qsParam) => {
  let result = false;
  if (qsParam !== undefined && qsParam.length > 0) {
    result = true;
  }
  return result;
};

module.exports = {
  temperatureIsValid,
  modelIsValid,
  qsParamExists,
  validModels,
};
