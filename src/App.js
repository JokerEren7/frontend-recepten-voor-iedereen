import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import Home from './pages/Home';
import Overzicht from './pages/Overzicht';
import Contact from './pages/Contact';
import OverOns from './pages/OverOns';
import Recept from './pages/Detail';
import ReceptenOverzicht from './pages/ReceptenOverzicht'; 


function App() {
  return (
       <Router>
      <div className="App">
        <Navbar />
          <main>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overzicht/:id" element={<Overzicht />} />
          <Route path="/recept/:id" element={<Recept />} />
        <Route path="/recepten" element={<ReceptenOverzicht />} />

           <Route path="/contact" element={<Contact />} />
          <Route path="/over-ons" element={<OverOns />} />
        </Routes>
                </main>

        <Footer />
      </div>
    </Router>
  );

}

export default App;