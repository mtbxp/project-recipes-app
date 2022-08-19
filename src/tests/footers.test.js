import { screen } from "@testing-library/react";
import React from "react";
import App from "../App";
import renderWithRouter from "./helpers/utils";
import userEvent from '@testing-library/user-event';

test('se footer é renderizado na tela foods', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/foods');
  const drinks = screen.getByTestId('drinks-bottom-btn')
  const foods = screen.getByTestId('food-bottom-btn')
  expect(drinks).toBeInTheDocument();
  expect(foods).toBeInTheDocument();
  userEvent.click(drinks);
  expect(history.location.pathname).toBe('/drinks');
  userEvent.click(foods);
  expect(history.location.pathname).toBe('/foods');
});

test('se footer é renderizado na tela drinks', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/drinks');
  const drinks = screen.getByTestId('drinks-bottom-btn')
  const foods = screen.getByTestId('food-bottom-btn')
  expect(drinks).toBeInTheDocument();
  expect(foods).toBeInTheDocument();
  userEvent.click(drinks);
  expect(history.location.pathname).toBe('/drinks');
  userEvent.click(foods);
  expect(history.location.pathname).toBe('/foods');
});

test('se footer é renderizado na tela profile', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/profile');
  const drinks = screen.getByTestId('drinks-bottom-btn')
  const foods = screen.getByTestId('food-bottom-btn')
  expect(drinks).toBeInTheDocument();
  expect(foods).toBeInTheDocument();
});
