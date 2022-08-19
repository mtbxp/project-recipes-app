import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ meals: [] }),
  }));

  global.alert = jest.fn(() => '');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('test header component', () => {
  it('search bar in /foods', () => {
    const history = createMemoryHistory();
    history.push('/foods');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByTestId('btn-search'));
    const input = screen.getByTestId('search-input');
    expect(input).toBeDefined();
    const ingredient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const letter = screen.getByTestId('first-letter-search-radio');
    const btn = screen.getByTestId('exec-search-btn');
    expect(ingredient).toBeDefined();
    expect(name).toBeDefined();
    expect(letter).toBeDefined();

    userEvent.click(ingredient);
    userEvent.click(btn);

    expect(fetch).toBeCalledTimes(1);

    userEvent.click(name);
    userEvent.click(btn);

    expect(fetch).toBeCalledTimes(2);

    userEvent.click(letter);
    userEvent.click(btn);

    const mgNum = 3;
    expect(fetch).toBeCalledTimes(mgNum);

    userEvent.click(letter);
    userEvent.type(input, 'aa');
    userEvent.click(btn);

    expect(global.alert).toBeCalled();
  });

  it('search bar in /drinks', () => {
    const history = createMemoryHistory();
    history.push('/drinks');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByTestId('btn-search'));
    const input = screen.getByTestId('search-input');
    expect(input).toBeDefined();
    const ingredient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const letter = screen.getByTestId('first-letter-search-radio');
    const btn = screen.getByTestId('exec-search-btn');
    expect(ingredient).toBeDefined();
    expect(name).toBeDefined();
    expect(letter).toBeDefined();

    userEvent.click(ingredient);
    userEvent.type(input, 'lemon');
    userEvent.click(btn);

    expect(fetch).toBeCalledTimes(1);

    userEvent.click(name);
    userEvent.click(btn);

    expect(fetch).toBeCalledTimes(2);

    userEvent.click(letter);
    userEvent.click(btn);

    const mgNum = 3;
    expect(fetch).toBeCalledTimes(mgNum);

    userEvent.click(letter);
    userEvent.type(input, 'aa');
    userEvent.click(btn);

    expect(global.alert).toBeCalled();
  });
});
