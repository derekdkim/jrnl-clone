import React, { useState } from 'react';
import './index.css';

import firebase from '../../../Firebase.js';
import 'firebase/auth';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');

  const handleInput = (e) => {
    setEmail(e.target.value);
  }

  const sendRecoveryEmail = (e) => {
    e.preventDefault();

    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
        setDialogMsg('Check your email to reset your password');
      })
      .catch((error) => {
        if (error === 'auth/invalid-email') {
          setDialogMsg('This email is invalid.');
        } else if (error === 'auth/user-not-found') {
          setDialogMsg('There is no user associated with this email.');
        } else {
          setDialogMsg(`Failed to send email ${error}`);
        }
      });
  }

  return (
    <div className='auth-tab'>
      <div className='auth-box-container'>
        <div className='pwd-reset-container'>
          <h3 className='pwd-reset-header'>Trouble logging in?</h3>
          <p className='pwd-reset-desc'>No worries, you can reset your password by entering your email address below and clicking "reset password."</p>
          <form onSubmit={sendRecoveryEmail}>
            <div className='input-container'>
                <label htmlFor='recovery-email-input'>Email</label>
                <input 
                  type='text' 
                  className='text-input' 
                  id='recovery-email-input'
                  onChange={handleInput}
                ></input>
                <span className={emailSent ? 'text-input-error success-message' : 'text-input-error'}>{dialogMsg}</span>
            </div>
            <div>
            <button 
                className={email.length > 0 ? 'auth-btn' : 'auth-btn disabled-btn'} 
                disabled={email.length === 0}
              >RESET PASSWORD</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;