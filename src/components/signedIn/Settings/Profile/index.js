import React, { useState, useEffect } from 'react';
import './index.css';
import { Link, useHistory } from 'react-router-dom';

import firebase from '../../../../Firebase.js';

const Profile = () => {
  const [displayNameValue, setDisplayNameValue] = useState('');
  const [formComplete, setFormComplete] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const history = useHistory();
  const fAuth = firebase.auth();

  useEffect(() => {
    if (displayNameValue.length > 0) {
      if (displayNameValue !== ' ') {
        setFormComplete(true);
      }
    }
  }, [displayNameValue]);

  const updateInputValue = (e) => {
    setDisplayNameValue(e.target.value);
    if (e.target.value.length === 0 || e.target.value === ' ') {
      setErrorMsg('Display names must be at least 1 valid character.');
      setFormComplete(false);
    }
  }

  const exitTab = () => {
    history.push('/account/settings/');
  }

  const saveDisplayName = async () => {
    await fAuth.currentUser.updateProfile({
      displayName: displayNameValue
    }).catch((error) => {
      console.log('Failed to update profile', error);
    });
    exitTab();
  }

  return (
    <div id='content'>
      <div className='container-container'>
        <div className='entry-container'>
          <div className='settings-anchor'>
            <span className='settings-anchor-text'>
              <Link to='/account/settings/' className='settings-link'>SETTINGS</Link>
              {'  /  PROFILE'}
            </span>
          </div>
          <div className='vert-nav-header'><span>PERSONAL INFORMATION</span></div>
          <div className='settings-body'>
            <div className='input-container'>
              <label htmlFor='display-name-input'>Display Name</label>
              <input 
                type='text' 
                className='text-input' 
                id='display-name-input'
                onChange={updateInputValue}
              ></input>
              <span className='text-input-error'>{errorMsg}</span>
            </div>
          </div>
          <div className='settings-footer'>
            <button onClick={exitTab} className='tab-btn profile-btn'>CANCEL</button>
            <button 
              onClick={saveDisplayName} 
              className={formComplete ? 'save-btn profile-btn' : 'save-btn profile-btn disabled-btn'}
              disabled={!formComplete}
            >SAVE PROFILE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;