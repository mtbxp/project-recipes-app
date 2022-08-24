import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import mockedDrinks from './mock/drinks';
import { mockedMeals } from './mock/meals';

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      ...mockedMeals,
      ...mockedDrinks,
    }),
  }));

  global.alert = jest.fn(() => '');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('test recomendations', () => {
  it('recomendations drink aparear 6', () => {
    const history = createMemoryHistory();
    history.push('/drinks');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });
});
