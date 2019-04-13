/* eslint-disable valid-jsdoc */
import path from 'path';
import fs from 'fs';

const phoneBookFile = {
  development: path.join(__dirname, '../bin/phoneBookDB.csv'),
  production: path.join(__dirname, '../bin/phoneBookProdDB.csv'),
  test: path.join(__dirname, '../bin/phoneBookTestDB.csv')
};

/**
 * This function sorts the phone numbers
 * to Ascending or Descending order
 *
 * @param {string} sortType
 * @param {Number} phoneNumbers
 *
 * @returns {Array}
 */
const sortPhoneNumbers = (sortType, phoneNumbers) => {
  if (sortType === 'ASC') {
    return phoneNumbers.sort((a, b) => a - b);
  }
  return phoneNumbers.sort((a, b) => b - a);
};

/**
 * This function generate x amount of phone numbers
 *
 * @param {number} limit
 *
 * @returns {Array}
 */
const generatePhoneNumbers = (limit = 10, sortType = null) => {
  const phoneNumbers = [];
  let randomPhoneNumber = 0;

  const generate = limit > 10000 ? 10000 : limit;

  for (let i = 1; i <= generate; i += 1) {
    randomPhoneNumber = Math.floor(100000000 + Math.random() * 900000000);
    phoneNumbers.push(`0${randomPhoneNumber}`);
  }

  return (sortType === 'ASC' || sortType === 'DESC')
    ? sortPhoneNumbers(sortType, phoneNumbers)
    : phoneNumbers;
};

/**
 * This function reads all the phone numbers
 * from the csv file
 *
 * @returns {Array}
 */
const readPhoneNumbersFromFile = () => {
  fs.openSync(phoneBookFile[process.env.NODE_ENV], 'a+');
  const readFile = fs.readFileSync(phoneBookFile[process.env.NODE_ENV], { encoding: 'utf8' });

  return readFile;
};

/**
 * This functions save the phoneNumbers in a csv file
 *
 * @param {Number} phoneNumbers
 *
 * @returns {makeNumbersUniqu}
 */
const savePhoneNumberToFile = (phoneNumbers) => {
  const joinNumbers = [...phoneNumbers, readPhoneNumbersFromFile()];
  const makeNumbersUnique = Array.from(new Set(joinNumbers));

  fs.writeFileSync(phoneBookFile[process.env.NODE_ENV], makeNumbersUnique);

  return makeNumbersUnique;
};

/**
 * This function returns the maximum or minimum phone number
 * from a list of phone numbers
 *
 * @param {string} type
 * @param {Number} phoneNumbers
 *
 * @returns {string}
 */
const getMinMaxPhoneNumber = (phoneNumbers) => {
  const min = (0 + Math.min(...phoneNumbers).toString());
  const max = (0 + Math.max(...phoneNumbers).toString());

  return { min, max };
};

/**
 * This function clears all the phone number
 * from the csv file
 *
 * @returns {void}
 */
const cleanFile = () => {
  fs.writeFileSync(phoneBookFile[process.env.NODE_ENV], '');
};

const phoneNumberModule = {
  generatePhoneNumbers,
  sortPhoneNumbers,
  savePhoneNumberToFile,
  getMinMaxPhoneNumber,
  cleanFile,
};

export default phoneNumberModule;
