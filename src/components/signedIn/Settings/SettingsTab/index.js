import React from 'react';
import './index.css';

import SettingsNav from '../SettingsNav';

const SettingsTab = () => {

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
                <span className='profile-name'>DemoUser</span>
                <span className='profile-email'>demo@test.com</span>
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