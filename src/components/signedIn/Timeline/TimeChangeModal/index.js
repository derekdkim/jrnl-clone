import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

import { useModalContext } from '../../../../context/ModalContextProvider.js';

const TimeChangeModal = () => {
  const [pickedDate, setPickedDate] = useState(new Date());
  const modal = useModalContext();
  const { setSelectedDate, toggleTimeModal } = modal;

  const updateDate = () => {
    console.log('Date updated');
    // Update entry date only if a valid date was selected.
    if (pickedDate) {
      setSelectedDate(pickedDate);
    }

    // Close modal component
    closeModal();
  }

  const closeModal = () => {
    console.log('Closing modal');
    toggleTimeModal(false);
  }

  return(
    <div className='entry-container modal-box'>
      <div className='time-modal-header'>
        <h1>{'DATE & TIME'}</h1>
      </div>
      <div className='time-modal-body'>
        <DatePicker
          todayButton='Set to Today'
          selected={pickedDate}
          onChange={date => setPickedDate(date)}
          timeInputLabel='Time:'
          dateFormat='MM/dd/yyyy h:mm aa'
          showTimeInput
        />
      </div>
      <div className='time-modal-footer'>
        <button className='tab-btn' onClick={closeModal}>Cancel</button>
        <button className='save-btn' onClick={updateDate}>Update Date</button>
      </div>
    </div>
  );
}

export default TimeChangeModal;