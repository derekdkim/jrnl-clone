import React, { useEffect, useState } from 'react';
import './index.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState('/');

  useEffect(() => {
    const currentURL = window.location.href;
    const index = currentURL.substring(0, currentURL.length - 1).lastIndexOf('/');
    const currentTabName = currentURL.substring(index, currentURL.length);
    console.log(currentURL, index, currentTabName);
    setActiveTab(currentTabName);
  }, []);

  return(
    <header className='header'>
      <a 
        href='/'
        id='nav-logo'
      ><img src={require('../../images/jrnl-logo-clear.png')} alt='logo' /></a>
      <nav>
        <a 
          href='/'
          id='nav-timeline'
          className={activeTab === '/' ? 'active-tab' : ''}
        >TIMELINE</a>
        <a 
          href='/journals/'
          id='nav-journals'
          className={activeTab === '/journals/' ? 'active-tab' : ''}
        >JOURNALS</a>
        <a 
          href='/books/'
          id='nav-books'
          className={activeTab === '/books/' ? 'active-tab' : ''}
        >BOOKS</a>
        <a 
          href='/all-about-me/'
          id='nav-aam'
          className={activeTab === '/all-about-me/' ? 'active-tab' : ''}
        >ALL ABOUT ME</a>
        <div></div>
        <a 
          href='/account/settings/'
          id='nav-settings'
          className={activeTab === '/settings/' ? 'active-tab' : ''}
        >USER_PROFILE</a>
      </nav>
    </header>
  );
}

export default Header;