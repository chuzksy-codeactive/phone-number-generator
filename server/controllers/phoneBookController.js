/* eslint-disable valid-jsdoc */
import phoneNumberModule from '../utils/phoneModules';

/**
 * This a route controller that handles getting
 * all the generated phone numbers
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {object}
 */
const getPhoneNumbers = (req, res) => {
  const { limit, sort } = req.query;
  const phoneNumbers = phoneNumberModule.generatePhoneNumbers(limit, sort);
  const getMinMaxPhoneNumbers = phoneNumberModule.getMinMaxPhoneNumber(phoneNumbers);

  return res.status(200).json({
    data: { phoneNumbers, getMinMaxPhoneNumbers },
    message: 'Successfully fetches phone numbers'
  });
};

/**
 * This is a route controller to save phone numbers
 * to the scv file
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {object}
 */
const savePhoneNumbersToFile = (req, res) => {
  const { sort } = req.query;
  const genPhoneNumbers = phoneNumberModule.generatePhoneNumbers(0, sort);
  const savedNumbers = phoneNumberModule.savePhoneNumberToFile(genPhoneNumbers);
  const phoneNumbers = savedNumbers.toString().split(',').filter(number => number !== '');
  const getMinMaxPhoneNumbers = phoneNumberModule.getMinMaxPhoneNumber(phoneNumbers);

  return res.status(201).json({
    data: { phoneNumbers, getMinMaxPhoneNumbers },
    message: 'Successfully saved phone numbers into the file'
  });
};

const clearCSVFile = (req, res) => {
  const result = phoneNumberModule.cleanFile();

  return res.status(202).json({
    data: { phoneNumbers: result, getMinMaxPhoneNumbers: { min: '0', max: '0' } },
    message: 'Successfully deleted phone numbers'
  });
};

const phoneBookController = {
  getPhoneNumbers,
  savePhoneNumbersToFile,
  clearCSVFile
};

export default phoneBookController;
