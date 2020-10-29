import React, { useState } from 'react';
import AuthContext from './AuthContext.js';

const AuthContextProvider = ( { children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within AuthContextProvider');
  }
  return context;
}

export { AuthContextProvider, useAuthContext };