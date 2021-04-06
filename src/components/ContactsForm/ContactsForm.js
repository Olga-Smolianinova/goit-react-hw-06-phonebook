import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux'; //для подключения к глобальному store.js

// Data
import contactsOperations from '../../redux/phonebook-operations';

// Styles
import s from './ContactsForm.module.css';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  //ввод данных
  handleChange = event => {
    // console.log(event.currentTarget.value);

    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  // для отправки (submit) формы
  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

    // деструктуризация свойств из глобального state и store
    const { name, number } = this.state;
    const { contacts, onSubmit } = this.props;

    //  проверка на возможность добавлять контакты, имена которых уже есть в телефонной книге. При попытке выполнить такое действие выводим alert с предупреждением.
    if (contacts.some(elm => elm.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in contacts`);
    }
    if (
      contacts.some(elm => elm.number.toLowerCase() === number.toLowerCase())
    ) {
      return alert(`${number} is already in contacts`);
    }

    //   во время отправки (submit) формы обращаемся к prop onSubmit для передачи данных из  state (name, number) через mapDispatchToProps
    onSubmit(this.state);

    // вызов reset для очистки  данных формы,
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label>
          Name
          <input
            className={s.inputName}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>

        <button
          type="submit"
          // disabled={!this.state.name || !this.state.number}
          className={s.formBtn}
        >
          Add Contact
        </button>
      </form>
    );
  }
}

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contacts: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) =>
    dispatch(contactsOperations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsForm);
