import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function SearchBar({ type }) {
  const [textSearch, setTextSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const fetchItem = async (url) => {
      const data = await fetch(url).then((res) => res.json());
      return data;
    };

    if (typeFilter === 'ingredient') {
      const url = type === 'Foods'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchItem}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchItem}`;
      fetchItem(url);
    }
    if (typeFilter === 'name') {
      const url = type === 'Foods'
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchItem}`;
      fetchItem(url);
    }
    if (typeFilter === 'letter') {
      if (searchItem.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const url = type === 'Foods'
          ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchItem}`
          : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchItem}`;
        fetchItem(url);
      }
    }
  }, [typeFilter, searchItem, type]);

  const handleClick = () => {
    setSearchItem(textSearch);
    setTypeFilter(filterType);
    setTextSearch('');
  };

  return (
    <div className="search">
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
    </div>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default SearchBar;
