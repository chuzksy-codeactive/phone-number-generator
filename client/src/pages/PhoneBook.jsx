/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import phoneBook from '../actions/phoneBookActions';

import './PhoneBook.scss';

/**
 * This is the component for PhoneBood
 */
export class PhoneBook extends Component {
  static defaultProps = {
    phoneBook: {},
  };

  state = {
    isFetching: true,
    phoneBook: {},
    isASC: false,
    isDESC: false,
    amount: '',
    error: false,
  };

  async componentDidMount() {
    await this.props.generatePhoneNumbers(2);
    this.setState(() => ({ isFetching: false, phoneBook: this.props.phoneBook }));
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.phoneBook) !== JSON.stringify(this.props.phoneBook)) {
      this.setState(() => ({ phoneBook: this.props.phoneBook }));
    }
  }

  handleSordOrder = (sort, phoneNumbers) => {
    let result = [];
    let isASC = false;
    let isDESC = false;

    if (sort === 'ASC') {
      result = phoneNumbers.sort((a, b) => a - b);
      isASC = true;
      isDESC = false;
    } else {
      result = phoneNumbers.sort((a, b) => b - a);
      isASC = false;
      isDESC = true;
    }

    this.setState(prevState => ({
      phoneBook: {
        ...prevState.phoneBook,
        phoneNumbers: result,
      },
      isASC,
      isDESC
    }));
  }

  handleAmountToDisplay = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: false,
    });
  };

  handleGenerateNumber = async () => {
    const amount = Number.parseInt(this.state.amount, 10);

    if (Number.isNaN(amount)) return this.setState(() => ({ error: true }));
    await this.props.generatePhoneNumbers(amount);
  };

  handleGetAllPhoneNumbers = () => {
    this.props.getAllPhoneNumbers();
  }

  handleClearAllPhoneNumbers = () => {
    this.props.clearAllPhoneNumbers();
  }

  header = () => (
    <div className="header">
      <p>RANDOM PHONE NUMBER GENERATOR</p>
    </div>
  );

  dashboard = ({ min, max, count }) => (
    <div className="dashboard">
      {this.card(count, 'Total generated numbers')}
      {this.card(min, 'Minimum phone number')}
      {this.card(max, 'Maximum phone number')}
    </div>
  );

  card = (value, str) => (
    <div className="card">
      <p>{value}</p>
      <p>{str}</p>
    </div>
  );

  phoneList = phoneNumbers => (
    <div className="list">
      <ul className="phone-list">
        {phoneNumbers && phoneNumbers.map((phoneNumber, i) => <li key={phoneNumber}>{phoneNumber}</li>)}
      </ul>
    </div>
  )

  inputControls = numbers => (
    <div className="input-controls">
      <div>Sort Phone Number</div>
      <div className="sort">
        <button
          type="button"
          className={this.state.isASC ? 'order' : 'not-order'}
          onClick={() => this.handleSordOrder('ASC', numbers)}
        >
          Ascending
        </button>
        <button
          type="button"
          className={this.state.isDESC ? 'order' : 'no-order'}
          onClick={() => this.handleSordOrder('DESC', numbers)}
        >
          Descending
        </button>
      </div>
      <div>Enter amount to generate</div>
      {this.state.error && <span>Pls, provide a digit here!</span>}
      <input
        className={this.state.error ? 'has-error' : 'no-error'}
        name="amount"
        type="text"
        value={this.state.amount}
        onChange={this.handleAmountToDisplay}
      />
      <button
        type="button"
        className="btn"
        onClick={this.handleGenerateNumber}
      >
        Generate Phone Numbers
      </button>
      <button
        type="button"
        className="btn"
        onClick={this.handleGetAllPhoneNumbers}
      >
        Get All Phone Numbers
      </button>
      <button
        type="button"
        className="btn-delete"
        onClick={this.handleClearAllPhoneNumbers}
      >
        Clear All Phone Numbers
      </button>
    </div>
  );

  /**
   * renders the phone book compoent
   *
   * @return {JSX} render
   */
  render() {
    const {
      message,
      data: {
        phoneNumbers,
        getMinMaxPhoneNumbers: { min, max } = {}
      } = {}
    } = this.state.phoneBook;
    const { isFetching } = this.state;
    return (
      <div className="container">
        {!isFetching && this.header()}
        {!isFetching && this.dashboard({ min, max, count: phoneNumbers.length })}
        {!isFetching && this.phoneList(phoneNumbers)}
        {!isFetching && this.inputControls(phoneNumbers)}
      </div>
    );
  }
}

PhoneBook.propTypes = {
  generatePhoneNumbers: PropTypes.func.isRequired,
  getAllPhoneNumbers: PropTypes.func.isRequired,
  clearAllPhoneNumbers: PropTypes.func.isRequired,
  phoneBook: PropTypes.exact({
    message: PropTypes.string,
    data: PropTypes.exact({
      phoneNumbers: PropTypes.array.isRequired,
      getMinMaxPhoneNumbers: PropTypes.exact({
        min: PropTypes.string.isRequired,
        max: PropTypes.string.isRequired,
      }),
      message: PropTypes.string,
    })
  }),
};

export const mapStateToProps = state => ({
  ...state,
});

export const mapDispatchToProps = dispatch => ({
  generatePhoneNumbers: (limit, sort) => dispatch(phoneBook.getPhoneNumbers(limit, sort)),
  getAllPhoneNumbers: () => dispatch(phoneBook.getSavePhoneNumbers()),
  clearAllPhoneNumbers: () => dispatch(phoneBook.clearFileContent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);
