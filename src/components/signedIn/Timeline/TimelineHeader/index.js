import React, { useEffect, useState } from 'react';
import './index.css';

import { entryMonths } from '../../../../util/Time.js';

const TimelineHeader = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [keyword, setKeyword] = useState('');

  const { entryDates, setQueryDate, searchMode, toggleSearchMode, setSearchKey } = props;

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

  /* Search Methods */
  const enableSearchMode = () => {
    toggleSearchMode(true);
    // Reset search field
    setSearchKey('');
  }

  const disableSearchMode = () => {
    toggleSearchMode(false);
    // Reset search field
    setSearchKey('');
  }

  const assignKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const startSearch= (e) => {
    // On enter
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      if (keyword.length > 0) {
        setSearchKey(keyword.toLowerCase());
        e.stopPropagation();
      }
    }
  }

  return (
    <div className='timeline-header'>
      {searchMode
        ? <button className='icon-btn search-btn' onClick={disableSearchMode}>
            <img className='btn-icon' src={require('../../../../images/arrow-left.svg')} alt='search'/>
          </button>
        : <button className='icon-btn search-btn' onClick={enableSearchMode}>
            <img className='btn-icon' src={require('../../../../images/search.svg')} alt='search'/>
          </button>
      }
      <div className='timeline-title-container'>
        {searchMode 
          ? <input 
              onChange={assignKeyword} 
              onKeyDown={startSearch}
              className='search-input'
              type='text' 
              placeholder='Search for words or phrases. Press ENTER to search.'
            />
          : <span className='timeline-title'>All Entries</span>
        }
      </div>
      <div className='timeline-header-right'>
        {!searchMode &&
          <div className='timeline-pager'> 
            <div className='timeline-current'>
              <span>{selectedIndex !== null ? `${entryDates[selectedIndex].year} / ${entryMonths[entryDates[selectedIndex].month].toUpperCase()}` : 'RECENT'}</span>
            </div>
            <div>
              <button className={entryDates.length > 0 && (selectedIndex === null || selectedIndex < entryDates.length - 1) ? 'icon-btn left-btn' : 'icon-btn left-btn disabled-btn'} onClick={pushDateBackward}>
                <img className='btn-icon' src={require('../../../../images/angle-left.svg')} alt='left'/>
              </button>
              <button className={selectedIndex !== null && selectedIndex > 0 ? 'icon-btn right-btn' : 'icon-btn right-btn disabled-btn'} onClick={pushDateForward}>
                <img className='btn-icon' src={require('../../../../images/angle-right.svg')} alt='right'/>
              </button>
            </div>
          </div>
        }
        <button className='icon-btn calendar-btn'>
          <img className='btn-icon' src={require('../../../../images/calendar.svg')} alt='calendar'/>
        </button>
      </div>
    </div>
  );
}

export default TimelineHeader;