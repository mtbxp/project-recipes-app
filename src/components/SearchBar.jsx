import React, { useContext, useState } from 'react';
import cardContext from '../context/cardContext';

function SearchBar() {
  const { setTypeFilter, setSearchItem } = useContext(cardContext);
  const [textSearch, setTextSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleClick = () => {
    setSearchItem(textSearch);
    setTypeFilter(filterType);
    setTextSearch('');
  };

  return (
    <div className="search">
      <header>
        <input
          type="text"
          value={ textSearch }
          onChange={ ({ target }) => setTextSearch(target.value) }
          data-testid="search-input"
        />
        <div className="radio-item">
          <label htmlFor="ingredient">
            <input
              id="ingredient"
              type="radio"
              name="search"
              data-testid="ingredient-search-radio"
              onClick={ () => setFilterType('ingredient') }
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              id="name"
              type="radio"
              name="search"
              data-testid="name-search-radio"
              onClick={ () => setFilterType('name') }
            />
            Name
          </label>
          <label htmlFor="letter">
            <input
              id="letter"
              type="radio"
              name="search"
              data-testid="first-letter-search-radio"
              onClick={ () => setFilterType('letter') }
            />
            Letter
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </header>
    </div>
  );
}

export default SearchBar;
