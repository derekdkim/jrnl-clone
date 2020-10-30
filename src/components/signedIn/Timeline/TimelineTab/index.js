import React, { useState, useEffect } from 'react';
import './index.css';

import TimelineHeader from '../TimelineHeader';
import Editor from '../Editor';
import Entry from '../Entry';
import firebase from '../../../../Firebase.js';

const TimelineTab = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [entryData, setEntryData] = useState([]);

  const fAuth = firebase.auth();
  const fDB = firebase.firestore();

  useEffect(() => {
    let fetchedSuccessfully = false;
    const fetchUserEntries = async () => {
      const fetchedData = await fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries')
        .get()
        .then((result) => {
          console.log('Successfully read data');
          fetchedSuccessfully = true;
          return result;
        })
        .catch((error) => {
          console.log(`Error: ${error.message}`);
        });
      
      // If fetchedData is resolved
      if (fetchedSuccessfully) {
        console.log(fetchedData);
        //  Save each entry data to Array so it can be rendered with map()
        let dataArr = [];
        fetchedData.forEach(entry => {
          dataArr.push(entry.data());
        });
        
        // Set bundled entries to state
        setEntryData(dataArr);
        console.log('hello, it should be done');
        console.log(entryData);
        console.log(dataArr);

        // Set loading state to off to render fetched entries
        setIsLoading(false);
      } else {
        console.log('fetchedData was rejected');
      }
    }

    fetchUserEntries();
  }, []);



  return(
    <div id='content'>
      <TimelineHeader />
      <div className='container-container'>
        {isLoading && <p>Entries are currently loading</p>}

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