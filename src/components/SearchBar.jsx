import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function SearchBar({ type, history }) {
  const [recipe, setRecipe] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    if (type === 'drinks') {
      const fetchItem = async (url) => {
        const data = await fetch(url).then((res) => res.json());
        const mgnum = 12;
        const filtredData = data.drinks !== null && data.drinks.length > mgnum
          ? data.drinks.filter((e) => data.drinks.indexOf(e) < mgnum)
          : data.drinks;
        setRecipe(filtredData);
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
  }, [typeFilter, searchItem, type]);

  useEffect(() => {
    if (type === 'foods') {
      const fetchItem = async (url) => {
        const data = await fetch(url).then((res) => res.json());
        const mgnum = 12;
        const filtredData = data.meals !== null && data.meals.length > mgnum
          ? data.meals.filter((e) => data.meals.indexOf(e) < mgnum)
          : data.meals;
        setRecipe(filtredData);
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
  }, [typeFilter, searchItem, type]);

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
  }, [recipe, type]);

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
  type: PropTypes.string,
}.isRequired;

export default SearchBar;
