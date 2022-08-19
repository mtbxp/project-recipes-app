import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const number6 = 6;

  const validateButton = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  return (
    <div>
      <form>
        <input
          onChange={ handleChangeEmail }
          value={ email }
          type="email"
          data-testid="email-input"
        />
        <input
          onChange={ handleChangePassword }
          value={ password }
          type="password"
          data-testid="password-input"
        />
        <button
          onClick={ handleClick }
          disabled={ password.length < number6 || !validateButton() }
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>);
}

export default Login;
