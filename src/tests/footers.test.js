import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import React from "react";
import App from "../App";
import renderWithRouter from "./helpers/utils";

test('se footer é renderizado na tela foods', async () => {
  const { history } = renderWithRouter(<App />);
  history.push('/foods');
  const drinks = screen.getByTestId('drinks-bottom-btn');
  const foods = screen.getByTestId('food-bottom-btn');
  expect(drinks).toBeInTheDocument();
  expect(foods).toBeInTheDocument();
  userEvent.click(drinks);
  expect(history.location.pathname).toBe('/drinks');

  const foodsBtn = screen.getByTestId('food-bottom-btn');
  userEvent.click(foodsBtn);
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
