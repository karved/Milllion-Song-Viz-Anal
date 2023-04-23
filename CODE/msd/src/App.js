import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing';
import DashboardNet from './components/network/DashboardNet';
import DashboardSenti from './components/sentiment/DashboardSenti.jsx';
import Lyrics from './components/lyrics/Lyrics';

function App() {
  return (
  <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route path='/network' element={<DashboardNet/>}/>
          <Route path='/sentiment' element={<DashboardSenti/>}/>
          <Route path='/lyrics' element={<Lyrics/>}/>
        </Routes>
      </header>
    </div>
  </Router>
  );
}

export default App;
