const { temperatureIsValid, modelIsValid, qsParamExists } = require('../../lambdas/utils/qsValidation');

test('the temperatureIsValid() utility function returns true when the input temp is a number and between 0 and 1', () => {
  const result = temperatureIsValid(0.5);
  expect(result).toBe(true);
});

test('the temperatureIsValid() utility function returns false when the input temp is a string', () => {
  const result = temperatureIsValid('0.5');
  expect(result).toBe(false);
});

test('the temperatureIsValid() utility function returns false when the input temp is not a number between 0 and 1', () => {
  expect(temperatureIsValid(1.1)).toBe(false);
  expect(temperatureIsValid(-0.1)).toBe(false);

  expect(temperatureIsValid(0)).toBe(true);
  expect(temperatureIsValid(0.0)).toBe(true);
  expect(temperatureIsValid(0.1)).toBe(true);
  expect(temperatureIsValid(0.5)).toBe(true);
  expect(temperatureIsValid(0.9)).toBe(true);
  expect(temperatureIsValid(1.0)).toBe(true);
  expect(temperatureIsValid(1)).toBe(true);
});

test('the modelIsValid() utility function returns true when the input model is valid', () => {
  const result = modelIsValid('text-davinci-003');
  expect(result).toBe(true);
});

test('the modelIsValid() utility function returns false when the input model is not valid', () => {
  const result = modelIsValid('NOT_A_VALID_MODEL_NAME');
  expect(result).toBe(false);
});

test('the qsParamExists() utility function returns true when the input query string parameter is defined and not empty', () => {
  const result = qsParamExists('max_tokens');
  expect(result).toBe(true);
});

test('qsParamExists() utility function returns false when the input query string parameter is undefined', () => {
  const result = qsParamExists(undefined);
  expect(result).toBe(false);
});

test('qsParamExists() returns false when the input query string parameter is empty', () => {
  const result = qsParamExists(undefined);
  expect(result).toBe(false);
});
