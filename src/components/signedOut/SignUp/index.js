import React from 'react';

const SignUp = () => {
  return(
    <div className='signed-out-tab-container'>
      <div className='form-container'>
        <form className='auth-form'>
          <div className='input-container'>
            <label htmlFor='signup-email-input'>Email</label>
            <input type='text' className='text-input' id='signup-email-input'></input>
            <span className='text-input-error'></span>
          </div>
          <div className='input-container'>
            <label htmlFor='signup-username-input'>Username</label>
            <input type='text' className='text-input' id='signup-username-input'></input>
            <span className='text-input-error'></span>
          </div>
          <div className='input-container'>
            <label htmlFor='signup-password-input'>New Password</label>
            <input type='text' className='text-input' id='signup-password-input'></input>
            <span className='text-input-error'></span>
          </div>
          <button className='auth-btn'>SIGN UP</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;