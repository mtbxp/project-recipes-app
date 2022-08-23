import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Recomendations from '../components/Recommendations';
import ShareAndFavorite from '../components/ShareAndFavorite';
import cardContext from '../context/cardContext';
import './css/RecipeDetails.css';

function RecipesDetails() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const type = location.pathname.includes('drink') ? 'drinks' : 'foods';
  const { setRecipeDetail } = useContext(cardContext);
  const [recipeRecom, setRecipeRecom] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [video, setVideo] = useState('');
  const [ingredients, setIngredients] = useState('');
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const nullNull = 'null - null';

  useEffect(() => {
    const fetchApi = async (url, dataType) => {
      const res = await fetch(url);
      const data = await res.json();
      const recipeData = data[dataType][0];

      setRecipe(recipeData);
      setRecipeDetail(recipeData);
      console.log(recipeData);

      if (dataType === 'meals') {
        setVideo(recipeData.strYoutube.replace('watch?v=', 'embed/'));
      }

      const ingredientFilter = Object.entries(recipeData)
        .filter((ingredient) => ingredient[0].includes('strIngredient'));

      const measureFilter = Object.entries(recipeData)
        .filter((measure) => measure[0].includes('strMeasure'));

      const ingredientsList = ingredientFilter
        .map((ingredient, index) => `${ingredient[1]} - ${measureFilter[index][1]}`);

      const filterIngredients = ingredientsList
        .filter((ingredient) => ingredient !== nullNull && ingredient !== ' - ');

      setIngredients(filterIngredients);
    };
    if (type === 'foods') {
      fetchApi(foodEndpoint, 'meals');
    }
    if (type === 'drinks') {
      fetchApi(drinkEndpoint, 'drinks');
    }
  }, []);

  useEffect(() => {
    const fetchRecom = async (url, dataType) => {
      const res = await fetch(url);
      const data = await res.json();
      const mgnum = 6;
      const filtredData = data[dataType].length > mgnum
      && data[dataType].filter((e) => data[dataType].indexOf(e) < mgnum);
      setRecipeRecom(filtredData);
    };
    if (type === 'foods') {
      fetchRecom('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
    }
    if (type === 'drinks') {
      fetchRecom('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
    }
  }, []);

  return (
    <div>
      {location.pathname.includes('drink') ? (
        <div>
          <div>
            <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
            <ShareAndFavorite />
          </div>
          <p data-testid="recipe-category">
            {' '}
            {recipe.strAlcoholic}
          </p>
          <img
            data-testid="recipe-photo"
            src={ recipe.strDrinkThumb }
            className="hero"
            alt="imagem da receita"
          />
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
      ) : (
        <div>
          <div>
            <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
            <ShareAndFavorite />
          </div>
          <p data-testid="recipe-category">
            {' '}
            {recipe.strCategory}
          </p>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            className="hero"
            alt="imagem da receita"
          />
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <iframe
            data-testid="video"
            src={ video }
            title="recipe video"
          />
        </div>
      )}
      <ul>
        {Array.isArray(ingredients) && ingredients.map((ingredient, index) => (
          (ingredient !== 'null - null' || ingredient !== '-')
          && (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>
          )
        ))}
      </ul>
      { recipeRecom.length > 1 && <Recomendations recipesRecom={ recipeRecom } />}
      <div className="start-content">
        <button
          className="start"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/${type}/${id}/in-progress`) }
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipesDetails;
