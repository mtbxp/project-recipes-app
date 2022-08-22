import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import cardContext from '../context/cardContext';

function Recipe(props) {
  const { history } = props;
  const { type, recipe } = useContext(cardContext);

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
    <div>
      <Header { ...props } />
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
      <Footer />
    </div>);
}

Recipe.propTypes = {
  history: PropTypes.shape,
  location: PropTypes.shape,
}.isRequired;

export default Recipe;
