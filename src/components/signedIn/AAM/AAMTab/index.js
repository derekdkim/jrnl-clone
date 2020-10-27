import React from 'react';
import './index.css';

import AAMItem from '../AAMItem';

const AAMTab = () => {
  const AAMCategories = [
    {
      name: 'Challenges',
      questions: 14,
      iconName: 'challenges'
    },
    {
      name: 'Accomplishments',
      questions: 16,
      iconName: 'accomplishments'
    },
    {
      name: 'The World Around Me',
      questions: 20,
      iconName: 'globe'
    },
    {
      name: 'Parenthood',
      questions: 21,
      iconName: 'parenthood'
    },
    {
      name: 'Growing Up',
      questions: 63,
      iconName: 'childhood'
    },
    {
      name: 'Family',
      questions: 37,
      iconName: 'family'
    },
    {
      name: 'Spiritual',
      questions: 41,
      iconName: 'spiritual'
    },
    {
      name: 'Education',
      questions: 37,
      iconName: 'education'
    },
    {
      name: 'Relationships',
      questions: 32,
      iconName: 'relationships'
    },
    {
      name: 'General',
      questions: 88,
      iconName: 'general'
    }
  ];

  return(
    <div id='content'>
      <div className='container-container'>
        <div className='entry-container aam-header'>
          <div className='aam-header-content'>
            <span className='aam-title'>All About Me</span>
            <button className='tab-btn'>ANSWER RANDOM QUESTION</button>
          </div>
        </div>
        <div className='entry-container'>
          <div className='tab-body'>
            {
              AAMCategories.map((category, index) => <AAMItem key={index} data={category}/>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AAMTab;