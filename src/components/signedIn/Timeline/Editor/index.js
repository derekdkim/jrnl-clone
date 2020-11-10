import React, { useEffect, useState } from 'react';
import './index.css';
import TextareaAutosize from 'react-textarea-autosize';
import { useHistory } from 'react-router-dom';

import firebase from '../../../../Firebase.js';
import { formatEntryDate, formatEntryTime } from '../../../../util/Time.js';
import { useModalContext } from '../../../../context/ModalContextProvider.js';

const Editor = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [entryDate, setEntryDate] = useState(Date.now());

  const modal = useModalContext();
  const history = useHistory();
  const { setSelectedDate, selectedDate, toggleTimeModal } = modal;
  const fAuth = firebase.auth();
  const fDB = firebase.firestore();

  useEffect(() => {
    // Only update from context if there is a valid date stored
    if (selectedDate) {
      setEntryDate(selectedDate);
    }
  }, [selectedDate]);

  // If Editor was rendered with props, fill in the form with props data
  useEffect(() => {
    if (props.data) {
      const { data } = props;
      setTitle(data.title);
      setContent(data.content);
      setEntryDate(data.entryDate.toDate());
    }
  }, []);

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
    
    if (props.data) {
      // Edit entry
      fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries').doc(props.data.id)
        .set({
          title: title,
          content: content,
          journal: 'Placeholder Journal',
          entryDate: new Date(entryDate),
          modifiedDate: new Date()
        }, { merge: true })
        .then(() => history.push(`/timeline/view/${props.data.id}`))
        .catch((error) => {
          console.log(`Failed: ${error.message}`);
        });
    } else {
      // Add new entry
      fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries').doc()
        .set({
          title: title,
          content: content,
          journal: 'Placeholder Journal',
          entryDate: new Date(entryDate),
          modifiedDate: new Date()
        }, { merge: true })
        .then((result) => {
          return result;
        })
        .then(() => {
          setTitle('');
          setContent('');
          setEntryDate(new Date());
          props.fetchUserEntries();
        })
        .catch((error) => {
          console.log(`Failed: ${error.message}`);
        });
    }
  }

  return (
    <div className='entry-container'>
      <div className='entry-header'>
        <div className='entry-avatar'>
          <img src={require('../../../../images/avatar.png')} alt='avatar'/>
        </div>
        <div className='entry-header-meta'>
          <div className='entry-date-time editor-time-btn' onClick={openTimeModal}>
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
            value={title}
          />
        </div>
        <div>
          <TextareaAutosize 
            className='editor-content'
            placeholder='How was your day?'
            onChange={updateContent}
            value={content}
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