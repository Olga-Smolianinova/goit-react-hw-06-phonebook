import React, { Component } from 'react';

// Components
import ContactsForm from './components/ContactsForm';

import Filter from './components/Filter';

import ContactList from './components/ContactList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>

        <ContactsForm />

        <h2>Contacts</h2>

        <Filter />

        <ContactList />
      </div>
    );
  }
}

export default App;
