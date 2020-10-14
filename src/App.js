import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Routes from './components/Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>

    </div>
  );
}

export default App;
