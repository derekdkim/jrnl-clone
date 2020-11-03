import React, { useState } from 'react';
import ModalContext from './ModalContext.js';

const ModalContextProvider = ( { children }) => {
  const [timeModalActive, toggleTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <ModalContext.Provider
      value={{
        timeModalActive: timeModalActive,
        toggleTimeModal: toggleTimeModal,
        selectedDate: selectedDate,
        setSelectedDate: setSelectedDate
      }}
    >
      { children }
    </ModalContext.Provider>
  );
}

const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within ModalContextProvider');
  }
  return context;
}

export { ModalContextProvider, useModalContext };