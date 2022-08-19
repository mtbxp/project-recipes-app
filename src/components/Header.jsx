import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

const contentsSearchIcon = ['/', 'foods', 'drinks'];

function Header(props) {
  const [searchIcon, setSearchIcon] = useState(false);
  const [title, setTitle] = useState('');
  const { location: { pathname } } = props;
  console.log(props);

  useEffect(() => {
    const path = pathname.replace('/', '').replace('-', ' ');
    if (contentsSearchIcon.includes(path)) {
      setSearchIcon(true);
    }
    const titleNew = path.toLowerCase().split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
    setTitle(titleNew);
  }, [pathname]);

  return (
    <header>
      <div>
        <img src={ profile } alt="" data-testid="profile-top-btn" />
        <p data-testid="page-title">{title}</p>
        { searchIcon && <img src={ search } alt="" data-testid="search-top-btn" /> }
      </div>
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape,
  location: PropTypes.shape,
}.isRequired;

export default Header;
