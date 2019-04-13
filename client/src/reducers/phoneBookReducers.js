import { GENERATE_TELEPHONE_NUMBER_SUCCESS, GET_ALL_TELEPHONE_NUMBER_SUCCESS } from '../actions/actionTypes';

const initiateState = {};

const phoneBookReducer = (state = initiateState, action) => {
  switch (action.type) {
    case GENERATE_TELEPHONE_NUMBER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case GET_ALL_TELEPHONE_NUMBER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default phoneBookReducer;
