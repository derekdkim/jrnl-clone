import React from 'react';
import './index.css';

import { lorem, megaLorem } from '../../../../placeholder/lorem.js';

const Entry = () => {

  return(
    <div className='entry-container'>
      <div className='entry-header'>
        <div className='entry-avatar'>
          <img src={require('../../../../images/avatar.png')} alt='avatar'/>
        </div>
        <div className='entry-header-meta'>
          <div className='entry-date-time'>
            <p className='entry-date'>Oct 7, 2020</p><p className='entry-time'>6:10pm</p>
            <div className='entry-date-right-col'>
              <p className='entry-last-updated'>13d</p>
              <button className='menu-btn'></button>
            </div>
          </div>
          <div className='entry-journal'><p>Account in Placeholder Journal</p></div>
        </div>
      </div>
      <div className='entry-body'>
        <div className='entry-title'>
          <h1>My Diary Entry</h1>
        </div>
        <div className='entry-content'>
          <p>{lorem}</p>
          <p>{lorem}</p>
          <p>{megaLorem}</p>
          <p>{lorem}</p>
        </div>
      </div>
      <div className='entry-footer'>
        <button className='entry-comments-btn'>COMMENTS</button>
      </div>
    </div>
  );
}

export default Entry;