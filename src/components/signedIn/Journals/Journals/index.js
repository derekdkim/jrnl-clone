import React from 'react';

import Item from '../../Item';

const placeholderJournals = [
  {
    name: '2018 Journal',
    type: 'journal',
    qty: 154
  },
  {
    name: '2019 Journal',
    type: 'journal',
    qty: 152
  },
  {
    name: '2020 Journal',
    type: 'journal',
    qty: 222
  },
  {
    name: '2021 Journal',
    type: 'journal',
    qty: 122
  },
  {
    name: '2022 Journal',
    type: 'journal',
    qty: 185
  }
];

const Journals = () => {
  return(
    <div className='tab-container'>
      <div className='tab-header tab-meta'>
        <div className='tab-meta-left'>
          <span>5 Journals</span>
        </div>
        <button className='tab-btn'>NEW JOURNAL</button>
      </div>
      <div className='tab-body'>
        <div>
          {
            placeholderJournals.map((item, index) => <Item key={index} data={item} />)
          }
        </div>
      </div>
    </div>
  );
}

export default Journals;