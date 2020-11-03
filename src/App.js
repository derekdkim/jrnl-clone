import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';

import { AuthContextProvider } from './context/AuthContextProvider.js';
import { ModalContextProvider } from './context/ModalContextProvider.js';
import Header from './components/Header';
import Routes from './components/Routes';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <AuthContextProvider>
          <Header />
          <ModalContextProvider>
            <Routes />   
          </ModalContextProvider>
        </AuthContextProvider>
      </HashRouter>

    </div>
  );
}

export default App;
