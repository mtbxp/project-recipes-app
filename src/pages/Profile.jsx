import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile(props) {
  console.log('fui renderizado');
  return (
    <div>
      <Header { ...props } />
      Profile
      <Footer />
    </div>);
}

export default Profile;
