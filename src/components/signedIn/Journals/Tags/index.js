import React from 'react';

import Item from '../../Item';

const placeholderTags = [
  {
    name: 'Test',
    type: 'tag',
    qty: 154
  },
  {
    name: 'Good',
    type: 'tag',
    qty: 152
  },
  {
    name: 'Bad',
    type: 'tag',
    qty: 222
  },
  {
    name: 'Studying',
    type: 'tag',
    qty: 122
  },
  {
    name: 'Workout',
    type: 'tag',
    qty: 185
  }
];

const Tags = () => {
  return(
    <div className='tab-container'>
      <div className='tab-header tab-meta'>
        <div className='tab-meta-left'>
          <span>5 Tagss</span>
        </div>
        <button className='tab-btn'>NEW TAG</button>
      </div>
      <div className='tab-body'>
        <div>
          {
            placeholderTags.map((item, index) => <Item key={index} data={item} />)
          }
        </div>
      </div>
    </div>
  );
}

export default Tags;