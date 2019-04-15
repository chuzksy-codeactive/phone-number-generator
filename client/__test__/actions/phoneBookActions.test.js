
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import {
  GENERATE_TELEPHONE_NUMBER_SUCCESS,
  GET_ALL_TELEPHONE_NUMBER_SUCCESS,
  DELETE_ALL_PHONE_NUMBER_SUCCESS
} from '../../src/actions/actionTypes';
import phoneBookActions from '../../src/actions/phoneBookActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Initialize mockstore with empty state
const initialState = {};

describe('Action creators for PhoneBook', () => {
  const response = {
    data: {
      phoneNumbers: ['0808331345', '0154646646', '0254646646'],
      getMinMaxPhoneNumbers: {
        min: '0808331345',
        max: '0154646646'
      },
    },
    message: 'Successfully fetches phone numbers'
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should generate random phone number', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          ...response
        }
      });
    });

    const expectedResponse = [{
      type: GENERATE_TELEPHONE_NUMBER_SUCCESS,
      payload: response,
    }];

    const store = mockStore(response);

    await store.dispatch(phoneBookActions.getPhoneNumbers());
    expect(store.getActions()).toEqual(expectedResponse);
    done();
  });

  it('should get all random phone number', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          ...response
        }
      });
    });

    const expectedResponse = [{
      type: GET_ALL_TELEPHONE_NUMBER_SUCCESS,
      payload: response,
    }];

    const store = mockStore(response);

    await store.dispatch(phoneBookActions.getSavePhoneNumbers());
    expect(store.getActions()).toEqual(expectedResponse);
    done();
  });

  it('should clear all random phone number', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 202,
        response: {
          data: {
            phoneNumbers: [],
            getMinMaxPhoneNumbers: {
              min: '0',
              max: '0'
            },
          },
          message: 'Successfully deleted phone numbers'
        }
      });
    });

    const expectedResponse = [{
      type: DELETE_ALL_PHONE_NUMBER_SUCCESS,
      payload: {
        data: {
          phoneNumbers: [],
          getMinMaxPhoneNumbers: {
            min: '0',
            max: '0'
          },
        },
        message: 'Successfully deleted phone numbers'
      },
    }];

    const store = mockStore(response);

    await store.dispatch(phoneBookActions.clearFileContent());
    expect(store.getActions()).toEqual(expectedResponse);
    done();
  });
});
