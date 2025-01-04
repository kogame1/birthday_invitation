import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PhotoPage({ setGuestName }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    setGuestName(name);
    navigate('/invitation');
  };

  return (
    <div className="photo-page">
      <h1>사진 페이지</h1>
      <div className="photos">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <img key={index} src={`/photos/photo${index + 1}.jpg`} alt={`photo-${index + 1}`} />
        ))}
      </div>
      <button onClick={() => document.getElementById('nameInput').style.display = 'block'}>
        Click
      </button>
      <div id="nameInput" style={{ display: 'none' }}>
        <input
          type="text"
          placeholder="이름이나 별명을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default PhotoPage;