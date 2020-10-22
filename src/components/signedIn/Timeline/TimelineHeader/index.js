import React from 'react';
import './index.css';

const TimelineHeader = () => {
  return(
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
            <span>2020 / OCT</span>
          </div>
          <div>
            <button className='icon-btn left-btn'>
              <img className='btn-icon' src={require('../../../../images/angle-left.svg')} alt='left'/>
            </button>
            <button className='icon-btn right-btn'>
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