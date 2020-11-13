import React, { useEffect, useState } from 'react';
import firebase from '../../../Firebase.js';

import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState({errMsg: ''});
  const [password, setPassword] = useState({errMsg: ''});
  const [formCompleted, setFormCompleted] = useState(false);
  
  const history = useHistory();

  const validateEmail = (event) => {
    let currValidity = true;
    let currErrMsg = '';
    const currValue = event.target.value;
    if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/.test(currValue)) {
      currValidity = false;
      currErrMsg = 'Please enter a valid email';
    }

    setEmail((prevState) => {
      return {
        ...prevState,
        value: currValue,
        valid: currValidity,
        errMsg: currErrMsg 
      }
    });
  }

  const validatePassword = (event) => {
    let currValidity = true;
    let currErrMsg = '';
    const currValue = event.target.value;
    if (currValue.length === 0) {
      currValidity = false;
      currErrMsg = 'Please enter a valid password';
    } else if (currValue.length < 8) {
      currValidity = false;
      currErrMsg = 'Enter at least 8 characters';
    }

    setPassword((prevState) => {
      return {
        ...prevState,
        value: currValue,
        valid: currValidity,
        errMsg: currErrMsg 
      }
    });
  }

  const handleSubmit = () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then(function() {
        console.log('Account created!');
        history.push('/login');
      })
      .catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(`Error ${errorCode}: ${errorMessage}`);
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
          onSubmit={handleSubmit}
          noValidate
        >
          <div className='input-container'>
            <label htmlFor='signup-email-input'>Email</label>
            <input 
              type='text' 
              className='text-input' 
              id='signup-email-input'
              onChange={validateEmail}
              required
            ></input>
            <span className='text-input-error'>{email.errMsg}</span>
          </div>
          <div className='input-container'>
            <label htmlFor='signup-password-input'>New Password</label>
            <input 
              type='password' 
              className='text-input' 
              id='signup-password-input'
              onChange={validatePassword}
              required
            ></input>
            <span className='text-input-error'>{password.errMsg}</span>
          </div>
          <button 
            className={formCompleted ? 'auth-btn' : 'auth-btn disabled-btn'} 
            disabled={!formCompleted}
          >SIGN UP</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;