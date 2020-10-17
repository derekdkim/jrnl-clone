import React, { useEffect, useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState({errMsg: ''});
  const [username, setUsername] = useState({errMsg: ''});
  const [password, setPassword] = useState({errMsg: ''});
  const [formCompleted, setFormCompleted] = useState(false);

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

  const validateUsername = (event) => {
    let currValidity = true;
    let currErrMsg = '';
    const currValue = event.target.value;
    if (!/[A-Za-z0-9._@+-]+/.test(currValue)) {
      currValidity = false;
      currErrMsg = 'Only letters, numbers and @/./+/-/_ allowed';
    }

    setUsername((prevState) => {
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

  useEffect(() => {
    if (email.valid && username.valid && password.valid) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }
  }, [email, username, password]);



  return(
    <div className='signed-out-tab-container'>
      <div className='form-container'>
        <form 
          className='auth-form'
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
            <label htmlFor='signup-username-input'>Username</label>
            <input 
              type='text' 
              className='text-input' 
              id='signup-username-input'
              onChange={validateUsername}
              required
            ></input>
            <span className='text-input-error'>{username.errMsg}</span>
          </div>
          <div className='input-container'>
            <label htmlFor='signup-password-input'>New Password</label>
            <input 
              type='text' 
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