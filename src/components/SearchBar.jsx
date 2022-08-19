import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function SearchBar({ type, history }) {
  const [textSearch, setTextSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    if (type === 'drinks') {
      const fetchItem = async (url) => {
        const data = await fetch(url).then((res) => res.json());
        console.log(data);
        if (data.drinks.length === 1) {
          const item = data.drinks[0].idDrink;
          history.push(`/${type}/${item}`);
        }
        return data.drinks;
      };

      if (typeFilter === 'ingredient') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchItem}`;
        fetchItem(url);
      }
      if (typeFilter === 'name') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchItem}`;
        fetchItem(url);
      }
      if (typeFilter === 'letter') {
        if (searchItem.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        } else {
          const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchItem}`;
          fetchItem(url);
        }
      }
    }
  }, [typeFilter, searchItem]);

  useEffect(() => {
    if (type === 'foods') {
      const fetchItem = async (url) => {
        const data = await fetch(url).then((res) => res.json());
        if (data.meals.length === 1) {
          const item = data.meals[0].idMeal;
          history.push(`/${type}/${item}`);
        }
        return data.meals;
      };
      if (typeFilter === 'ingredient') {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchItem}`;
        fetchItem(url);
      }
      if (typeFilter === 'name') {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`;
        fetchItem(url);
      }
      if (typeFilter === 'letter') {
        if (searchItem.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        } else {
          const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchItem}`;
          fetchItem(url);
        }
      }
    }
  }, [typeFilter, searchItem]);

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
