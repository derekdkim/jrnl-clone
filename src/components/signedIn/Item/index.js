import React from 'react';
import './index.css';

import journalIcon from '../../../images/item/journal.svg';
import bookIcon from '../../../images/item/books.svg';
import tagIcon from '../../../images/item/tag.svg';

const Item = (props) => {
  const { data } = props;

  const selectIcon = () => {
    return data.type === 'journal' ? journalIcon 
      : data.type === 'book' ? bookIcon
      : data.type === 'tag' ? tagIcon
      : ''
  }

  const selectDesc = () => {
    return data.type === 'journal' || data.type === 'tag' ? `${data.qty} Entries` 
    : data.type === 'book' ? `Created: ${data.createdDate} - Modified ${data.modifiedDate}`
    : ''
  }

  return(
    <div className='item-container'>
      <div className='item-content-container'>
        <img className='item-icon' src={selectIcon()} alt='icon'/>
        <div className='item-text-container'>
          <p className='item-title'>{data.name}</p>
          <p className='item-desc'>{selectDesc()}</p>
        </div>
      </div>
      <div className='item-menu'>
        <button className='menu-btn'></button>
      </div>
    </div>
  );
}

export default Item;