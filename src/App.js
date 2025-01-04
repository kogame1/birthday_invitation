import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoPage from './PhotoPage';
import InvitationPage from './InvitationPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css"; // 로딩 GIF와 관련된 CSS 추가

function App() { 

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [guestName, setGuestName] = useState(''); //게스트 이름 상태

  useEffect(() => {
    // 1.5초 후 로딩 완료
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 로딩 시간을 조정할 수 있음
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  if (isLoading) {
    // 로딩 중이면 로딩 화면을 표시
    return (
      <div className="loading-container">
        <img src="/loading.gif" alt="로딩 중..." className="loading-gif" />
      </div>
    );
  }



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