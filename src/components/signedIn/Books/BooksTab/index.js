import React from 'react';

import BooksOrdersNav from '../BooksOrdersNav';
import Books from '../Books';
import Orders from '../Orders';

const BooksTab = (props) => {
  const { tab } = props;

  const selectTabContent = () => {
    if (tab === 'books') {
      return (
        <Books />
      );
    } else {
      return (
        <Orders />
      );
    }
  }

  return (
    <div id='content'>
      <div className='container-container'>
        <div className='entry-container'>
          <BooksOrdersNav />
          { selectTabContent() }
        </div>
      </div>
    </div>
  );
}

export default BooksTab;