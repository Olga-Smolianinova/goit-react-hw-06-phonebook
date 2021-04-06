import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux'; //для подключения к глобальному store.js

// Data
import contactsOperations from '../../redux/phonebook-operations';

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

// вычисляемые свойства для фильтрации. Отфильтровываем те contacts, которые includes то, что мы записали в input Фильтр по имени и в ContactList рендерим не все <ContactList
//   contacts={contacts}, а только отфильтрованые, т.е.  contacts={getFilteredContacts}/>
const getFilteredContacts = (allContacts, filter) => {
  // для чистоты кода выведем filter.toLowerCase() в отдельную переменную
  const normalizedFilter = filter.toLowerCase();

  return allContacts.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(normalizedFilter) ||
      number.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  // phonebook: имя ключа для state в store.js
  // для отображения по фильтру
  contacts: getFilteredContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
