import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import cardContext from './cardContext';

function CardProvider({ children }) {
  const [type, setType] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState([]);

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

  const contextValue = {
    type,
    setType,
    setSearchItem,
    setTypeFilter,
    recipe,
    recipeDetail,
    setRecipeDetail,
  };

  return (
    <cardContext.Provider value={ contextValue }>
      { children }
    </cardContext.Provider>
  );
}

CardProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default CardProvider;
