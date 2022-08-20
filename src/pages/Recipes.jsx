import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Recipe(props) {
  return (
    <div>
      <Header { ...props } />
      Recipe
      <Footer />
    </div>);
}

export default Recipe;
