import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Download from './pages/Download';
import Scripts from './pages/Scripts';
import Analytics from './components/Analytics'; // Importa componente
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Analytics /> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download" element={<Download />} />
        <Route path="/scripts" element={<Scripts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
