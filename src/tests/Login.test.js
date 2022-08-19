import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './Helpers';
import userEvent from '@testing-library/user-event'

test('', () => {
  const { history } = renderWithRouter(<App />);
  const inputEmail = screen.getByTestId('email-input');
  userEvent.type(inputEmail, '123@123.com');
  expect(inputEmail).toBeInTheDocument();

  const inputPassword = screen.getByTestId('password-input');
  userEvent.type(inputPassword, '123456');
  expect(inputPassword).toBeInTheDocument();

  const enterButton = screen.getByTestId('login-submit-btn');
  userEvent.click(enterButton);
  expect(history.location.pathname).toBe('/foods')
});