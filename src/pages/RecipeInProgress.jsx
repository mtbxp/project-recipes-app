import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ShareAndFavorite from '../components/ShareAndFavorite';
import './css/RecipeDetails.css';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const type = pathname.includes('drink') ? 'drinks' : 'foods';
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [contextListIngredients, setContextListIngredients] = useState([]);
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    const fetchApi = async (url, dataType) => {
      const res = await fetch(url);
      const data = await res.json();
      const recipeData = data[dataType][0];

      setRecipeDetail(recipeData);

      const ingredientFilter = Object.entries(recipeData)
        .filter((ingredient) => ingredient[0].includes('strIngredient')
        && ingredient[1] !== null && ingredient[1] !== '');

      const measureFilter = Object.entries(recipeData)
        .filter((measure) => measure[0].includes('strMeasure')
        && measure[1] !== null && measure[1] !== '');

      const ingredientsList = ingredientFilter
        .map((ingredient, index) => (measureFilter[index][1] === null
          ? `${ingredient[1]}` : `${ingredient[1]} - ${measureFilter[index][1]}`));

      setContextListIngredients(ingredientsList);
    };
    if (type === 'foods') {
      fetchApi(foodEndpoint, 'meals');
    }
    if (type === 'drinks') {
      fetchApi(drinkEndpoint, 'drinks');
    }
  }, []);

  return (
    <div>
      <ShareAndFavorite />
      <h1 data-testid="recipe-title">
        {type === 'foods' ? recipeDetail.strMeal : recipeDetail.strDrink}
      </h1>
      <img
        className="hero"
        data-testid="recipe-photo"
        src={ type === 'foods' ? recipeDetail.strMealThumb : recipeDetail.strDrinkThumb }
        alt={ type === 'foods' ? recipeDetail.strMeal : recipeDetail.strDrink }
      />
      <p data-testid="recipe-category" />
      { contextListIngredients.length > 0
      && contextListIngredients.map((ingredient, index) => (
        <label key={ index } htmlFor={ index }>
          <input
            id={ index }
            type="checkbox"
            data-testid={ `${index}-ingredient-step` }
          />
          {ingredient}
        </label>
      ))}
      <p data-testid="instructions">
        { recipeDetail.strInstructions }
      </p>
      <button type="button" data-testid="finish-recipe-btn" disabled={ false }>
        Finalizar
      </button>
    </div>
  );
}

export default RecipeInProgress;
