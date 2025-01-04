import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig'; // Firebase 설정 가져오기
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

function InvitationPage({ guestName }) {
  const [randomNumber, setRandomNumber] = useState(null);
  const [comment, setComment] = useState('');

  const handleDraw = () => {
    const number = [95, 1, 22, 3, 44][Math.floor(Math.random() * 5)];
    setRandomNumber(number);
  };

  const handleCommentSubmit = async () => {
    try {
      await addDoc(collection(db, 'comments'), {
        name: guestName,
        comment,
        timestamp: new Date(),
      });
      setComment('');
      alert('댓글이 저장되었습니다!');
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  return (
    <div className="invitation-page">
      <h1>생일 초대장</h1>
      <p>{guestName}님을 초대합니다!</p>
      <p>날짜: 2025년 1월 10일</p>
      <p>장소: 서울 모처</p>

      <div className="draw">
        <button onClick={handleDraw}>제비뽑기 시작</button>
        {randomNumber && <p>{guestName}님이 뽑은 숫자는 {randomNumber}입니다!</p>}
      </div>

      <div className="comments">
        <h2>원하는 음식</h2>
        <textarea
          placeholder="원하는 음식을 적어주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>댓글 남기기</button>
      </div>
    </div>
  );
}

export default InvitationPage;