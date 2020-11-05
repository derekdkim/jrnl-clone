import React, { useEffect, useState } from 'react';
import './index.css';
import TextareaAutosize from 'react-textarea-autosize';

import firebase from '../../../../Firebase.js';
import { formatEntryDate, formatEntryTime } from '../../../../util/Time.js';
import { useModalContext } from '../../../../context/ModalContextProvider.js';

const Editor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [entryDate, setEntryDate] = useState(Date.now());

  const modal = useModalContext();
  const { setSelectedDate, selectedDate, toggleTimeModal } = modal;
  const fAuth = firebase.auth();
  const fDB = firebase.firestore();

  useEffect(() => {
    // Only update from context if there is a valid date stored
    if (selectedDate) {
      setEntryDate(selectedDate);
    }
  }, [selectedDate]);

  const openTimeModal = () => {
    setSelectedDate(entryDate);
    toggleTimeModal(true);
  }

  const updateTitle = (e) => {
    setTitle(e.target.value);
  }

  const updateContent = (e) => {
    setContent(e.target.value);
  }

  const submitEntry = () => {
    fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries').doc()
      .set({
        title: title,
        content: content,
        journal: 'Placeholder Journal',
        entryDate: new Date(entryDate),
        modifiedDate: new Date()
      }, { merge: true }).catch((error) => {
        console.log(`Failed: ${error.message}`);
      });
  }

  return (
    <div className='entry-container'>
      <div className='entry-header'>
        <div className='entry-avatar'>
          <img src={require('../../../../images/avatar.png')} alt='avatar'/>
        </div>
        <div className='entry-header-meta'>
          <div className='entry-date-time' onClick={openTimeModal}>
            <p className='editor-date'>{formatEntryDate(entryDate)}</p>
            <p className='entry-time editor-header-elem'>{`@ ${formatEntryTime(entryDate)}`}</p>
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