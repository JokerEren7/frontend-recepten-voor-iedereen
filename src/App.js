import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Overzicht from './pages/Overzicht';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overzicht/:id" element={<Overzicht />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;