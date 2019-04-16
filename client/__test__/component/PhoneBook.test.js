import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PhoneBook, mapStateToProps, mapDispatchToProps } from '../../src/pages/PhoneBook';

Enzyme.configure({ adapter: new Adapter() });

describe('Generate phone number', () => {
  const response = {
    data: {
      phoneNumber: [],
      getMinMaxPhoneNumbers: {
        min: '0',
        max: '0'
      }
    },
    message: ''
  };
  const props = {
    generatePhoneNumbers: jest.fn(() => Promise.resolve()),
    getAllPhoneNumbers: jest.fn(() => Promise.resolve()),
    clearAllPhoneNumbers: jest.fn(),
    phoneBook: {
      data: {
        phoneNumbers: ['0808331345', '0154646646', '0254646646'],
        getMinMaxPhoneNumbers: {
          min: '0808331345',
          max: '0154646646'
        }
      }
    }
  };

  const wrapper = shallow(<PhoneBook {...props} />);

  it('should render the <PhoneBook /> component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should sort the phone-numbers in ascending order', () => {
    const handleSordOrder = jest.fn();

    wrapper.find('.sort button').first().simulate('click');
    wrapper.instance().handleSordOrder('ASC', props.phoneBook.data.phoneNumbers);

    expect(wrapper.state().phoneBook.data.phoneNumbers).toStrictEqual(['0154646646', '0254646646', '0808331345']);
  });

  it('should sort the phone-numbers in descending order', () => {
    const handleSordOrder = jest.fn();

    wrapper.find('.sort button').last().simulate('click');
    wrapper.instance().handleSordOrder('DESC', props.phoneBook.data.phoneNumbers);

    expect(wrapper.state().phoneBook.data.phoneNumbers).toStrictEqual(['0808331345', '0254646646', '0154646646']);
  });

  it('should call "handleGenerateNumber()" on button click', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleGenerateNumber');
    const event = { target: { name: 'amount', value: '10' } };

    wrapper.update();
    wrapper.find('input[name="amount"]').simulate('change', event);
    wrapper.find('.btn').first().simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('should throw error when user does not pass a digit', () => {
    const event = { target: { name: 'amount', value: 'eye' } };

    wrapper.update();
    wrapper.find('input[name="amount"]').simulate('change', event);
    wrapper.find('.btn').first().simulate('click');
    wrapper.instance().handleGenerateNumber();

    expect(wrapper.state().error).toBe(true);
  });

  it('should call "handleClearAllPhoneNumbers" on button click', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleClearAllPhoneNumbers');
    const event = { target: { name: 'amount', value: '10' } };

    wrapper.update();
    wrapper.find('input[name="amount"]').simulate('change', event);
    wrapper.find('.btn-delete').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('should call "handleGetAllPhoneNumbers" on button click', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleGetAllPhoneNumbers');
    const event = { target: { name: 'amount', value: '10' } };

    wrapper.update();
    wrapper.find('input[name="amount"]').simulate('change', event);
    wrapper.find('.btn').last().simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});

describe('mapStateToProps', () => {
  it('returns the expected props object', () => {
    const state = {};

    const props = mapStateToProps(state);
    expect(props.phoneBook).toEqual(state.phoneBook);
  });
});

describe('mapDispatchToProps', () => {
  let dispatch;
  let props;

  beforeEach(() => {
    dispatch = jest.fn();
    props = mapDispatchToProps(dispatch);
  });

  afterEach(() => {
    dispatch = props = null;
  });

  it('ensures that generatePhoneNumbers is mapped to props', () => {
    props.generatePhoneNumbers();
    expect(dispatch).toBeCalled();
  });

  it('ensures that getAllPhoneNumbers is mapped to props', () => {
    props.getAllPhoneNumbers();
    expect(dispatch).toBeCalled();
  });

  it('ensure clearAllPhoneNumbers is mapped to props', () => {
    props.clearAllPhoneNumbers();
    expect(dispatch).toHaveBeenCalled();
  });
});
