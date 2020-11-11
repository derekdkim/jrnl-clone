import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

import { useAuthContext } from '../../context/AuthContextProvider.js';
import firebase from '../../Firebase.js';

const Header = () => {
  const auth = useAuthContext();
  const fAuth = firebase.auth();

  const showDisplayName = () => {
    if (auth.loggedIn) {
      const displayName = fAuth.currentUser.displayName;
      
      return typeof displayName === 'string' ? displayName : 'User Profile';
    }
  }

  // Only render nav components if the user is logged in.
  const renderNavComponents = () => {
    return (
      <nav>
        <div id='nav-left'>
          <NavLink 
            to='/timeline/'
            id='nav-timeline'
            activeClassName='active-tab'
          >
            <span>TIMELINE</span>
            <span className='nav-active-bar'></span>
          </NavLink>
          <NavLink 
            to='/journals/'
            id='nav-journals'
            activeClassName='active-tab'
          >
            <span>JOURNALS</span>
            <span className='nav-active-bar'></span>
          </NavLink>
          <NavLink 
            to='/books/'
            id='nav-books'
            activeClassName='active-tab'
          >
            <span>BOOKS</span>
            <span className='nav-active-bar'></span>
          </NavLink>
          <NavLink 
            to='/all-about-me/'
            id='nav-aam'
            activeClassName='active-tab'
          >
            <span>ALL ABOUT ME</span>
            <span className='nav-active-bar'></span>
          </NavLink>
        </div>
        <div id='nav-right'>
          <NavLink 
              to='/account/settings/'
              id='nav-settings'
              activeClassName='active-tab'
            >
              <img id='nav-profile-pic' src={require('../../images/avatar.png')} alt='avatar'/>
              <span>{showDisplayName()}</span>
              <span className='nav-active-bar'></span>
          </NavLink>
        </div>
      </nav>
    );
  }

  return(
    <header className='header'>
      <NavLink 
        to='/timeline/'
        id='nav-logo'
      ><img src={require('../../images/jrnl-logo-clear.png')} alt='logo' /></NavLink>
      {
        auth.loggedIn
          ? renderNavComponents()
          : null
      }
    </header>
  );
}

export default Header;