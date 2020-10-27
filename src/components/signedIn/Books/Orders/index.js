import React from 'react';

import Item from '../../Item';

const placeholderBooks = [
  {
    name: 'My 2018 Journal',
    type: 'book',
    createdDate: '10/06/2018',
    modifiedDate: '1/03/2019'
  },
  {
    name: 'My 2019 Journal',
    type: 'book',
    createdDate: '10/06/2018',
    modifiedDate: '1/03/2019'
  },
  {
    name: 'My 2020 Journal',
    type: 'book',
    createdDate: '10/06/2018',
    modifiedDate: '1/03/2019'
  },
  {
    name: 'My 2021 Journal',
    type: 'book',
    createdDate: '10/06/2018',
    modifiedDate: '1/03/2019'
  },
  {
    name: 'My 2022 Journal',
    type: 'book',
    createdDate: '10/06/2018',
    modifiedDate: '1/03/2019'
  }
];

const Orders = () => {

  return(
    <div id='content'>
      <div className='tab-container'>
        <div className='tab-header tab-meta'>
          <div className='tab-meta-left'>
            <span>5 Orders</span>
          </div>
        </div>
        <div className='tab-body'>
          <div>
            {
              placeholderBooks.map((item, index) => <Item key={index} data={item} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;