import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoPage from './PhotoPage';
import InvitationPage from './InvitationPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [guestName, setGuestName] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotoPage setGuestName={setGuestName} />} />
        <Route path="/invitation" element={<InvitationPage guestName={guestName} />} />
      </Routes>
    </Router>
  );
}

export default App;