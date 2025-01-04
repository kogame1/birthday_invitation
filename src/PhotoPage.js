import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function PhotoPage({ setGuestName }) {
  const navigate = useNavigate();

  const handlePhotoClick = (photoIndex) => {
    Swal.fire({
      title: "이름이나 별명을 입력해주세요",
      input: "text",
      inputPlaceholder: "이름을 입력해주세요",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      preConfirm: (value) => {
        const regex = /^[a-zA-Z가-힣0-9]{1,20}$/; // 특수문자 불가, 길이 20자 이하
        if (!regex.test(value)) {
          Swal.showValidationMessage(
            "이름은 한글, 영어, 숫자만 가능하며 20자 이하여야 합니다."
          );
          return false;
        }
        return value;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const guestName = result.value;
        setGuestName({ name: guestName, photo: photoIndex });
        navigate("/invitation");
      }
    });
  };

  return (
    <div className="container text-center py-4">
      <h1 className="mb-4">가장 마음에 드는 사진을 골라주세요.</h1>
      <div className="row g-3 justify-content-center">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="col-6 col-md-4"
            onClick={() => handlePhotoClick(index + 1)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`/photos/photo${index + 1}.jpg`}
              alt={`photo-${index + 1}`}
              className="img-fluid rounded shadow"
              style={{ transform: `rotate(${index % 2 === 0 ? -10 : 10}deg)` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoPage;