import React, { useState, useEffect } from 'react';
import './Sidebar.css';

// 이미지 파일 import
import printIcon from './icons/print-icon.png';
import darkModeIcon from './icons/dark-mode-icon.png';
import lightModeIcon from './icons/light-mode-icon.png';
import zoomInIcon from './icons/zoom-in-icon.png';
import zoomOutIcon from './icons/zoom-out-icon.png';

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scale, setScale] = useState(1); // 화면 배율 상태 관리
  const [minScale, setMinScale] = useState(0.5); // 최소 배율
  const [maxScale, setMaxScale] = useState(2); // 최대 배율

  const handlePrint = () => {
    window.print();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 줌 인/줌 아웃 핸들러
  const handleZoom = (zoomIn) => {
    setScale((prevScale) => {
      const newScale = zoomIn ? prevScale + 0.05 : prevScale - 0.05;

      // 줌 아웃 시 최소 배율 업데이트
      if (!zoomIn) {
        setMinScale(newScale);
      }

      // 줌 인 시 최대 배율 업데이트
      if (zoomIn) {
        setMaxScale(newScale);
      }

      // 배율 제한 적용
      return Math.min(Math.max(newScale, minScale), maxScale);
    });
  };

  // 화면 배율 적용
  useEffect(() => {
    document.body.style.transform = `scale(${scale})`;
    document.body.style.transformOrigin = 'top left'; // 확대/축소 기준점 설정
  }, [scale]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <aside className={`sidebar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div>
        <div className="sidebar-item" onClick={handlePrint}>
          <img src={printIcon} alt="Print Icon" className="sidebar-icon" />
        </div>
        <div className="sidebar-item" onClick={toggleDarkMode}>
          <img
            src={isDarkMode ? lightModeIcon : darkModeIcon}
            alt="Dark/Light Mode Icon"
            className="sidebar-icon"
          />
        </div>
        <div className="sidebar-item zoom-button" onClick={() => handleZoom(true)} disabled={scale >= maxScale}>
          <img src={zoomInIcon} alt="Zoom In Icon" className="sidebar-icon" />
        </div>
        <div className="sidebar-item zoom-button" onClick={() => handleZoom(false)} disabled={scale <= minScale}>
          <img src={zoomOutIcon} alt="Zoom Out Icon" className="sidebar-icon" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
