import React from 'react';
import './index.css';

import JournalsTagsNav from '../JournalsTagsNav';
import Journals from '../Journals';
import Tags from '../Tags';

const JournalsTab = (props) => {
  const { tab } = props;

  const selectTabContent = () => {
    if (tab === 'journals') {
      return (
        <Journals />
      );
    } else {
      return (
        <Tags />
      );
    }
  }

  return (
    <div id='content'>
      <div className='container-container'>
        <div className='entry-container'>
          <JournalsTagsNav />
          { selectTabContent() }
        </div>
      </div>
    </div>
  );
}

export default JournalsTab;