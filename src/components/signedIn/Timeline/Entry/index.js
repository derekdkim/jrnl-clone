import React from 'react';
import './index.css';

import { formatEntryDate, formatEntryTime, formatModifiedDate } from '../../../../util/Time.js';

const Entry = (props) => {
  const { data } = props;

  return(
    <div className='entry-container'>
      <div className='entry-header'>
        <div className='entry-avatar'>
          <img src={require('../../../../images/avatar.png')} alt='avatar'/>
        </div>
        <div className='entry-header-meta'>
          <div className='entry-date-time'>
            <p className='entry-date'>{formatEntryDate(data.entryDate)}</p>
            <p className='entry-time'>{formatEntryTime(data.entryDate)}</p>
            <div className='entry-date-right-col'>
              <p className='entry-last-updated'>{formatModifiedDate(data.modifiedDate)}</p>
              <button className='menu-btn'></button>
            </div>
          </div>
          <div className='entry-journal'><p>Account in Placeholder Journal</p></div>
        </div>
      </div>
      <div className='entry-body'>
        <div className='entry-title'>
          <h1>{data.title}</h1>
        </div>
        <div className='entry-content'>
          <p>{data.content}</p>
        </div>
      </div>
      <div className='entry-footer'>
        <button className='entry-comments-btn'>COMMENTS</button>
      </div>
    </div>
  );
}

export default Entry;