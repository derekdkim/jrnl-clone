import React from 'react';
import './index.css';

import TimelineHeader from '../TimelineHeader';
import Editor from '../Editor';
import Entry from '../Entry';

const TimelineTab = () => {

  return(
    <div id='content'>
      <TimelineHeader />
      <div className='container-container'>
        <Editor />
        <Entry />
      </div>
    </div>
  );
}

export default TimelineTab;