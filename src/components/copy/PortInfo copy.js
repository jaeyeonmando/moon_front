import React, { useState, useEffect } from 'react';
import './PortInfo.css';

const PortInfo = () => {
  const [portDetails, setPortDetails] = useState(null); // 포트 정보 상태
  const [selectedPort, setSelectedPort] = useState(null); // 선택된 포트 번호

  useEffect(() => {
    // 선택된 포트가 있을 때 포트 정보 API 호출
    if (selectedPort) {
      fetchPortDetails(selectedPort);
    }
  }, [selectedPort]); // selectedPort가 변경될 때마다 정보 업데이트

  const fetchPortDetails = async (port) => {
    // 실제 API 호출 또는 데이터베이스에서 포트 정보 가져오기 (현재는 예시 데이터 사용)
    setPortDetails({ port, description: `포트 ${port}에 대한 상세 정보입니다.` });
  };

  const portNumbers = [20, 21, 22, 23, 25, 53, 80, 110, 135, 143, 443, 445, 1433, 1434, 1521, 1900, 3306, 3389, 4444, 5432, 8080];

  return (
    <div className="port-info-status">
      <h3>포트 정보</h3>
      <div className="port-buttons">
        {portNumbers.map((port) => (
          <button
            key={port}
            onClick={() => setSelectedPort(port)} // 버튼 클릭 시 해당 포트 번호 선택
            className="port-button"
          >
           {port}
          </button>
        ))}
      </div>
      {selectedPort && (
        <div className="port-info-card">
          <h5>포트 번호: {selectedPort}</h5>
          {portDetails ? (
            <p>{portDetails.description}</p>
          ) : (
            <p>포트 정보를 로딩 중입니다...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PortInfo;
