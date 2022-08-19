import React from 'react';
import Header from '../components/Header';

function Recipe(props) {
  return (
    <div>
      <Header { ...props } />
      Recipe
    </div>);
}

export default Recipe;
