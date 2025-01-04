import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import Swal from "sweetalert2";
import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function InvitationPage({ guestName }) {
  const [randomNumber, setRandomNumber] = useState(null);
  const [comment, setComment] = useState("");
  const [drawResults, setDrawResults] = useState([]);
  const [foodComments, setFoodComments] = useState([]);

  // 제비뽑기 결과 저장 및 기록 업데이트
  const handleDraw = async () => {
    const number = [95, 1, 22, 3, 44][Math.floor(Math.random() * 5)];

    // 동일한 이름 중복 확인
    const hasDrawn = drawResults.some((result) => result.name === guestName.name);
    if (hasDrawn) {
      Swal.fire(
        "중복된 이름",
        `${guestName.name}님은 이미 제비뽑기를 완료하셨습니다.`,
        "warning"
      );
      return;
    }
    // 중복 확인
    const isDuplicate = drawResults.some((result) => result.number === number);
    if (isDuplicate) {
      Swal.fire("제비뽑기 완료", "5개 제비뽑기가 모두 완료되었습니다.", "warning");
      return;
    }

    try {
      await addDoc(collection(db, "birthday_page_lucky_draw"), {
        name: guestName.name,
        number,
        timestamp: new Date(),
      });
      fetchDrawResults();
    } catch (error) {
      console.error("Error saving lucky draw result: ", error);
    }
  };

  // 음식 댓글 저장
  const handleCommentSubmit = async () => {
    if (comment.length > 20) {
      Swal.fire("글자수 초과", "음식 이름은 20자 이내로 입력해주세요.", "warning");
      return;
    }

    try {
      await addDoc(collection(db, "birthday_page_foods"), {
        name: guestName.name,
        comment,
        timestamp: new Date(),
      });
      setComment("");
      fetchFoodComments();
      Swal.fire("저장 성공", "댓글이 저장되었습니다!", "success");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  // 제비뽑기 기록 가져오기
  const fetchDrawResults = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "birthday_page_lucky_draw"), orderBy("timestamp", "desc"))
    );
    const results = querySnapshot.docs.map((doc) => doc.data());
    setDrawResults(results);
  };

  // 음식 댓글 가져오기
  const fetchFoodComments = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "birthday_page_foods"), orderBy("timestamp", "desc"))
    );
    const comments = querySnapshot.docs.map((doc) => doc.data());
    setFoodComments(comments);
  };

  useEffect(() => {
    fetchDrawResults();
    fetchFoodComments();
  }, []);

  return (
    <div
      className="invitation-page text-center"
      style={{
        position: "relative",
        backgroundImage: `url(/photos/photo${guestName.photo}.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "black",
      }}
    >
      {/* 투명한 배경 오버레이 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // 흰색 반투명 오버레이
          zIndex: 1,
        }}
      ></div>

      {/* 컨텐츠 */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
        className="container py-5"
      >
        <h1 className="mb-4">생일 초대장</h1>
        <p className="fs-4">{guestName.name}님을 초대합니다!</p>
        <p className="fs-5">날짜: 2025년 1월 22일 (수)</p>
        <p className="fs-5">장소: 김포집</p>

        {/* 제비뽑기 기록 */}
        <div className="draw mb-5">
          <h3 style={{ color: "black" }}>제비뽑기 기록</h3>
          <div className="list-group">
            {drawResults.map((result, index) => (
              <div
                key={index}
                className="list-group-item"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.2)", // 투명도 추가
                  color: "white", // 글자 색
                  border: "1px solid black",
                }}
              >
                {result.name}님이 뽑은 숫자: {result.number}
              </div>
            ))}
          </div>
        </div>

        {/* 원하는 음식 요청 기록 */}
        <div className="comments">
          <h3 style={{ color: "black" }}>음식 요청 기록</h3>
          <div className="list-group">
            {foodComments.map((item, index) => (
              <div
                key={index}
                className="list-group-item"
                style={{
                  backgroundColor: "rgba(0, 0, 255, 0.2)", // 투명도 추가
                  color: "black", // 글자 색
                  border: "1px solid blue",
                }}
              >
                {item.name}: {item.comment}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationPage;