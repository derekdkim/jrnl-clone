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
  const [entryDates, setEntryDates] = useState([]);
  const [queryDate, setQueryDate] = useState(null);

  const modal = useModalContext();
  const fAuth = firebase.auth();
  const fDB = firebase.firestore();

  // Initial entry fetching
  useEffect(() => {
    let fetchedSuccessfully = false;
    const fetchUserEntries = async () => {
      const fetchedData = await fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries')
        .orderBy('entryDate', 'desc')
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
        let entryDateArr = [];
        fetchedData.forEach(entry => {
          dataArr.push({...entry.data(), id: entry.id});

          // Store entry date ranges for querying purposes
          let entryTimestamp = entry.data().entryDate.toDate();
          let newQueryDate = {
            year: entryTimestamp.getFullYear(),
            month: entryTimestamp.getMonth()
          };
          
          // Prevent duplicates
          if (!entryDateArr.some((entry) =>
            entry.month === newQueryDate.month && entry.year === newQueryDate.year
          )) {
            entryDateArr.push(newQueryDate);
          }
        });
        
        // Set bundled entries to state
        setEntryData(dataArr);
        setEntryDates(entryDateArr);

        // Set loading state to off to render fetched entries
        setIsLoading(false);
      } else {
        // If the entry retrieval fails
        setLoadingMessage('Failed to load entries.');
      }
    }

    fetchUserEntries();
  }, []);

  // Queried entry fetching
  useEffect(() => {
    const fetchQueriedEntries = async () => {
      // Define range of query
      let yearUpperRange = queryDate.month === 11 ? queryDate.year + 1 : queryDate.year;
      let monthUpperRange = queryDate.month === 11 ? 1 : queryDate.month + 1;

      // Timestamp query must be done with Date objects
      let rangeLowerLimit = new Date(queryDate.year, queryDate.month, 0);
      let rangeUpperLimit = new Date(yearUpperRange, monthUpperRange, 0);

      let fetchedSuccessfully = false;

      const fetchedData = await fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries')
        .where('entryDate', '>=', rangeLowerLimit).where('entryDate', '<', rangeUpperLimit)
        .orderBy('entryDate', 'desc')
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
          dataArr.push({...entry.data(), id: entry.id});
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

    // On do this if a query date was selected
    if (queryDate !== null) {
      setIsLoading(true);
      fetchQueriedEntries();
    }
    
  }, [queryDate]);

  return(
    <div id='content'>
      <TimelineHeader 
        entryDates={entryDates}
        setQueryDate={setQueryDate}
      />
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