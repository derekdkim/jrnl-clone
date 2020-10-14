import React from 'react';
import './index.css';

const Header = () => {
  return(
    <header className='header'>
      <a href='/'><img src={require('../../images/jrnl-logo-clear.png')} alt='logo' /></a>
      <nav>
        <p>TIMELINE</p>
        <p>JOURNALS</p>
        <p>BOOKS</p>
        <p>ALL ABOUT ME</p>
        <div></div>
        <p>USER_PROFILE</p>
      </nav>
    </header>
  );
}

export default Header;