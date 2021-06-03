import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)

    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();   
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByLabelText('First Name*')
    userEvent.type(firstInput, 'Coop');

    const err = await screen.findByTestId(/error/i)
    expect(err).toBeInTheDocument(); 
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole('button')
    userEvent.click(button);

    const err = await screen.findAllByTestId(/error/i)
    expect(err).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByLabelText('First Name*')
    userEvent.type(firstInput,'Cooper');

    const secondInput = screen.getByLabelText('Last Name*')
    userEvent.type(secondInput,'Jones');

    const button = screen.getByRole('button')
    userEvent.click(button);

    const err = await screen.findByTestId(/error/i)
    expect(err).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const thirdInput = screen.getByLabelText('Email*')
    userEvent.type(thirdInput, 'cooper.ewood');

    const err = await screen.findByTestId(/error/i)
    expect(err).toHaveTextContent('email must be a valid email address');
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByLabelText('First Name*')
    userEvent.type(firstInput, 'Cooper');

    const thirdInput = screen.getByLabelText('Email*')
    userEvent.type(thirdInput, 'cooper.ewood@gmail.com');

    const button = screen.getByRole('button')
    userEvent.click(button);

    const err = await screen.findByTestId(/error/i)
    expect(err).toHaveTextContent('lastName is a required field'); 
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByLabelText('First Name*')
    userEvent.type(firstInput, 'Cooper');

    const secondInput = screen.getByLabelText('Last Name*')
    userEvent.type(secondInput, 'Jones');

    const thirdInput = screen.getByLabelText('Email*')
    userEvent.type(thirdInput, 'cooper.ewood@gmail.com');

    const button = screen.getByRole('button')
    userEvent.click(button);

    const firstNameSubmmitted = await screen.findByTestId('firstnameDisplay')
    expect(firstNameSubmmitted).toBeInTheDocument();

    const lastNameSubmitted = await screen.findByTestId('lastnameDisplay')
    expect(lastNameSubmitted).toBeInTheDocument();

    const emailSubmitted = await screen.findByTestId('emailDisplay')
    expect(emailSubmitted).toBeInTheDocument();

    const messageSubmmited = await screen.queryByTestId('messageDisplay')
    expect(messageSubmmited).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)

    const firstInput = screen.getByLabelText('First Name*')
    userEvent.type(firstInput, 'Cooper');

    const secondInput = screen.getByLabelText('Last Name*')
    userEvent.type(secondInput, 'Jones');

    const thirdInput = screen.getByLabelText('Email*')
    userEvent.type(thirdInput, 'cooper.ewood@gmail.com');

    const fourthInput = screen.getByLabelText('Message')
    userEvent.type(fourthInput, 'Howdy there partner');

    const button = screen.getByRole('button')
    userEvent.click(button);

    const firstNameSubmmitted = await screen.findByTestId('firstnameDisplay')
    expect(firstNameSubmmitted).toBeInTheDocument();

    const lastNameSubmitted = await screen.findByTestId('lastnameDisplay')
    expect(lastNameSubmitted).toBeInTheDocument();

    const emailSubmitted = await screen.findByTestId('emailDisplay')
    expect(emailSubmitted).toBeInTheDocument();

    const messageSubmmited = await screen.queryByTestId('messageDisplay')
    expect(messageSubmmited).toBeInTheDocument();
});