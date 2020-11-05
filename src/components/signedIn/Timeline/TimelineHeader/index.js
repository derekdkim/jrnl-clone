import React, { useEffect, useState } from 'react';
import './index.css';

import { entryMonths } from '../../../../util/Time.js';

const TimelineHeader = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { entryDates, setQueryDate } = props;

  /* Note: entryDates array lists dates starting with the most recent. So going back in dates involves going forward in the array */
  // Push the query date ahead by a month
  const pushDateForward = () => {
    // pushDateForward only possible after first using pushDateBackward
    if (selectedIndex) {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    }
  }

  // Push the query date back by a month
  const pushDateBackward = () => {
    // First selection
    if (selectedIndex === null) {
      setSelectedIndex(0);
    } else {
      // Don't go out of bounds
      if (selectedIndex < entryDates.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    }
  }

  useEffect(() => {
    if (selectedIndex !== null) {
      setQueryDate({...entryDates[selectedIndex]});
    }
  }, [selectedIndex]);

  return (
    <div className='timeline-header'>
      <button className='icon-btn search-btn'>
        <img className='btn-icon' src={require('../../../../images/search.svg')} alt='search'/>
      </button>
      <div className='timeline-title-container'>
        <span className='timeline-title'>All Entries</span>
      </div>
      <div className='timeline-header-right'>
        <div className='timeline-pager'>
          <div className='timeline-current'>
            <span>{selectedIndex !== null ? `${entryDates[selectedIndex].year} / ${entryMonths[entryDates[selectedIndex].month].toUpperCase()}` : 'ALL'}</span>
          </div>
          <div>
            <button className={selectedIndex === null || selectedIndex < entryDates.length - 1 ? 'icon-btn left-btn' : 'icon-btn left-btn disabled-btn'} onClick={pushDateBackward}>
              <img className='btn-icon' src={require('../../../../images/angle-left.svg')} alt='left'/>
            </button>
            <button className={selectedIndex !== null && selectedIndex > 0 ? 'icon-btn right-btn' : 'icon-btn right-btn disabled-btn'} onClick={pushDateForward}>
              <img className='btn-icon' src={require('../../../../images/angle-right.svg')} alt='right'/>
            </button>
          </div>
        </div>
        <button className='icon-btn calendar-btn'>
          <img className='btn-icon' src={require('../../../../images/calendar.svg')} alt='calendar'/>
        </button>
      </div>
    </div>
  );
}

export default TimelineHeader;