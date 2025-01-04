// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoPage from './PhotoPage';
import InvitationPage from './InvitationPage';
import 'bootstrap/dist/css/bootstrap.min.css';

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