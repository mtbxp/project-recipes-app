import PropTypes from 'prop-types';
import React, { useState } from 'react';
import cardContext from './cardContext';

function CardProvider({ children }) {
  const [type, setType] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState([]);

  const contextValue = {
    type,
    setType,
    searchItem,
    setSearchItem,
    typeFilter,
    setTypeFilter,
    recipe,
    setRecipe,
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
