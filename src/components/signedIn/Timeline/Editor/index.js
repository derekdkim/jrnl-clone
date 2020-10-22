import React from 'react';
import './index.css';
import TextareaAutosize from 'react-textarea-autosize';

const Editor = () => {

  return(
    <div className='entry-container'>
      <div className='entry-header'>
        <div className='entry-avatar'>
          <img src={require('../../../../images/avatar.png')} alt='avatar'/>
        </div>
        <div className='entry-header-meta'>
          <div className='entry-date-time'>
            <p className='editor-date'>Today</p><p className='entry-time editor-header-elem'>@ 5:08pm</p>
          </div>
          <div className='entry-journal editor-header-elem'><p>Placeholder Journal</p></div>
        </div>
      </div>
      <div className='editor-body'>
        <div>
          <input 
            className='editor-title' 
            type='text'
            placeholder='Entry title (optional)'
          />
        </div>
        <div>
          <TextareaAutosize 
            className='editor-content'
            placeholder='How was your day?' 
          />
        </div>
      </div>
      <div className='editor-footer'>
        <button className='cancel-btn'>Cancel</button>
        <button className='save-btn'>Save Entry</button>
      </div>
    </div>
  );
}

export default Editor;