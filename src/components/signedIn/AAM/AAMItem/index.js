import React from 'react';

const AAMItem = (props) => {
  const { data } = props;

  return(
    <div className='item-container'>
      <div className='item-content-container'>
        <img className='item-icon' src={require(`../../../../images/aam/${data.iconName}.svg`)} alt='icon'/>
        <div className='item-text-container'>
          <p className='item-title'>{data.name}</p>
          <p className='item-desc'>{`Answered 0/${data.questions}`}</p>
        </div>
      </div>
    </div>
  );
}

export default AAMItem;