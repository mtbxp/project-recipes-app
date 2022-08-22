import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import cardContext from '../context/cardContext';

function SearchBar({ history }) {
  const { type, setTypeFilter, setSearchItem, recipe } = useContext(cardContext);
  const [textSearch, setTextSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleClick = () => {
    setSearchItem(textSearch);
    setTypeFilter(filterType);
    setTextSearch('');
  };

  useEffect(() => {
    if (recipe === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (recipe !== null && type === 'foods' && recipe.length === 1) {
      const item = recipe[0].idMeal;
      history.push(`/${type}/${item}`);
    }
    if (recipe !== null && type === 'drinks' && recipe.length === 1) {
      const item = recipe[0].idDrink;
      history.push(`/${type}/${item}`);
    }
  }, [recipe, type, history]);

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
      <section>
        {
          recipe !== null && type === 'drinks' && recipe.length > 1
          && recipe.map((rec, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ rec.strDrinkThumb }
                alt={ rec.strDrink }
              />
              <h3 data-testid={ `${index}-card-name` }>
                {rec.strDrink}
              </h3>
            </div>
          ))
        }
        {
          recipe !== null && type === 'foods' && recipe.length > 1
          && recipe.map((rec, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ rec.strMealThumb }
                alt={ rec.strMeal }
              />
              <h3 data-testid={ `${index}-card-name` }>
                {rec.strMeal}
              </h3>
            </div>
          ))
        }
      </section>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape,
  location: PropTypes.shape,
}.isRequired;

export default SearchBar;
