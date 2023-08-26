import React from 'react';
import './ContactList.css';

class ContactList extends React.Component {
  state = {};

  handleClick = id => {
    this.props.deleteContact(id)
  };

  render() {
    return (
      <section className="ContactList">
        <ul className="ContactList__list">
          {this.props.contacts.map(element => (
            <li
              className="ContactList__list__item"
              key={element.id}
              id={element.id}
            >
              {element.name}: {element.number}
              <button
                type='button'
                className="ContactList__list__button"
                onClick={() => this.handleClick(element.id)} >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  };
};

export default ContactList;