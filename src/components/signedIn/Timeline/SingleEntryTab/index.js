import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Editor from '../Editor';
import Entry from '../Entry';
import TimeChangeModal from '../TimeChangeModal';
import { useModalContext } from '../../../../context/ModalContextProvider.js';
import firebase from '../../../../Firebase.js';

const SingleEntryTab = (props) => {
  const [entryData, setEntryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Entries are currently loading');

  const { viewMode } = props;
  const { id } = useParams();
  const modal = useModalContext();
  const fAuth = firebase.auth();
  const fDB = firebase.firestore();

  const fetchUserEntries = async () => {
    setIsLoading(true);
    let fetchedSuccessfully = false;
    const fetchedData = await fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries').doc(id)
      .get()
      .then((result) => {
        fetchedSuccessfully = true;
        return result;
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
      });
    
    // If fetchedData is resolved
    if (fetchedSuccessfully) {
      setEntryData({...fetchedData.data(), id: fetchedData.id});

      // Set loading state to off to render fetched entries
      setIsLoading(false);
    } else {
      // If the entry retrieval fails
      setLoadingMessage('Failed to load entries.');
    }
  }

  useEffect(() => {
    fetchUserEntries();
  }, []);

  return (
    <div id='content'>
    <div className='container-container'>
      { !isLoading && !viewMode &&
        <div>
          {modal.timeModalActive && <TimeChangeModal />}
          <Editor data={entryData}/>
        </div>
      }
      {isLoading 
        && <div className='entry-container entry-dialog'>
              <p className='message-item'>{loadingMessage}</p>
            </div>
      }
      { !isLoading && viewMode && <Entry data={entryData} /> }
    </div>
  </div>
  );
}

export default SingleEntryTab;