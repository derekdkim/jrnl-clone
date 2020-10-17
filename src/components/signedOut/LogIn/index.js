import React, { useState, useEffect } from 'react';
import './index.css';

const LogIn = () => {
  const [emailUsername, setEmailUsername] = useState({errMsg: ''});
  const [password, setPassword] = useState({errMsg: ''});
  const [formCompleted, setFormCompleted] = useState(false);

  const validateEmailUsername = (event) => {
    const currValue = event.target.value;
    let currErrMsg = '';
    let currValidity = true;

    if (currValue.length === 0) {
      currErrMsg = 'Enter email or username';
      currValidity = false;
    }

    setEmailUsername({
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

  useEffect(() => {
    if (emailUsername.valid && password.valid) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }
  }, [emailUsername, password]);

  return(
    <div className='signed-out-tab-container'>
      <div className='form-container'>
        <form 
          className='auth-form'
          noValidate
        >
          <div className='input-container'>
            <label htmlFor='login-id-input'>Email or Username</label>
            <input 
              type='text' 
              className='text-input' 
              id='login-id-input'
              onChange={validateEmailUsername}
              required
            ></input>
            <span className='text-input-error'>{emailUsername.errMsg}</span>
          </div>
          <div className='input-container'>
            <label htmlFor='login-password-input'>New Password</label>
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
          <div>
            <a id='pwd-recovery-link' href='/forgot-password/'>FORGOT PASSWORD?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;