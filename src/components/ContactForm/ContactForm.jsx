import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './ContactForm.css';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Must have a character")
    .max(255, "Must be shorter than 255")
    .required("Must enter name and/or surname"),
  number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    //.min(10, "too short")
    //.max(10, "too long")
    .required("Must enter a phone number")
});

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  }
 
  handleSubmit = (values, {resetForm}) => {
    this.setState = ({name:values.name, number:values.number})
    this.props.addContact(values);
    resetForm();
  };
  
  render() {
    return (
      <Formik
        initialValues={this.state}
        validationSchema={signupSchema}
        onSubmit={this.handleSubmit}>
        <Form
          className="ContactForm__form"
          autoComplete="off">
          <label
            className="ContactForm__form__label"
            htmlFor="name">
            Name
            <Field
              className='ContactForm__form__field'
              type="text"
              name="name" />
            <ErrorMessage
              className='ContactForm__form__error'
              name='name'
              component='div' />
          </label>
          <label
            className="ContactForm__form__label"
            htmlFor="number">
            Number
            <Field
              className='ContactForm__form__field'
              type="tel"
              name="number" />
            <ErrorMessage
              className='ContactForm__form__error'
              name='number'
              component='div' />
          </label>
          <button
            id='ContactForm__form__button'
            type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    );
  };
}

export default ContactForm;