import React from 'react';
import Header from '../components/Header';

function Profile(props) {
  return (
    <div>
      <Header { ...props } />
      Profile
    </div>);
}

export default Profile;
