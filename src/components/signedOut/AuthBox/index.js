import React from 'react';
import './index.css';

import LogIn from '../LogIn';
import SignUp from '../SignUp';

const AuthBox = (props) => {
  const { tab } = props;

  return(
    <div className='auth-tab'>
      <div className='auth-box-container'>
        <div className='auth-box-tab-nav'>
          <a id='signup-btn' className={tab === 'signup' ? 'selected-tab' : ''} href='/signup/'>SIGNUP</a>
          <a id='login-btn' className={tab === 'login' ? 'selected-tab' : ''} href='/login/'>LOGIN</a>
        </div>
          <div>
            {
              tab === 'login'
              ? <LogIn />
              : <SignUp />
            }
          </div>
      </div>
    </div>
  );
}

export default AuthBox;