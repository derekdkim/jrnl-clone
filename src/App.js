import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';

import { AuthContextProvider } from './context/AuthContextProvider.js';
import Header from './components/Header';
import Routes from './components/Routes';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <AuthContextProvider>
          <Header />
          <Routes />          
        </AuthContextProvider>
      </HashRouter>

    </div>
  );
}

export default App;
