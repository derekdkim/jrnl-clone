import React, { useState, useEffect } from 'react';
import './index.css';

import { useModalContext } from '../../../../context/ModalContextProvider.js';
import TimeChangeModal from '../TimeChangeModal';
import TimelineHeader from '../TimelineHeader';
import Editor from '../Editor';
import Entry from '../Entry';
import firebase from '../../../../Firebase.js';

const TimelineTab = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Entries are currently loading');
  const [entryData, setEntryData] = useState([]);

  const modal = useModalContext();
  const fAuth = firebase.auth();
  const fDB = firebase.firestore();

  useEffect(() => {
    let fetchedSuccessfully = false;
    const fetchUserEntries = async () => {
      const fetchedData = await fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries')
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
        //  Save each entry data to Array so it can be rendered with map()
        let dataArr = [];
        fetchedData.forEach(entry => {
          dataArr.push(entry.data());
        });
        
        // Set bundled entries to state
        setEntryData(dataArr);

        // Set loading state to off to render fetched entries
        setIsLoading(false);
      } else {
        // If the entry retrieval fails
        setLoadingMessage('Failed to load entries.');
      }
    }

    fetchUserEntries();
  }, []);

  return(
    <div id='content'>
      <TimelineHeader />
      <div className='container-container'>
        {isLoading && <p>{loadingMessage}</p>}
        {modal.timeModalActive && <TimeChangeModal />}
        <Editor />

        {entryData.map((entry, index) => 
          <Entry 
            data={entry}
            key={index}
            />
        )}
      </div>
    </div>
  );
}

export default TimelineTab;