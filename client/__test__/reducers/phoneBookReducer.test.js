import phoneBookReducer from '../../src/reducers/phoneBookReducers';
import {
  GENERATE_TELEPHONE_NUMBER_SUCCESS,
  GET_ALL_TELEPHONE_NUMBER_SUCCESS,
  DELETE_ALL_PHONE_NUMBER_SUCCESS
} from '../../src/actions/actionTypes';

describe('PhoneBook Reducer', () => {
  const response = {
    data: {
      phoneNumbers: ['0808331345', '0154646646', '0254646646'],
      getMinMaxPhoneNumbers: {
        min: '0808331345',
        max: '0154646646'
      },
    }
  };

  it('should return generated numbers', () => {
    const expectedResponse = {
      type: GENERATE_TELEPHONE_NUMBER_SUCCESS,
      payload: { ...response }
    };

    expect(phoneBookReducer({}, expectedResponse)).toEqual(response);
  });

  it('should return all generated numbers', () => {
    const expectedResponse = {
      type: GET_ALL_TELEPHONE_NUMBER_SUCCESS,
      payload: { ...response, message: 'Successfully saved phone numbers into the file'}
    };

    expect(phoneBookReducer({}, expectedResponse)).toEqual(expectedResponse.payload);
  });

  it('should return all generated numbers', () => {
    const expectedResponse = {
      type: GET_ALL_TELEPHONE_NUMBER_SUCCESS,
      payload: { ...response, message: 'Successfully saved phone numbers into the file'}
    };

    expect(phoneBookReducer({}, expectedResponse)).toEqual(expectedResponse.payload);
  });
});
