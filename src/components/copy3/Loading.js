// Loading.js
import React from 'react';
import './Loading.css'; // CSS 파일 가져오기

function Loading() {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p className="loading-text">로딩 중...</p>
    </div>
  );
}

export default Loading;
