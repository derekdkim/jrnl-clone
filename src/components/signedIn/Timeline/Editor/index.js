import React, { useState } from 'react';
import './index.css';
import TextareaAutosize from 'react-textarea-autosize';

import firebase from '../../../../Firebase.js';

const Editor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fAuth = firebase.auth();
  const fDB = firebase.firestore();

  const updateTitle = (e) => {
    setTitle(e.target.value);
  }

  const updateContent = (e) => {
    setContent(e.target.value);
  }

  const submitEntry = () => {
    console.log('Submitting entry');

    fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries').doc()
      .set({
        title: title,
        content: content
      }, { merge: true }).catch((error) => {
        console.log(`Failed: ${error.message}`);
      });
  }

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
            onChange={updateTitle}
          />
        </div>
        <div>
          <TextareaAutosize 
            className='editor-content'
            placeholder='How was your day?'
            onChange={updateContent}
          />
        </div>
      </div>
      <div className='editor-footer'>
        <button className='cancel-btn'>Cancel</button>
        <button className='save-btn' onClick={submitEntry}>Save Entry</button>
      </div>
    </div>
  );
}

export default Editor;