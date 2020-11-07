import React, { useState } from 'react';
import './index.css';

import { formatEntryDate, formatEntryTime, formatModifiedDate } from '../../../../util/Time.js';
import MenuModal from '../MenuModal';

const Entry = (props) => {
  const [menuModalActive, toggleMenuModal] = useState(false);
  const { data } = props;

  const modMillis = data.modifiedDate.toMillis();
  const entryMillis = data.entryDate.toMillis();

  const openMenuModal = () => {
    console.log(data);
    toggleMenuModal(true);
  }

  return(
    <div className='entry-container'>
      <div className='entry-header'>
        <div className='entry-avatar'>
          <img src={require('../../../../images/avatar.png')} alt='avatar'/>
        </div>
        <div className='entry-header-meta'>
          <div className='entry-date-time'>
            <p className='entry-date'>{formatEntryDate(entryMillis)}</p>
            <p className='entry-time'>{formatEntryTime(entryMillis)}</p>
            <div className='entry-date-right-col'>
              {menuModalActive && <MenuModal toggleMenuModal={toggleMenuModal} id={data.id} />}
              <p className='entry-last-updated'>{formatModifiedDate(modMillis)}</p>
              <button className='menu-btn' onClick={openMenuModal}></button>
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