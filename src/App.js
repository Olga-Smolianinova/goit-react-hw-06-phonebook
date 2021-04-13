import React, { Component } from 'react';

import { connect } from 'react-redux';

// Data
import { contactsOperations, contactsSelectors } from './redux/phonebook';

// Components
import ContactsForm from './components/ContactsForm';

import Filter from './components/Filter';

import ContactList from './components/ContactList';

class App extends Component {
  //  ЖИЗНЕННЫЕ ЦИКЛЫ
  componentDidMount() {
    // // при Mount страницы, чтобы из локального бекенда db.json - отрисовывались данные (contacts)
    this.props.fetchContacts();
  }

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>

        <ContactsForm />

        <h2>Contacts</h2>

        <Filter />

        {/* добавляем отображение Loading при открытии страницы при загрузке данных*/}
        {this.props.isLoadingContacts && <h2>Loading...</h2>}

        <ContactList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // isLoadingContacts: state.contacts.loading, //без использования selectors

  isLoadingContacts: contactsSelectors.getLoading(state), //с использованием selectors
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
