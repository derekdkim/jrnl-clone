import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
import { SettingsContent, SupportContent } from './settingsContent.js';

import firebase from '../../../../Firebase.js';
import { useAuthContext } from '../../../../context/AuthContextProvider.js';

const SettingsNav = () => {
  const auth = useAuthContext();

  const handleLogout = () => {
    firebase.auth().signOut().then(function() {
      auth.setLoggedIn(false);
    }).catch(function(error) {
      console.log(`Signout failed. ${error.message}`);
    });
  }

  return (
    <div className='vert-nav-container'>
      <div>
        <div className='vert-nav-header' id='settings-header'>
          <span>SETTINGS</span>
        </div>
        <div className='vert-nav-body'>
          {SettingsContent.map((item, index) => 
            <NavLink
              to={item.to}
              className='vert-nav-item'
              key={index}
            >{item.name}</NavLink>
          )}
        </div>
      </div>
      <div>
        <div className='vert-nav-header' id='support-header'>
          <span>SUPPORT</span>
        </div>
        <div className='vert-nav-body'>
          {SupportContent.map((item, index) => 
            <a
              href={`http://${item.href}`}
              className='vert-nav-item'
              key={index}
              target='_blank'
              rel="noopener noreferrer"
            >{item.name}</a>
          )}
          <button
            className='vert-nav-item logout-btn'
            onClick={handleLogout}
          >Logout</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsNav;