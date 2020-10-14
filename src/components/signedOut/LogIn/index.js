import React from 'react';

const LogIn = () => {
  return(
    <div className='signed-out-tab-container'>
      <div className='form-container'>
        <form className='auth-form'>
          <div className='email-input-container'>
            <label htmlFor='login-id-input'>Email or Username</label>
            <input type='text' className='text-input' id='login-id-input'></input>
            <span className='text-input-error'></span>
          </div>
          <div>
            <label htmlFor='login-password-input'>New Password</label>
            <input type='text' className='text-input' id='login-password-input'></input>
            <span className='text-input-error'></span>
          </div>
          <button>LOGIN TO MY ACCOUNT</button>
          <div>
            <a href='/forgot-password/'>FORGOT PASSWORD?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;