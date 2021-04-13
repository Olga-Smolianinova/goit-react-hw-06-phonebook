import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux'; //для подключения к глобальному store.js

// Data
import { contactsActions, contactsSelectors } from '../../redux/phonebook';

const Filter = ({ value, onChange }) => (
  <label>
    Find contacts by name
    <br />
    <input type="text" value={value} onChange={onChange} />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: contactsSelectors.getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(contactsActions.changeFilter(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
