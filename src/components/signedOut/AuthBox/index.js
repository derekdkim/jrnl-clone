import React from 'react';

import LogIn from '../LogIn';
import SignUp from '../SignUp';

const AuthBox = (props) => {
  const { tabs } = props;
  
  return(
    <div className='auth-box-container'>
      <div className='auth-box-tab-nav'>
        <a href='/signup/'>SIGNUP</a>
        <a href='/login/'>LOGIN</a>
      </div>
        <div>
          {
            tabs === 'login'
            ? <LogIn />
            : <SignUp />
          }
        </div>
    </div>
  );
}

export default AuthBox;