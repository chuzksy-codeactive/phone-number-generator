/* eslint-disable valid-jsdoc */
import axios from 'axios';
import { GENERATE_TELEPHONE_NUMBER_SUCCESS, GET_ALL_TELEPHONE_NUMBER_SUCCESS, DELETE_ALL_PHONE_NUMBER_SUCCESS } from './actionTypes';

/**
 * This function dispatches actions for
 * generating phone numbers.
 *
 * @param {Array} phoneNumbers
 *
 * @returs {action}
 */
const generatePhoneNumbers = phoneNumbers => ({
  type: GENERATE_TELEPHONE_NUMBER_SUCCESS,
  payload: phoneNumbers,
});

/**
 * This function dispatches action to get all
 * saved phone numbers from the csv file
 *
 * @param {Array} phoneNumberFromFile
 *
 * @returs {action}
 */
const getAllPhoneNumbersFromFile = phoneNumberFromFile => ({
  type: GET_ALL_TELEPHONE_NUMBER_SUCCESS,
  payload: phoneNumberFromFile,
});

/**
 * This functions dispatches actions to clear the content
 * the CSV file
 *
 * @returns {action}
 */
const clearCSVFile = payload => ({
  type: DELETE_ALL_PHONE_NUMBER_SUCCESS,
  payload
});

/**
 * A thunk function for getting all generated
 * phone numbers
 *
 * @param {number} limit
 * @param {string} sort
 *
 * @returns {function} dispatch
 */
const getPhoneNumbers = (limit, sort) => dispatch => axios
  .get(`/api/v1/phone-numbers?sort=${sort}&limit=${limit}`)
  .then((res) => {
    dispatch(generatePhoneNumbers(res.data));
  })
  .catch(err => err);

/**
 * A redux thunk for saving all generated numbers into
 * the csv file and returns all the numbers
 *
 * @param {number} limit
 * @param {string} sort
 *
 * @returns {function} dispatch
 */
const getSavePhoneNumbers = () => dispatch => axios
  .post('/api/v1/phone-numbers-list')
  .then((res) => {
    dispatch(getAllPhoneNumbersFromFile(res.data));
  })
  .catch(err => err);

/**
 * A redux thunk for clearing all the content of
 * a file
 *
 * @return {function} dispatch
 */
const clearFileContent = () => dispatch => axios
  .delete('/api/v1/clear-phone-numbers')
  .then((res) => {
    dispatch(clearCSVFile(res.data));
  });

const phoneBookActions = {
  generatePhoneNumbers,
  getAllPhoneNumbersFromFile,
  getPhoneNumbers,
  getSavePhoneNumbers,
  clearFileContent
};

export default phoneBookActions;
