import React, { useState } from 'react';
import axios from 'axios';

const registerUrl =
  'https://fjfk0i4r55.execute-api.us-east-2.amazonaws.com/prod/register';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      name.trim() === '' ||
      password.trim() === ''
    ) {
      setMessage('All fields are required');
      return;
    }
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'M28df8w8qd8lPuRKt31bMS2DGunfu6w16HV6SEl6',
      },
    };
    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password,
    };
    axios
      .post(registerUrl, requestBody, requestConfig)
      .then((response) => {
        setMessage('Registration successful!');
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage(error.response.data.message);
        } else {
          setMessage(
            'Sorry... the backend server is down! Please try again later',
          );
        }
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        name:{' '}
        <input
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />{' '}
        <br />
        email:{' '}
        <input
          type='text'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />{' '}
        <br />
        username:{' '}
        <input
          type='text'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />{' '}
        <br />
        password:{' '}
        <input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />{' '}
        <input type='submit' value='Register' />
      </form>
      {message && <p className='message'>{message}</p>}
    </div>
  );
}
