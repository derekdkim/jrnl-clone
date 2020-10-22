import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Routes from './components/Routes';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes />
      </HashRouter>

    </div>
  );
}

export default App;
