import React, { useState } from 'react';
import './index.css';
import { useHistory } from 'react-router-dom';

import { formatEntryDate, formatEntryTime, formatModifiedDate } from '../../../../util/Time.js';
import MenuModal from '../MenuModal';

const Entry = (props) => {
  const [menuModalActive, toggleMenuModal] = useState(false);
  const { data } = props;

  const history = useHistory();
  const modMillis = data.modifiedDate.toMillis();
  const entryMillis = data.entryDate.toMillis();

  const openMenuModal = () => {
    toggleMenuModal(true);
  }

  const redirectOnDelete = () => {
    // If entry was rendered from a multi entry tab, rerender.
    if (props.fetchUserEntries) {
      props.fetchUserEntries();
    } else {
      // If from a single entry tab, redirect to timeline tab.
      history.push('/timeline/');
    }
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
              {menuModalActive 
                && <MenuModal 
                    toggleMenuModal={toggleMenuModal} 
                    id={data.id}
                    redirectOnDelete={redirectOnDelete}
                   />
              }
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