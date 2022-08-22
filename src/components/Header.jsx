import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import cardContext from '../context/cardContext';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const contentsSearchIcon = ['foods', 'drinks'];

function Header(props) {
  const [searchIcon, setSearchIcon] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { setType } = useContext(cardContext);
  const [title, setTitle] = useState('');
  const { location: { pathname }, history } = props;

  useEffect(() => {
    const path = pathname.replace('/', '').replace('-', ' ');
    if (contentsSearchIcon.includes(path)) {
      setSearchIcon(true);
      setType(path);
    }
    const titleNew = path.toLowerCase().split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
    setTitle(titleNew);
  }, [pathname, setType]);

  return (
    <header>
      <div>
        <button
          type="button"
          onClick={ () => { history.push('/profile'); } }
          data-testid="btn-profile"
        >
          <img
            src={ profile }
            alt=""
            data-testid="profile-top-btn"
          />
        </button>
        <p data-testid="page-title">{title}</p>
        { searchIcon && (
          <button
            type="button"
            onClick={ () => { setShowSearch((prev) => !prev); } }
            data-testid="btn-search"
          >
            <img src={ search } alt="" data-testid="search-top-btn" />
          </button>
        )}
        { showSearch && <SearchBar history={ history } /> }
      </div>
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape,
  location: PropTypes.shape,
}.isRequired;

export default Header;
