import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

import LogIn from '../LogIn';
import SignUp from '../SignUp';

const AuthBox = (props) => {
  const { tab } = props;

  return(
    <div className='auth-tab'>
      <div className='auth-box-container'>
        <div className='auth-box-tab-nav'>
          <NavLink id='signup-btn' className={tab === 'signup' ? 'selected-tab' : ''} href='/signup/'>SIGNUP</NavLink>
          <NavLink id='login-btn' className={tab === 'login' ? 'selected-tab' : ''} href='/login/'>LOGIN</NavLink>
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