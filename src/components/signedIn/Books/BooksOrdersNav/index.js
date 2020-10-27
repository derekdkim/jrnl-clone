import React from 'react';
import { NavLink } from 'react-router-dom';

const BooksOrdersNav = () => {
  return(
    <div className='tab-nav'>
      <NavLink
        to='/books/'
        id='subnav-books'
        className='tab-link'
        activeClassName='tab-active-tab'
      >
        <span>Books</span>
        <span className='tab-nav-active-bar'></span>
      </NavLink>
      <NavLink
        to='/book-orders/'
        id='subnav-orders'
        className='tab-link'
        activeClassName='tab-active-tab'
      >
        <span>View Orders</span>
        <span className='tab-nav-active-bar'></span>
      </NavLink>
    </div>
  );
}

export default BooksOrdersNav;