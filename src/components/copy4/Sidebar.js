import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  // 다크모드 상태 관리 (기본값 true)
  const [isDarkMode, setIsDarkMode] = useState(true);
  // 화면 크기 확대/축소 상태 관리
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  // 다크모드 토글 함수
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 화면 크기 확대/축소 토글 함수
  const toggleZoom = (zoomIn) => {
    setIsZoomed(zoomIn);
    if (zoomIn) {
      document.body.classList.add('zoomed-in');
      document.body.classList.remove('zoomed-out');
    } else {
      document.body.classList.add('zoomed-out');
      document.body.classList.remove('zoomed-in');
    }
  };

  // 컴포넌트가 처음 렌더링될 때 다크모드 클래스 적용
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
        {/* PDF 인쇄 버튼 아이콘 */}
        <div className="sidebar-item" onClick={handlePrint}>
          🖨️
        </div>

        {/* 다크모드 토글 버튼 */}
        <div className="sidebar-item" onClick={toggleDarkMode}>
          {isDarkMode ? '🌞' : '🌙'}
        </div>

        {/* 화면 확대 버튼 */}
        <div className="sidebar-item zoom-button" onClick={() => toggleZoom(true)}>
          🔍+
        </div>

        {/* 화면 축소 버튼 */}
        <div className="sidebar-item zoom-button" onClick={() => toggleZoom(false)}>
          🔍-
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
