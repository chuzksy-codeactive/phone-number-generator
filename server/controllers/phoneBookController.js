import phoneNumberModule from '../utils/phoneModules'

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
  const { limit, sort } = req.query;
  const phoneNumbers = phoneNumberModule.generatePhoneNumbers(limit, sort);
  const savedPhoneNumbers = phoneNumberModule.savePhoneNumberToFile(phoneNumbers);

  return res.status(201).json({
    data: { savedPhoneNumbers },
    message: 'Successfully saved phone numbers into the file'
  });
};

const phoneBookController = {
  getPhoneNumbers,
  savePhoneNumbersToFile
};

export default phoneBookController;