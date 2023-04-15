import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Dashboard from './components/network/Dashboard';

function App() {
  return (
  <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
        </Routes>
      </header>
    </div>
  </Router>
  );
}

export default App;
