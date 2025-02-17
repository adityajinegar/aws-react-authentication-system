import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from './service/AuthService';
import axios from 'axios';

const loginUrl =
  'https://fjfk0i4r55.execute-api.us-east-2.amazonaws.com/prod/login';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Both username and password are required');
      return;
    }
    setErrorMessage(null);
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'M28df8w8qd8lPuRKt31bMS2DGunfu6w16HV6SEl6',
      },
    };
    const requestBody = {
      username: username,
      password: password,
    };

    axios
      .post(loginUrl, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        navigate('/premium-content');
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(
            'Sorry... the backend server is down.please try again later!',
          );
        }
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        username:{' '}
        <input
          type='text'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        password:{' '}
        <input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input type='submit' value='Login' />
      </form>
      {errorMessage && <p className='message'>{errorMessage}</p>}
    </div>
  );
}
