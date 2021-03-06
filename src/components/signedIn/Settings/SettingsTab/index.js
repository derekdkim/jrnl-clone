import React from 'react';
import './index.css';

import SettingsNav from '../SettingsNav';
import firebase from '../../../../Firebase.js';

const SettingsTab = () => {
  const user = firebase.auth().currentUser;

  const showDisplayName = () => {
    if (typeof user.displayName === 'string') {
      return user.displayName;
    } else {
      return user.email;
    }
  }

  return(
    <div id='content'>
      <div className='container-container'>
        <div className='entry-container'>
          <div className='two-col-container'>
            <div>
              <SettingsNav />
            </div>
            <div className='profile-container'>
              <div className='profile-img-container'>
                <img src={require('../../../../images/avatar.png')} alt='avatar' />
              </div>
              <div className='profile-text-container'>
                <span className='profile-name'>{showDisplayName()}</span>
                <span className='profile-email'>{user.email}</span>
                <span className='profile-joined'>Joined on May 15, 2018</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsTab;