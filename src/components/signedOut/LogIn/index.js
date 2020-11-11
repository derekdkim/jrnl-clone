import React, { useState, useEffect } from 'react';
import './index.css';
import firebase from '../../../Firebase.js';
import { Link, useHistory } from 'react-router-dom';

import { useAuthContext } from '../../../context/AuthContextProvider.js';

const LogIn = (props) => {
  const [email, setEmail] = useState({errMsg: ''});
  const [password, setPassword] = useState({errMsg: ''});
  const [formCompleted, setFormCompleted] = useState(false);

  const auth = useAuthContext();
  const history = useHistory();

  const validateEmail = (event) => {
    const currValue = event.target.value;
    let currErrMsg = '';
    let currValidity = true;

    if (currValue.length === 0) {
      currErrMsg = 'Enter email';
      currValidity = false;
    }

    setEmail({
      value: currValue,
      errMsg: currErrMsg,
      valid: currValidity
    });
  }

  const validatePassword = (event) => {
    const currValue = event.target.value;
    let currErrMsg = '';
    let currValidity = true;

    if (currValue.length === 0) {
      currErrMsg = 'Enter password';
      currValidity = false;
    }

    setPassword({
      value: currValue,
      errMsg: currErrMsg,
      valid: currValidity
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function() {
      auth.setLoggedIn(true);
      history.push('/timeline');
    }).catch(function(error) {
      console.log(`Error ${error.code}: ${error.message}`);
    });
  }

  const guestLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword('demouser@imaginarydomain.com', 'TestAllDay').then(function() {
      auth.setLoggedIn(true);
      history.push('/timeline');
    }).catch(function(error) {
      console.log(`Error ${error.code}: ${error.message}`);
    });
  }

  useEffect(() => {
    if (email.valid && password.valid) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }
  }, [email, password]);

  return(
    <div className='signed-out-tab-container'>
      <div className='form-container'>
        <form 
          className='auth-form'
          onSubmit={handleLogin}
          noValidate
        >
          <div className='input-container'>
            <label htmlFor='login-id-input'>Email</label>
            <input 
              type='text' 
              className='text-input' 
              id='login-id-input'
              onChange={validateEmail}
              required
            ></input>
            <span className='text-input-error'>{email.errMsg}</span>
          </div>
          <div className='input-container'>
            <label htmlFor='login-password-input'>Password</label>
            <input 
              type='text' 
              className='text-input' 
              id='login-password-input'
              onChange={validatePassword}
              required
            ></input>
            <span className='text-input-error'>{password.errMsg}</span>
          </div>
          <button 
            className={formCompleted ? 'auth-btn' : 'auth-btn disabled-btn'} 
            disabled={!formCompleted}
          >LOGIN TO MY ACCOUNT</button>
          <button 
            className='auth-btn' 
            id='guest-login-btn'
            type='button'
            onClick={guestLogin}
          >LOGIN AS GUEST</button>
          <div>
            <Link id='pwd-recovery-link' to='/forgot-password/'>FORGOT PASSWORD?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;