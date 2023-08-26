import React from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter'

const initialContacts = [
  {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends React.Component {
  state = {
  contacts: initialContacts,
  filter: ''
}

  addNewContact = ({ name, number }) => {
    const contactArray = this.state.contacts;
    if (contactArray.find(e=> e.name===name )) {
      alert(name + ' is already in contacts!'); 
      return;
    }
    contactArray.push({ id: nanoid(), name: name, number: number });
    this.setState({ contacts: contactArray });
  }
  
  deleteOldContact = ( id ) => { 
    const contactArray = this.state.contacts.filter(contact => contact.id !== id);   
    this.setState({ contacts: contactArray });
  }

  handleFilter = ({ target }) => {
    const normalizedFilter = target.value.trim().toLowerCase();
    this.setState({ filter: normalizedFilter });
    //console.log(this.state.filter)
  }

  getFilteredContacts = () => {
    return this.state.contacts.filter(
      ({ name }) => name.toLowerCase().includes(this.state.filter)
    )
  }

  componentDidMount() { 
    const storagedContacts = localStorage.getItem('contacts');
    if (storagedContacts) { 
      this.setState({contacts:JSON.parse(storagedContacts)}) 
    } else {
      this.setState({contacts:initialContacts}) 
    }
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.state.contacts !== prevState.contact) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
    
  render() {

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101' 
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          addContact={this.addNewContact}
        /> 
                
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          setFilter={this.handleFilter}
        />
        
        {this.getFilteredContacts().length ? (
          <ContactList
            contacts={this.getFilteredContacts()}
            deleteContact={this.deleteOldContact}
          />
          ) : (
          <p>No matches found!</p>  
          ) 
        }
        
      </div>
    );
  };
}