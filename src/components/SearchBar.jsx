import React, { useEffect, useState } from 'react';

function SearchBar() {
  const [textSearch, setTextSearch] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchItem = async (url) => {
      const data = await fetch(url).then((res) => res.json());
      return data;
    };

    if (filterType === 'ingredient') {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchItem}`;
      fetchItem(url);
    }
    if (filterType === 'name') {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`;
      fetchItem(url);
    }
    if (filterType === 'letter') {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchItem}`;
      fetchItem(url);
      if (filterType.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  }, [filterType, searchItem]);

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
        onClick={ () => setSearchItem(textSearch) }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
