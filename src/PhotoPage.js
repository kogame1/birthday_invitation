import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS 추가

function PhotoPage({ setGuestName }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim() === '') {
      alert('이름을 입력해주세요!');
      return;
    }
    setGuestName(name);
    navigate('/invitation');
  };

  return (
    <div className="container text-center py-4">
      <h1 className="mb-4">사진 페이지</h1>
      <div className="row g-3 justify-content-center">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} className="col-6 col-md-4">
            <img
              src={`/photos/photo${index + 1}.jpg`}
              alt={`photo-${index + 1}`}
              className="img-fluid rounded shadow"
              style={{ transform: `rotate(${index % 2 === 0 ? -10 : 10}deg)` }}
            />
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={() => document.getElementById('nameInput').style.display = 'block'}
      >
        Click
      </button>
      <div id="nameInput" className="mt-4" style={{ display: 'none' }}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="이름이나 별명을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default PhotoPage;