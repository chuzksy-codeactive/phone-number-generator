/* eslint-disable valid-jsdoc */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import phoneBook from '../actions/phoneBookActions';

import './PhoneBook.scss';

/**
 * This is the component for PhoneBood
 */
class PhoneBook extends Component {
  state = {};

  header = () => (
    <div className="header">
      <p>RANDOM PHONE NUMBER GENERATOR</p>
    </div>
  );

  dashboard = () => (
    <div className="dashboard">
      {this.card(100, 'Total generated numbers')}
      {this.card(100, 'Minimum phone number')}
      {this.card(100, 'Maximum phone number')}
    </div>
  )

  card = (value, str) => (
    <div className="card">
      <p>{value}</p>
      <p>{str}</p>
    </div>
  )

  phoneList = () => (
    <div className="list">
      <ul className="phone-list">
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
        <li>09022334455</li>
      </ul>
    </div>
  )

  inputControls = () => (
    <div className="input-controls">
      <div>Sort Phone Number</div>
      <div className="sort">
        <button type="button">Ascending</button>
        <button type="button">Descending</button>
      </div>
      <div>Enter amount to generate</div>
      <input type="text" />
      <button type="button" className="btn">Generate Phone Numbers</button>
      <button type="button" className="btn">Get All Phone Numbers</button>
    </div>
  );

  /**
   * renders the phone book compoent
   *
   * @return {JSX} render
   */
  render() {
    return (
      <div className="container">
        {this.header()}
        {this.dashboard()}
        {this.phoneList()}
        {this.inputControls()}
      </div>
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
