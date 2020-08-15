import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChanges = e => {
    setCredentials({
      ...credentials, [e.target.name]: e.target.value
    })
    // console.log('changes in login', e.target.value)
  }

  const logUserIn = e => {
    e.preventDefault();

    axiosWithAuth()
    .post('/login', credentials)
    
    .then((res) => {
      console.log('succesfull login', res)
      localStorage.setItem('auth-token', res.data.payload)
      window.location.href='/bubble-page'
      // props.history.push('/bubble-page')
    })
    .catch((res) => {
      console.log('login failed', res)
    })
    
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
            <form onSubmit={logUserIn}>
                <input
                    type='text'
                    name='username'
                    placeholder='username'
                    onChange={handleChanges}
                    value={credentials.username}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleChanges}
                    value={credentials.password}
                />
                <button type='submit' onSubmit={logUserIn}>Log In</button>
            </form>
        </div>
    </>
  );
};

export default Login;
