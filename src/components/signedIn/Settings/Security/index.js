import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css';

import firebase from '../../../../Firebase.js';

const Security = () => {
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [formComplete, setFormComplete] = useState(false);
  const [errorMsg0, setErrorMsg0] = useState('');
  const [errorMsg1, setErrorMsg1] = useState('');
  
  const history = useHistory();
  const fAuth = firebase.auth();

  useEffect(() => {
    if (passwordInput.length > 8) {
      if (passwordInput === passwordConfirm) {
        setFormComplete(true);
      }
    }
  }, [passwordInput, passwordConfirm]);

  const handleInput = (e) => {
    setPasswordInput(e.target.value);
    if (e.target.value.length < 8) {
      setErrorMsg0('Password must be at least 8 characters.');
      setFormComplete(false);
    } else {
      setErrorMsg0('');
    }
  }

  const handleInputConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    if (e.target.value !== passwordInput) {
      setErrorMsg1('Passwords do not match.');
      setFormComplete(false);
    } else {
      setErrorMsg1('');
    }
  }

  const exitTab = () => {
    history.push('/account/settings/');
  }

  const savePassword = async () => {
    let passwordAccepted = false;
    await fAuth.currentUser.updatePassword(passwordInput)
      .then(() => {
        passwordAccepted = true;
      })
      .catch((error) => {
        console.log('Failed to change password', error);
        setErrorMsg0(error, 'Failed to change password. Please try again.');
        setFormComplete(false);
      });
    if (passwordAccepted) {
      exitTab();
    }
  }

  return (
    <div id='content'>
      <div className='container-container'>
        <div className='entry-container'>
          <div className='settings-anchor'>
            <span className='settings-anchor-text'>
              <Link to='/account/settings/' className='settings-link'>SETTINGS</Link>
              {'  /  SECURITY'}
            </span>
          </div>
          <div className='vert-nav-header'><span>PASSWORD SETTINGS</span></div>
          <div className='settings-body two-col-body'>
            <div className='input-container two-col-item'>
              <label htmlFor='password-input'>New Password</label>
              <input 
                type='text' 
                className='text-input' 
                id='password-input'
                onChange={handleInput}
                placeholder='Enter your new password'
              ></input>
              <span className='text-input-error'>{errorMsg0}</span>
            </div>
            <div className='input-container'>
              <label htmlFor='password-input'>Confirm Password</label>
              <input 
                type='text' 
                className='text-input' 
                id='password-input'
                onChange={handleInputConfirm}
                placeholder='Repeat your new password'
              ></input>
              <span className='text-input-error'>{errorMsg1}</span>
            </div>
          </div>
          <div className='settings-footer'>
            <button onClick={exitTab} className='tab-btn profile-btn'>CANCEL</button>
            <button 
              onClick={savePassword} 
              className={formComplete ? 'save-btn profile-btn' : 'save-btn profile-btn disabled-btn'}
              disabled={!formComplete}
            >SAVE CHANGES</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;