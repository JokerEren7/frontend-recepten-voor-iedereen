import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Overzicht from './pages/Overzicht';
import Recept from './pages/Detail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overzicht/:id" element={<Overzicht />} />
          <Route path="/recept/:id" element={<Recept />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;