import React from 'react';

function SearchBar() {
  return (
    <div className="search">
      <input type="text" data-testid="search-input" />
      <div className="radio-item">
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            name="search"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            name="search"
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="letter">
          <input
            id="letter"
            type="radio"
            name="search"
            data-testid="first-letter-search-radio"
          />
          Letter
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
