import React, { Component } from 'react';
import { connect } from 'react-redux';
import phoneBook from '../actions/phoneBookActions';

import './PhoneBook.scss';

/**
 * This is the component for PhoneBood
 */
class PhoneBook extends Component {
  state = {};

  /**
   * renders the phone book compoent
   *
   * @return {JSX} render
   */
  render() {
    return (
      <div>PhoneBook</div>
    );
  }
}
const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  generatePhoneNumbers: (limit, sort) => dispatch(phoneBook.getPhoneNumbers(limit, sort)),
  getAllPhoneNumbers: (limit, sort) => dispatch(phoneBook.getSavePhoneNumbers(limit, sort)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);
