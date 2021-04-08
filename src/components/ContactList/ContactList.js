import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux'; //для подключения к глобальному store.js

// Data
import contactsOperations from '../../redux/phonebook-operations';

import contactsSelectors from '../../redux/phonebook-selectors';

import s from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={s.ContactsList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.ContactsItem}>
          {name}: {number}
          <button
            type="button"
            onClick={() => {
              onDeleteContact(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // phonebook: имя ключа для state в store.js
  // для отображения по фильтру
  contacts: contactsSelectors.getFilteredContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
