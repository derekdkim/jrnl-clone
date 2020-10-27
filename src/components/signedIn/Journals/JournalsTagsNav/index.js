import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const JournalsTagsNav = () => {
  return(
    <div className='tab-nav'>
      <NavLink
        to='/journals/'
        id='subnav-journals'
        className='tab-link'
        activeClassName='tab-active-tab'
      >
        <span>Journals</span>
        <span className='tab-nav-active-bar'></span>
      </NavLink>
      <NavLink
        to='/tags/'
        id='subnav-tags'
        className='tab-link'
        activeClassName='tab-active-tab'
      >
        <span>Tags</span>
        <span className='tab-nav-active-bar'></span>
      </NavLink>
    </div>
  );
}

export default JournalsTagsNav;