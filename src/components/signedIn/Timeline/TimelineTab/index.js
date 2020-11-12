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

  // Date Query mode states
  const [queryDate, setQueryDate] = useState(null);
  const [entryDates, setEntryDates] = useState([]);
  const [queryModeResult, setQueryModeResult] = useState(null);

  // Search mode states
  const [searchMode, toggleSearchMode] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [searchModeResult, setSearchModeResult] = useState(null);

  const modal = useModalContext();
  const fAuth = firebase.auth();
  const fDB = firebase.firestore();

  const fetchUserEntries = async () => {
    setIsLoading(true);
    let fetchedSuccessfully = false;
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
      if (dataArr.length > 0) {
        setIsLoading(false);
      } else {
        setLoadingMessage('You have no entries. Try writing your first one!');
      }
    } else {
      // If the entry retrieval fails
      setLoadingMessage('Failed to load entries.');
    }
  }

  // Initial entry fetching
  useEffect(() => {
    fetchUserEntries();
  }, []);

  // Queried entry fetching
  useEffect(() => {
    const fetchQueriedEntries = async () => {
      setIsLoading(true);
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
        setQueryModeResult(dataArr);

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

  // Keyword search function
  useEffect(() => {
    if (searchMode && searchKey.length > 0) {
      const matchingEntries = entryData.filter((entry) => entry.title.includes(searchKey) || entry.content.includes(searchKey)); 
      setSearchModeResult(matchingEntries);
      setIsLoading(false);
    }
  }, [searchMode, searchKey, entryData]);

  // Catch-all entry rendering function
  const renderEntries = () => {
    const selectedEntries = searchMode ? searchModeResult : queryDate !== null ? queryModeResult : entryData;

    if (selectedEntries !== null && selectedEntries.length > 0) {
      return (selectedEntries.map((entry, index) => {
        // Only display 20 most recent entries in default mode
        if (searchMode || queryDate !== null || index < 20) {
          return (
            <Entry 
            data={entry}
            key={index}
            fetchUserEntries={fetchUserEntries}
            />
          );
        } else {
          return null;
        }
      }));
    } else {
      setIsLoading(true);
      if (selectedEntries === null) {
        setLoadingMessage('Entries are currently loading');
      } else if (selectedEntries.length === 0) {
        setLoadingMessage('No matching entries found.');
      }
      return null;
    }
  }

  return(
    <div id='content'>
      <TimelineHeader 
        entryDates={entryDates}
        setQueryDate={setQueryDate}
        searchMode={searchMode}
        toggleSearchMode={toggleSearchMode}
        setSearchKey={setSearchKey}
      />
      <div className='container-container'>
        {modal.timeModalActive && <TimeChangeModal />}
        <Editor fetchUserEntries={fetchUserEntries} />

        {isLoading 
          && <div className='entry-container entry-dialog'>
               <p className='message-item'>{loadingMessage}</p>
             </div>
        }
        {!isLoading && renderEntries()}
      </div>
    </div>
  );
}

export default TimelineTab;